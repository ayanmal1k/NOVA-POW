import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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


// Firebase Web SDK configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
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

const LOCAL_STORAGE_KEY = 'novapow_community_reviews'

// Helper to get local cached reviews (only real submitted reviews)
export function getStoredLocalReviews(): ReviewItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to parse local reviews', e)
  }
  return []
}

// Helper to save review locally
export function saveLocalReview(review: ReviewItem): ReviewItem[] {
  if (typeof window === 'undefined') return [review]
  try {
    const current = getStoredLocalReviews()
    const updated = [review, ...current]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch (e) {
    console.error('Failed to save review to localStorage', e)
    return [review]
  }
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

  // Save locally for instant preview
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
    }
  } catch (err: any) {
    console.warn('[Firebase] Firestore submission notice (saved to local cache):', err?.message || err)
    return { success: true, id: newReviewItem.id }
  }

  return { success: true, id: newReviewItem.id }
}

/**
 * Realtime listener for reviews from Firestore
 * Filter: Only ratings >= 3
 */
export function subscribeToFirebaseReviews(
  onUpdate: (reviews: ReviewItem[]) => void
): () => void {
  const localList = getStoredLocalReviews().filter((r) => r.rating >= 3)
  onUpdate(localList)

  try {
    const database = getFirebaseDb()
    if (!database) {
      return () => {}
    }

    const reviewsCol = collection(database, 'reviews')
    // Fetch real reviews with rating >= 3
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
          // If Firestore is empty, show local reviews
          onUpdate(getStoredLocalReviews().filter((r) => r.rating >= 3))
        }
      },
      (error) => {
        console.warn('[Firebase] onSnapshot notice (using local data):', error?.message)
      }
    )

    return unsubscribe
  } catch (err) {
    console.warn('[Firebase] Subscription listener error:', err)
    return () => {}
  }
}
