import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import admin from "./firebase-admin-config";

const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);
            const users = [];
        
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
        
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}

const registerUser = async (email, password, name, permissionLevel) => {
    return new Promise(async (resolve, reject) => {
        try {

            const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

            createUserDocument(userCredetial.user.uid, name, email, permissionLevel)

            resolve({uid: userCredetial.user.uid, email, password, name, permissionLevel})

        } catch (err) {

            reject(err)
        }
    })
}

const deleteUser = async (id) => {
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

const updateUser = async (id, email, password, name, permissionLevel) => {
    return new Promise(async (resolve, reject) => {

        try {

            const usersCollection = collection(db, 'users');

            const userDocRef = doc(usersCollection, id)

            const updatedData = { email, name, permissionLevel }

            await updateDoc(userDocRef, updatedData)

            const authUpdate = { email, ...(password !== '' && { password })}

            admin.auth().updateUser(id, authUpdate)

            resolve({ id, email, password, name, permissionLevel })
        } catch (err) {
            reject(err)
        }
    })
}

const createUserDocument = async (uid, name, email, permissionLevel) => {
    const userRef = doc(db, "users", uid);
            
    await setDoc(userRef, { name, email, permissionLevel });
}

export { deleteUser, registerUser, updateUser, getAllUsers, createUserDocument }