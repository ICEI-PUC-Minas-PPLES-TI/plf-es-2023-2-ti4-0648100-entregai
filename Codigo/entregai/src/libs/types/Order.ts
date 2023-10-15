import { Buyer } from "./Buyer";
import { Item } from "./Item";
export interface Order {
    date: string,
    buyer: Buyer,
    items: Item[]
}