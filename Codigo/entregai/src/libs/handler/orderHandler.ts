import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Order } from "../types/Order";
import { db } from "../firebase/firebase-config";

export const registerOrder = async (order: Order, supermarketId: string): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            order.date = new Date();

            order.totalPrice = 0

            order.products.forEach(product => {
                order.totalPrice = order.totalPrice + (product.price * product.quantity)
                delete product.stockQuantity
            })

            if (docSnap.exists()) {

                const { orders } = docSnap.data();

                orders.push(order)

                await updateDoc(supermarketRef, { orders })

                resolve(order)
            }

        } catch (err) {
            reject(err)
        }
    })
}