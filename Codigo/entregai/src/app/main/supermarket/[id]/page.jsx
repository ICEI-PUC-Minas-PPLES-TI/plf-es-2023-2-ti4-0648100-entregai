import SupermarketHome from "@/components/pages/supermarket/SupermarketHome";

export default function Page({ params }) {

    return (
        <div>
            <SupermarketHome id={params.id} />
        </div>
    )
}


