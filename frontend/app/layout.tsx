import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";

export const metadata: Metadata = {
  title: "Pizzao - Original Italian Pizza Parlor",
  description: "Amazing and Hygiene Pasta and Pizza Parlor. Best Italian food for your family.",
  keywords: "pizza, italian food, pasta, restaurant, delivery, pizzao",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
