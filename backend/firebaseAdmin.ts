import admin from 'firebase-admin';

const serviceAccount = require('./credentials/firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
