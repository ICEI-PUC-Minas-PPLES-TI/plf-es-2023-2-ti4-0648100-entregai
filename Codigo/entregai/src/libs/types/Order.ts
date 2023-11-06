import { Buyer } from "./Buyer";
import { Item } from "./Item";
import { Product } from "./Product";

// Aguardando, Aprovado, Em Transporte, Entregue, Finalizado, Recusado, Cancelado,
export interface Order {
    id: string,
    date: string,
    buyer: Buyer,
    paymentMethod: string,
    items: Item[]
    subtotal: string,
    shipping: string,
    status?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}