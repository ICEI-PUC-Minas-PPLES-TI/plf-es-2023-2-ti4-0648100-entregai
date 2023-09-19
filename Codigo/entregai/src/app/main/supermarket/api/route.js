import { db } from "@/lib/firebase/firebase-config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
    const supermarketCollection = collection(db, 'supermarkets');
    const querySnapshot = await getDocs(supermarketCollection);
    const supermarkets = [];

    querySnapshot.forEach((doc) => {
      supermarkets.push({ id: doc.id, ...doc.data() });
    });


    return NextResponse.json({supermarkets}, {status: 200});
}

export async function POST(request) {
    const { name, address, phone, cnpj } = await request.json()

    try {

        const supermarketRef = doc(db, "supermarkets", cnpj);
            
        await setDoc(supermarketRef, {
            name,
            address,
            phone,
            orders: [],
            stock: []
        });

        return NextResponse.json({}, {status: 200})

    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}