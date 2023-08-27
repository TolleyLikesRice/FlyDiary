import NavBar from "@/components/complex-ui/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <NavBar />
            {children}
        </section>
    )
}