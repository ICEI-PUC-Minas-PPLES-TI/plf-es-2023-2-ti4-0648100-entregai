import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import admin from "./firebase-admin-config";
import { User } from "@/types/User";

const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);
            const users: User[] = [];
        
            querySnapshot.forEach((doc) => {
                const userData = { id: doc.id, ...doc.data() } as User;
                users.push(userData);
              });
        
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}

const getUser = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
			const userRef = doc(db, "users", id);

			const document = await getDoc(userRef);

			if (document.exists()) {

				const resultData = { id, ...document.data() }

                resolve(resultData)

            }
        } catch (err) {

            reject(err)
        }
    })

}

const registerUser = async (email: string, password: string, name: string, permissionLevel: boolean, selectedSupermarkets: string[]) => {
    return new Promise(async (resolve, reject) => {
        try {

            const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

            createUserDocument(userCredetial.user.uid, name, email, permissionLevel, selectedSupermarkets)

            resolve({uid: userCredetial.user.uid, email, password, name, permissionLevel})

        } catch (err) {

            reject(err)
        }
    })
}

const deleteUser = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersCollection = collection(db, 'users');

            const userDocRef = doc(usersCollection, id)

            await deleteDoc(userDocRef)

            admin.auth().deleteUser(id)

            resolve(userDocRef)

        } catch (err) {
            reject(err)
        }
    })
}

const updateUser = async (id: string, email: string, password: string, name: string, permissionLevel: boolean, selectedSupermarkets: string[]) => {
    return new Promise(async (resolve, reject) => {

        try {

            const usersCollection = collection(db, 'users');

            const userDocRef = doc(usersCollection, id)

            const updatedData = { email, name, permissionLevel, selectedSupermarkets }

            await updateDoc(userDocRef, updatedData)

            const authUpdate = { email, ...(password !== '' && { password })}

            admin.auth().updateUser(id, authUpdate)

            resolve({ id, email, password, name, permissionLevel, selectedSupermarkets })
        } catch (err) {
            reject(err)
        }
    })
}

const createUserDocument = async (uid: string, name: string, email: string, permissionLevel: boolean, selectedSupermarkets: string[]) => {
    const userRef = doc(db, "users", uid);
            
    await setDoc(userRef, { name, email, permissionLevel, selectedSupermarkets });
}

export { deleteUser, getUser, registerUser, updateUser, getAllUsers, createUserDocument }