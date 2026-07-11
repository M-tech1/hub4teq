import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'

export function signInAgent(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOutAgent() {
  return signOut(auth)
}
