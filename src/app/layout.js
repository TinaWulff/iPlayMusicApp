import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { PlayerProvider } from "@/app/context/PlayerContext";

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
        <PlayerProvider>
          <Header />
          <main className="flex">
          {children}
          </main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
