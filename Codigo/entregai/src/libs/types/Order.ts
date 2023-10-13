import { Buyer } from "./Buyer";
import { Product } from "./Product";

export interface Order {
    id: string,
    products: string[],
    date: Date,
    buyer: Buyer
}

// Melhorar essa interface depois