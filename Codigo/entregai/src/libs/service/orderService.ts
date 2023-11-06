import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Order } from "../types/Order";
import { db } from "../firebase/firebase-config";
import { getAllSupermarkets } from "./supermarketService";
import { Supermarket } from "../types/Supermarket";

export const trackOrder = async (orderCode: string): Promise<[Supermarket, Order]> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarkets = await getAllSupermarkets()

            const supermarket: Supermarket = supermarkets.find((supermarket: Supermarket) => supermarket.orders!.find((order: Order) => order.id === orderCode))!

            const order: Order = supermarket.orders!.find((order: Order) => order.id === orderCode)!

            resolve([supermarket, order])

        } catch (err) {
            reject(err)
        }
    })
}

export const getOrderById = async (supermarketId: string, orderId: string): Promise<Order> => {
    return new Promise(async (resolve, reject) => {
        try {

            const supermarketRef = doc(db, "supermarkets", supermarketId);

            const docSnap = await getDoc(supermarketRef);

            if (docSnap.exists()) {

                const { orders } = docSnap.data();

                const order = orders.find((order: Order) => order.id === orderId)

                resolve(order)
            }

        } catch (err) {
            reject(err)
        }
    })
}

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

                const { orders, name } = docSnap.data();

                orders.push(order)

                await updateDoc(supermarketRef, { orders })

                // send notification to all users

                const usersCollection = collection(db, 'users');

                const querySnapshot = await getDocs(usersCollection);
    
                for (const doc of querySnapshot.docs) {

                    const user = doc.data()

                    if (user.selectedSupermarkets.indexOf(supermarketId) !== -1 || user.permissionLevel) {

                        const notification = {
                            supermarketName: name,
                            title: "Novo pedido",
                            body: `Um novo pedido foi feito no supermercado ${name}!`,
                            date: new Date().toLocaleString(),
                            checked: false
                        }

                        user.notifications.push(notification)

                        await updateDoc(doc.ref, { notifications: user.notifications })

                    }
    
                    // const supermarket = { id: doc.id, ...doc.data() } as Supermarket
    
                    // const url = await getSupermarketImageUrl(doc.id)
    
                    // supermarket.imageUrl = url
    
                    // supermarkets.push(supermarket);
                }


                resolve(order)
            }

        } catch (err) {
            reject(err)
        }
    })
}