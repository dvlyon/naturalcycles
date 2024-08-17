import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

export const countHits = functions.https.onRequest(async (req, res) => {
  const counterRef = db.collection('counters').doc('hitCounter');

  try {
    // Atomically increment the counter
    await counterRef.set(
      { count: admin.firestore.FieldValue.increment(1) },
      { merge: true }
    );
    res.send('Counter updated!');
  } catch (error) {
    res.status(500).send(`Error updating counter: ${error}`);
  }
});
