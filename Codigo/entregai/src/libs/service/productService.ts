import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config"
import { Product } from "../types/Product";

// Method 1 = Adds, Method = 2 Removes
export const updateProductQuantityInStock = async (supermarketId: string, productId: string, quantity: number, method: number) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { stock } = docSnap.data();

                const updatedStock = stock.map((stockProduct: Product) => {
                    if (stockProduct.id === productId) {
                        if (method === 1) {
                            stockProduct.stockQuantity -= Number(quantity)
                            stockProduct.soldQuantity! += Number(quantity)
                        } else {
                            stockProduct.stockQuantity += Number(quantity)
                            stockProduct.soldQuantity! -= Number(quantity)
                        }
                    }

                    return stockProduct 
                })

                await updateDoc(supermarketRef, { stock: updatedStock });

                resolve({ supermarketId, productId, quantity })
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const updateProductInStock = async (supermarketId: string, product: Product) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { stock } = docSnap.data();

                const updatedStock = stock.map((stockProduct: Product) => {
                    if (stockProduct.id === product.id) {
                        return product;
                    }

                    return stockProduct 
                })

                await updateDoc(supermarketRef, { stock: updatedStock });

                resolve({ supermarketId, product })
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const deleteProductInStock = async (supermarketId: string, productId: string) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { stock } = docSnap.data();

                const updatedStock = stock.filter((stockProduct: Product) => stockProduct.id !== productId);

                await updateDoc(supermarketRef, { stock: updatedStock });

                resolve({ supermarketId, productId })
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const registerProductToStock = async (supermarketId: string, product: Product) => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { stock } = docSnap.data();

                stock.push(product);

                await updateDoc(supermarketRef, { stock });

                resolve({ supermarketId, product })
            }
            
        } catch (err) {
            reject(err)
        }
    })
}