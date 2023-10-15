import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { User } from "../types/User";
import { auth, db } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import admin from "../firebase/firebase-admin-config";

export const getAllUsers = async (): Promise<User[]> => {
    return new Promise(async (resolve, reject) => {
        try {

            const usersCollection = collection(db, 'users');

            const querySnapshot = await getDocs(usersCollection);

            const users: User[] = [];

            for (const doc of querySnapshot.docs) {

                const userData = { id: doc.id, ...doc.data() } as User;

                users.push(userData);
            }
        
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}

export const getUser = async (id: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
			const userRef = doc(db, "users", id);

			const document = await getDoc(userRef);

			if (document.exists()) {

				const resultData = { id, ...document.data() } as User

                resolve(resultData)

            }
        } catch (err) {

            reject(err)
        }
    })

}

export const registerUser = async (email: string, password: string, name: string, permissionLevel: boolean, selectedSupermarkets: string[]): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {

            const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

            const id = userCredetial.user.uid

            createUserDocument(id, name, email, permissionLevel, selectedSupermarkets)

            resolve({ id, email, name, permissionLevel, selectedSupermarkets })

        } catch (err) {

            reject(err)
        }
    })
}

export const deleteUser = async (id: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDocRef = doc(db, 'users', id)

            await deleteDoc(userDocRef)

            admin.auth().deleteUser(id)

            resolve()

        } catch (err) {
            reject(err)
        }
    })
}

export const updateUser = async (user: User): Promise<User> => {
    return new Promise(async (resolve, reject) => {

        try {

            const { id, email, name, permissionLevel, selectedSupermarkets, password } = user

            const userDocRef = doc(db, 'users', id)

            await updateDoc(userDocRef, { email, name, permissionLevel, selectedSupermarkets })

            const authUpdate = { email, ...(password !== '' && { password })}

            admin.auth().updateUser(id, authUpdate)

            resolve(user)
            
        } catch (err) {
            reject(err)
        }
    })
}

export const tryToCreateAdminUser = async (email: string, password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {

        const email = process.env.ADMIN_EMAIL as string
        const password = process.env.ADMIN_PASSWORD as string

        if (email !== email && password !== password) {
            reject("Admin registration denied, invalid credentials")
        }
        
        try {

            registerUser(email, password, 'Administrador', true, [])

            resolve("Admin registration completed successfully")

        } catch (err) {
            reject("Admin registration already exists in the database")
        }
    })
}

export const createUserDocument = async (uid: string, name: string, email: string, permissionLevel: boolean, selectedSupermarkets: string[]) => {
    const userRef = doc(db, "users", uid);
            
    await setDoc(userRef, { name, email, permissionLevel, selectedSupermarkets });
}