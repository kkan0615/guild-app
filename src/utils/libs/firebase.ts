export let firebaseApp = null

export const initializeFirebaseApp = () => {
  /* To create as singleton */
  if (!firebaseApp)
    firebaseApp = null
}
