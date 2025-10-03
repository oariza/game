import { Geist, Geist_Mono, Winky_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const winkySans = Winky_Sans({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nachito App",
  description: "Ayuda a Perseito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${winkySans.variable}`}>
        {children}
      </body>
    </html>
  );
}
