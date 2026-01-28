import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: { 
  template: "%s | iPlayMusic",
  default: "iPlayMusic" //undersiders titel stå her
},
 description: "App for playing music from spotify"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="box-border"
      >
        <Header />
        <main className="flex m-4">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
