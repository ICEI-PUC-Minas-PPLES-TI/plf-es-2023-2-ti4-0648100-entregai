import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config"

const getAllSupermarkets = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const supermarketCollection = collection(db, 'supermarkets');
            const querySnapshot = await getDocs(supermarketCollection);
            const supermarkets = [];
        
            querySnapshot.forEach((doc) => {
              supermarkets.push({ id: doc.id, ...doc.data() });
            });

            resolve(supermarkets)
        } catch (err) {
            reject(err)
        }
    })
}

const registerSupermarket = async (name, address, phone, cnpj) => {
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

export { getAllSupermarkets, registerSupermarket }

