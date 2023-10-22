import { Buyer } from "./Buyer";
import { Item } from "./Item";

// Aguardando, Aprovado (ou Recusado), Em Transporte, Entregue
export interface Order {
    date: string,
    buyer: Buyer,
    paymentMethod: string,
    items: Item[]
    status?: 0 | 1 | 2 | 3 | 4
}