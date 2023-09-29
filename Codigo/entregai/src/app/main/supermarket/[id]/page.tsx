import SupermarketHome from "@/components/pages/supermarket/SupermarketHome";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <div>
            <SupermarketHome id={params.id} />
        </div>
    )
}


