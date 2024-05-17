import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import StoreProvider from "./StoreProvider";
import LottieLoading from "./components/LottieLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rookie Dev",
  description: "First Hello Text NextJS Libs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <LottieLoading />
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

