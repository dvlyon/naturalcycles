# DvLyon - Natural Cycles

## Fullstack Engineer Challenge

This project is part of the Fullstack Engineer Challenge for Natural Cycles. It includes a backend API using Firebase Cloud Functions and a frontend built with React and Vite.

### Backend

The backend is built using Firebase Cloud Functions and Firestore. It handles user authentication via Firebase Authentication and provides endpoints for managing user profiles.

#### Setup

1.  **Install Firebase CLI**:

```bash
npm install -g firebase-tools
```

2. **Clone the Repository**:

```bash
git clone https://github.com/dvlyon/naturalcycles.git
cd naturalcycles
```

3. **Install Dependencies**:

```bash
cd backend/functions
npm install
```

4. **Configure Firebase**:

Ensure your Firebase project is configured correctly. You need to set up Firebase Authentication, Firestore, and Cloud Functions in the Firebase Console.

5. **Deploy to Firebase**:

```bash
npm run deploy
```

### Frontend

The frontend is built using React with Vite, styled-components for styling, and Firebase Authentication + FirebaseUI for user sign-in via phone number.

#### Setup

1. **Install Dependencies**:

```bash
cd frontend
npm install
```

2. **Environment Variables**:

Create a .env file in the root of the project and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PROFILE_URL=your_functions_deploy_url
```

3. **Run the Application**:

```bash
npm run dev
```

4. **Build for Production**:

```bash
npm run build
```

5. **Deploy**:

The frontend can be deployed using any static site hosting service like Vercel, Netlify, or Firebase Hosting.

### Deployment

The project is deployed and can be accessed at:

https://dvlyon-naturalcycles.web.app

### Additional Notes

The backend uses Firebase Authentication for securing endpoints.

Ensure that your Firebase project has phone authentication enabled and is properly configured.

The application should be run in an HTTPS environment to ensure proper functioning of Firebase Authentication.
