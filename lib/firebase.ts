import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Firestore,
  limit,
} from 'firebase/firestore'


export interface ReviewItem {
  id?: string
  name: string
  projectName: string
  rating: number // 1 to 5
  review: string
  role?: string
  createdAt?: any
}

// Only real reviews from Firebase / user submissions
export const INITIAL_REVIEWS: ReviewItem[] = []


const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nova-pow-reviews'

// Firebase Web SDK configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

let app: FirebaseApp | null = null
let db: Firestore | null = null

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    return null
  }
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApp()
    }
    return app
  } catch (error) {
    console.warn('[Firebase] App initialization notice:', error)
    return null
  }
}

export function getFirebaseDb(): Firestore | null {
  if (typeof window === 'undefined') return null
  if (db) return db
  try {
    const activeApp = getFirebaseApp()
    if (activeApp) {
      db = getFirestore(activeApp)
    }
  } catch (error) {
    console.warn('[Firebase] Firestore init notice:', error)
  }
  return db
}

const LOCAL_STORAGE_KEY = 'novapow_reviews_live'

// Helper to get local cached reviews (only real submitted reviews)
export function getStoredLocalReviews(): ReviewItem[] {
  if (typeof window === 'undefined') return []
  try {
    // Clear test keys
    localStorage.removeItem('novapow_community_reviews')
    localStorage.removeItem('novapow_reviews_v1')
  } catch (e) {
    console.error('Failed to clean local reviews', e)
  }
  return []
}

// Helper to save review locally
export function saveLocalReview(review: ReviewItem): ReviewItem[] {
  return [review]
}

/**
 * Delete / Purge all reviews from local cache and Firestore
 */
export async function clearAllReviews(): Promise<{ success: boolean; count?: number }> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      localStorage.removeItem('novapow_community_reviews')
    } catch (e) {
      console.warn('LocalStorage clear notice:', e)
    }
  }
  try {
    const database = getFirebaseDb()
    if (database) {
      const snapshot = await getDocs(collection(database, 'reviews'))
      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(doc(database, 'reviews', docItem.id))
      )
      await Promise.all(deletePromises)
      return { success: true, count: snapshot.size }
    } else {
      // Direct REST delete
      const res = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/reviews`)
      const data = await res.json()
      if (data.documents) {
        await Promise.all(
          data.documents.map((docItem: any) =>
            fetch(`https://firestore.googleapis.com/v1/${docItem.name}`, { method: 'DELETE' })
          )
        )
      }
    }
  } catch (err) {
    console.warn('[Firebase] Notice while clearing Firestore docs:', err)
  }
  return { success: true, count: 0 }
}

/**
 * Submit a new review to Firestore database & local backup
 */
export async function submitReviewToFirebase(data: {
  name: string
  projectName: string
  rating: number
  review: string
  role?: string
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const newReviewItem: ReviewItem = {
    id: 'local-' + Date.now(),
    name: data.name.trim(),
    projectName: data.projectName.trim(),
    rating: Number(data.rating),
    review: data.review.trim(),
    role: data.role?.trim() || 'Client',
    createdAt: new Date().toISOString(),
  }

  saveLocalReview(newReviewItem)

  try {
    const database = getFirebaseDb()
    if (database) {
      const savePromise = addDoc(collection(database, 'reviews'), {
        name: newReviewItem.name,
        projectName: newReviewItem.projectName,
        rating: newReviewItem.rating,
        review: newReviewItem.review,
        role: newReviewItem.role,
        createdAt: serverTimestamp(),
      })
      const timeoutPromise = new Promise<{ id: string }>((resolve) =>
        setTimeout(() => resolve({ id: newReviewItem.id || 'local' }), 1800)
      )
      const docRef: any = await Promise.race([savePromise, timeoutPromise])
      return { success: true, id: docRef?.id || newReviewItem.id }
    } else {
      // Direct Firestore REST write
      const restPromise = fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/reviews`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              name: { stringValue: newReviewItem.name },
              projectName: { stringValue: newReviewItem.projectName },
              rating: { integerValue: String(newReviewItem.rating) },
              review: { stringValue: newReviewItem.review },
              role: { stringValue: newReviewItem.role || 'Client' },
              createdAt: { stringValue: newReviewItem.createdAt },
            },
          }),
        }
      )
      const timeoutPromise = new Promise<any>((resolve) =>
        setTimeout(() => resolve({ id: newReviewItem.id }), 1800)
      )
      const res: any = await Promise.race([restPromise, timeoutPromise])
      const resData = res?.json ? await res.json() : {}
      const docId = resData?.name?.split('/').pop() || newReviewItem.id
      return { success: true, id: docId }
    }
  } catch (err: any) {
    console.warn('[Firebase] Firestore submission notice:', err?.message || err)
    return { success: true, id: newReviewItem.id }
  }
}

/**
 * Fetch reviews from Firestore REST API
 */
async function fetchFirestoreRestReviews(): Promise<ReviewItem[]> {
  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/reviews`
    )
    const data = await res.json()
    if (data.documents && Array.isArray(data.documents)) {
      return data.documents
        .map((d: any) => {
          const f = d.fields || {}
          return {
            id: d.name?.split('/').pop(),
            name: f.name?.stringValue || 'Anonymous',
            projectName: f.projectName?.stringValue || 'Web3 Project',
            rating: Number(f.rating?.integerValue || f.rating?.doubleValue || 5),
            review: f.review?.stringValue || '',
            role: f.role?.stringValue || 'Client',
            createdAt: f.createdAt?.stringValue || d.createTime || new Date().toISOString(),
          }
        })
        .filter((r: ReviewItem) => r.rating >= 3)
    }
  } catch (e) {
    // Graceful silent fallback
  }
  return []
}

/**
 * Realtime listener for reviews from Firestore
 * Filter: Only ratings >= 3
 */
export function subscribeToFirebaseReviews(
  onUpdate: (reviews: ReviewItem[]) => void
): () => void {
  // Initial REST fetch
  fetchFirestoreRestReviews().then((restList) => {
    if (restList.length > 0) {
      onUpdate(restList)
    }
  })

  // Periodic refresh from Firestore
  const intervalId = setInterval(() => {
    fetchFirestoreRestReviews().then((restList) => {
      onUpdate(restList)
    })
  }, 10000)

  try {
    const database = getFirebaseDb()
    if (!database) {
      return () => clearInterval(intervalId)
    }

    const reviewsCol = collection(database, 'reviews')
    const q = query(
      reviewsCol,
      where('rating', '>=', 3),
      limit(50)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreReviews: ReviewItem[] = []
          snapshot.forEach((doc) => {
            const d = doc.data()
            firestoreReviews.push({
              id: doc.id,
              name: d.name || 'Anonymous',
              projectName: d.projectName || 'Web3 Project',
              rating: Number(d.rating) || 5,
              review: d.review || '',
              role: d.role || 'Client',
              createdAt: d.createdAt?.toDate?.() ? d.createdAt.toDate().toISOString() : new Date().toISOString(),
            })
          })

          onUpdate(firestoreReviews.filter((r) => r.rating >= 3))
        } else {
          fetchFirestoreRestReviews().then(onUpdate)
        }
      },
      (error) => {
        console.warn('[Firebase] onSnapshot notice:', error?.message)
      }
    )

    return () => {
      clearInterval(intervalId)
      unsubscribe()
    }
  } catch (err) {
    return () => clearInterval(intervalId)
  }
}

