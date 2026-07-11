import {
  collection, doc, addDoc, updateDoc, onSnapshot,
  orderBy, query, serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export const STATUSES = [
  { id: 'new', label: 'New' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' },
]

export function subscribeTickets(onChange) {
  const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export function subscribeComments(ticketId, onChange) {
  const q = query(collection(db, 'tickets', ticketId, 'comments'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export function updateTicketStatus(ticketId, status) {
  return updateDoc(doc(db, 'tickets', ticketId), { status, updatedAt: serverTimestamp() })
}

export function addComment(ticketId, { authorName, body, internal }) {
  return addDoc(collection(db, 'tickets', ticketId, 'comments'), {
    authorName, body, internal: Boolean(internal), createdAt: serverTimestamp(),
  })
}
