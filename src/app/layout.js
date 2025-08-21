import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "./gallery/page";

export const metadata = {
  title: "Dynamic Web App",
  description: "For School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}