const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp();

const db = admin.database();

exports.countHits = functions.https.onRequest((req: any, res: any) => {
  const counterRef = db.ref('hitCounter');
  
  // Transaction ensures that the counter is updated atomically
  counterRef.transaction((current: any) => {
    return (current || 0) + 1;
  })
  .then(() => res.send('Counter updated!'))
  .catch((error: string) => res.status(500).send(`Error updating counter: ${error}`));
});
