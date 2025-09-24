import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
// import { AuthProviderChat } from "@/contexts/AuthContextChat";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediQuery - Smart Health Guidance",
  description: "Smart Chatbot for Health Guidance & Local Medicine Discovery",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          {/* <AuthProviderChat> */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          {/* </AuthProviderChat> */}
        </AuthProvider>
      </body>
    </html>
  );
}
