import {
  db, auth, fireStore,
} from './firebase';
import {
  isNotEmpty, getFirstSplit,
} from '../utils/utils';

export async function fetchMessages() {
  const chatRef = db.collection('messages');

  const snapshot = await chatRef.orderBy('created').get();
  return snapshot.docs;
}

export async function postMessage(chat) {
  const { currentUser: { email } } = auth;
  if (isNotEmpty(email)) {
    const { id } = await db.collection('messages').add({
      user: getFirstSplit(email)('@'),
      message: chat.message,
      created: fireStore.FieldValue.serverTimestamp(),
      show: true,
    });

    return id;
  }
  return null;
}
