import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config"
import { Supermarket } from "@/libs/types/Supermarket";

export const getAllSupermarkets = async (): Promise<Supermarket[]> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketCollection = collection(db, 'supermarkets');

            const querySnapshot = await getDocs(supermarketCollection);

            const supermarkets: Supermarket[] = [];
        
            querySnapshot.forEach((doc) => {
                supermarkets.push({ id: doc.id, ...doc.data() } as Supermarket);
            });

            resolve(supermarkets)
        } catch (err) {
            reject(err)
        }
    })
}

export const getSupermarketById = async (id: string): Promise<Supermarket> => {
    return new Promise(async (resolve, reject) => {
        try {
            const supermarketRef = doc(db, "supermarkets", id);

            const docSnap = await getDoc(supermarketRef)

            if (docSnap.exists()) {
                const resultData: Supermarket = { id, ...docSnap.data() } as Supermarket

                resolve(resultData)
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const registerSupermarket = async (name: string, address: string, phone: string, cnpj: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", cnpj);
            
            await setDoc(supermarketRef, {
                name,
                address,
                phone,
                orders: [],
                stock: []
            });

            resolve({ name, address, phone, cnpj })

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

            resolve(supermarketRef)

        } catch (err) {
            reject(err)
        }
    })
}

