import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuirkCart Admin",
  description: "Admin panel for controlling your product on QuirkCart",
  applicationName: "QuirkCart Admin",
  keywords: [
    "Quirkcart Admin",
    "QuirkCart admin",
    "quirkcart admin",
    "quirk cart admin",
    "quirkcart admin website",
    "quirkcart store for admin",
  ],
  creator: "Arman Alam",
  icons: "Qlogo.svg",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
