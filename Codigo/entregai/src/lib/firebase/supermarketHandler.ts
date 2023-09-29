import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase-config"
import { Supermarket } from "@/types/Supermarket";

const getAllSupermarkets = async () => {
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

const getSupermarket = async (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const supermarketRef = doc(db, "supermarkets", id);
            const docSnap = await getDoc(supermarketRef)

            const resultData = docSnap.data()

            resolve(resultData)
        } catch (err) {
            reject(err)
        }
    })
}

const registerSupermarket = async (name: string, address: string, phone: string, cnpj: string) => {
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

const deleteSupermarket = async (id: string) => {

}

export { getSupermarket, getAllSupermarkets, registerSupermarket }

