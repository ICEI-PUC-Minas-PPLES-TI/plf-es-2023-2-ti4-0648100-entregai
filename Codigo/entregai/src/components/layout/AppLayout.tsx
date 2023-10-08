import MenuBar from "../misc/MenuBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>

            <MenuBar />

            { children }

        </div>
    )
}