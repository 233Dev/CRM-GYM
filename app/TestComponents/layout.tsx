import { Inter } from "next/font/google";
import "../globals.css";
import Sidemenu from "../componentes/Sidemenu";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex row">
            <Sidemenu />
            {children}
        </div>
      </body>
    </html>
  );
} 
