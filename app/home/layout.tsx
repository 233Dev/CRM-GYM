import NavBar from "../componentes/NavBar";

export default function HomeUserLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav>
            <NavBar/>
        </nav>
   
        {children}
      </section>
    )
  }