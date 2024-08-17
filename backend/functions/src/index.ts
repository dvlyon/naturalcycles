import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

interface RequestWithUser extends express.Request {
  user?: admin.auth.DecodedIdToken;
}

// Initialize the Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();
const app = express();

// Use CORS middleware to enable requests from different origins
app.use(cors({ origin: true }));

// Middleware to validate Firebase ID Token
const authenticate = async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

// POST /profile - Create or update the user's profile
app.post("/profile", authenticate, async (req: RequestWithUser, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized.");
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  const uid = req.user.uid;

  try {
    const userRef = db.collection("users").doc(uid);
    await userRef.set({ name, email }, { merge: true });
    return res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).send(`Error updating profile: ${error}`);
  }
});

// GET /profile - Retrieve or create the user's profile
app.get("/profile", authenticate, async (req: RequestWithUser, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized.");
  }

  const uid = req.user.uid;

  try {
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      // Profile doesn't exist, create a new one with default values
      const newProfile = {
        name: req.user.name || "", // Use Firebase Authentication name if available
        email: req.user.email || "", // Use Firebase Authentication email if available
      };
      await userRef.set(newProfile);

      return res.status(200).json(newProfile);
    }

    return res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error retrieving or creating profile:", error);
    return res
      .status(500)
      .send(`Error retrieving or creating profile: ${error}`);
  }
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
