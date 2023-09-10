import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

// Creates the admin user
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        
        // Regenera o usuário admin
        await createUserWithEmailAndPassword(auth, process.env.USER_ADMIN_EMAIL, process.env.USER_ADMIN_PASSWORD)
            .then(() => {
                console.log('Admin user regenerated');
            })
            
            .catch(() => {
                console.log('Admin user already exists')
            }
        );

        // Regenera os dados do usuário admin
        await signInWithEmailAndPassword(auth, process.env.USER_ADMIN_EMAIL, process.env.USER_ADMIN_PASSWORD)
            .then(async (userCredential) => {
                const userRef = doc(db, "users", userCredential.user.uid);
            
                await setDoc(userRef, { name: 'Administrador', permission: 1, });
            }
        )

    }
}