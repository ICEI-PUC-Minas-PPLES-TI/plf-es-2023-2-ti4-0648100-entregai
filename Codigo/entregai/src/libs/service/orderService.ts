import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Order } from "../types/Order";
import { db } from "../firebase/firebase-config";

export const updateOrder = async (orderId: string, supermarketId: string, updateCode: Order["status"]): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { orders } = docSnap.data();

                const updatedOrders = orders.map((order: Order) => {
                    if (order.id === orderId) {

                        order.status = updateCode

                        return order
                    }
                    
                    return order
                })

                await updateDoc(supermarketRef, { orders: updatedOrders })

                resolve()
            }

        } catch (err) {
            reject(err)
        }
    })
}

export const registerOrder = async (order: Order, supermarketId: string): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

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