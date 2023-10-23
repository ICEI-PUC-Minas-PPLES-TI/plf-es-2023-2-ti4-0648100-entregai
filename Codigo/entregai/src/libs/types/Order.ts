import { Buyer } from "./Buyer";
import { Item } from "./Item";

// Aguardando, Aprovado (ou Recusado), Em Transporte, Entregue
export interface Order {
    id: string,
    date: string,
    buyer: Buyer,
    paymentMethod: string,
    items: Item[]
    subtotal: string,
    shipping: string,
    status?: 0 | 1 | 2 | 3 | 4
}