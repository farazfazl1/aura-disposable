import Header from "@/components/Header"
import Footer from "@/components/Footer"
import StoreCatalog from "@/components/StoreCatalog"

export default function StorePage() {
  return (
    <div className="aura-page min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <StoreCatalog />
      </main>
      <Footer />
    </div>
  )
}
