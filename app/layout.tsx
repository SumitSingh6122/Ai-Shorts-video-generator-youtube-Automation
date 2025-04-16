import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ConvexClientProvider from "./ConvexClientProvider";
import { ToastContainer } from 'react-toastify';
import { VisitorTracker } from "./(main)/_component/VisitorTracker";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const outfit=Outfit({subsets:['latin'],display:'swap'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={outfit.className}
      ><NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <ConvexClientProvider>
        <ToastContainer position="top-center" />
        <VisitorTracker/>
        {children}

        </ConvexClientProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
