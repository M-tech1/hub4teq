import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const COUNTER_REF_PATH = ['counters', 'tickets']

// Atomically increments a shared counter doc and writes the new ticket in the same
// transaction, so ticket numbers are sequential (#1, #2, ...) even with concurrent submitters.
export async function createTicket(fields) {
  const ticketsCol = collection(db, 'tickets')
  const counterRef = doc(db, ...COUNTER_REF_PATH)
  const newTicketRef = doc(ticketsCol)

  const ticketNumber = await runTransaction(db, async (tx) => {
    const counterSnap = await tx.get(counterRef)
    const next = (counterSnap.exists() ? counterSnap.data().value : 0) + 1

    tx.set(counterRef, { value: next }, { merge: true })
    tx.set(newTicketRef, {
      ticketNumber: next,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...fields,
    })

    return next
  })

  return { id: newTicketRef.id, ticketNumber }
}
