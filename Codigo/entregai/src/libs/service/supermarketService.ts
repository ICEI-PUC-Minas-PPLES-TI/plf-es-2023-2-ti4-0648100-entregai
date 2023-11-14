import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase-config"
import { Supermarket } from "@/libs/types/Supermarket";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { getAllUsers } from "./userService";

export const getAllSupermarkets = async (): Promise<Supermarket[]> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketCollection = collection(db, 'supermarkets');

            const querySnapshot = await getDocs(supermarketCollection);

            const supermarkets: Supermarket[] = [];

            for (const doc of querySnapshot.docs) {

                const supermarket = { id: doc.id, ...doc.data() } as Supermarket

                const url = await getSupermarketImageUrl(doc.id)

                supermarket.imageUrl = url

                supermarkets.push(supermarket);
            }

            resolve(supermarkets)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateSupermarket = async (supermarket: Supermarket): Promise<Supermarket> => {
    return new Promise(async (resolve, reject) => {
        try {

            const { id, name, address, phone, cnpj, pricePerKm } = supermarket

            const supermarketRef = doc(db, "supermarkets", id);

            await updateDoc(supermarketRef, { name, address, phone, cnpj, pricePerKm })

            resolve(supermarket)
            
        } catch (err) {
            reject(err)
        }
    })
}

export const getSupermarketImageUrl = async (id: string): Promise<string> => {
    return new Promise(async (resolve) => {
        try {

            const imgRef = ref(storage, `images/${id}`)

            await getDownloadURL(imgRef).then((url) => {
                resolve(url)
            })

        } catch (err) {
            
            resolve('')
        }
    })
}

export const deleteSupermarketImage = async (id: string): Promise<void> => {
    return new Promise(async (resolve) => {
        try {

            const imgRef = ref(storage, `images/${id}`)

            await deleteObject(imgRef)

            resolve()

        } catch (err) {
            resolve()
        }
    })
}

export const getSupermarketById = async (id: string): Promise<Supermarket> => {
    return new Promise(async (resolve, reject) => {
        try {
            const supermarketRef = doc(db, "supermarkets", id);

            const docSnap = await getDoc(supermarketRef)

            if (docSnap.exists()) {
                
                const resultData = { id, ...docSnap.data() } as Supermarket

                resolve(resultData)
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const registerSupermarket = async (id: string, name: string, address: string, phone: string, cnpj: string, pricePerKm: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", id);

            await setDoc(supermarketRef, {
                name,
                address,
                cnpj,
                phone,
                pricePerKm,
                orders: [],
                stock: []
            });

            resolve({ id, name, address, phone, cnpj, pricePerKm })

        } catch (err) {
            reject(err)
        }
    })
}

export const deleteSupermarket = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const supermarketRef = doc(db, "supermarkets", id)

            await deleteDoc(supermarketRef)

            await deleteSupermarketImage(id)

            const usersCollection = collection(db, 'users');

            const querySnapshot = await getDocs(usersCollection);

            for (const doc of querySnapshot.docs) {

                const { selectedSupermarkets } = doc.data();

                const updatedSupermarkets = selectedSupermarkets.filter((supId: string) => supId !== id);

                await updateDoc(doc.ref, { selectedSupermarkets: updatedSupermarkets });

            }

            resolve(supermarketRef)

        } catch (err) {
            reject(err)
        }
    })
}

