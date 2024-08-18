import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

interface RequestWithUser extends express.Request {
  user?: admin.auth.DecodedIdToken;
}

admin.initializeApp();

const db = admin.firestore();
const app = express();

// Allow requests from different origins
app.use(cors({ origin: true }));

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
    console.error("Error verifying Firebase ID token: ", error);

    return res.status(401).send("Unauthorized: Invalid token");
  }
};

app.get("/profile", authenticate, async (req: RequestWithUser, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized: Should never happen");
  }

  const uid = req.user.uid;

  try {
    const userRef = db.collection("users").doc(req.user.phone_number || uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      const newProfile = {
        name: req.user.name || "",
        email: req.user.email || "",
      };

      await userRef.set(newProfile);

      return res.status(200).json(newProfile);
    }

    return res.status(200).json(doc.data());
  } catch (error) {
    console.error("Error retrieving or creating profile: ", error);
    
    return res
      .status(500)
      .send(`Error retrieving or creating profile: ${error}`);
  }
});

app.post("/profile", authenticate, async (req: RequestWithUser, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized: Should never happen");
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  const uid = req.user.uid;

  try {
    const userRef = db.collection("users").doc(req.user.phone_number || uid);
    await userRef.set({ name, email }, { merge: true });

    return res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    
    return res.status(500).send(`Error updating profile: ${error}`);
  }
});

export const api = functions.https.onRequest(app);
