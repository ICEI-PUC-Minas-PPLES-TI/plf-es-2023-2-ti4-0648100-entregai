import { Buyer } from "./Buyer";
import { Product } from "./Product";
export interface Order {
    products: Product[],
    buyer: Buyer,
    date: Date,
}

// Melhorar essa interface depois