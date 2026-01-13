import "./globals.css";

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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
