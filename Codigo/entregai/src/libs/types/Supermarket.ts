import { Product } from "./Product";
import { Order } from "./Order";

export interface Supermarket {
    id: string,
    name: string,
    address: string,
    phone: string,
    orders: Order[],
    stock: Product[]
}