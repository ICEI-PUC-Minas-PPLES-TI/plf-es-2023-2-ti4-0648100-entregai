import admin from "firebase-admin"
import { ServiceAccount } from "firebase-admin/app";

const firebaseConfig: ServiceAccount = {
    // type: process.env.FIREBASE_ADMIN_TYPE,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    // private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    // auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    // token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    // auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig)
    });
}

export default admin