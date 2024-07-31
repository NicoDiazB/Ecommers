import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuki",
  description: "learning NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <AuthProvider>
          <Navbar />
          <Toaster
            closeButton
            // position="top-center"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "bg-[#ebdabd]  p-4 shadow-card-shadow rounded-md border-1 border-primary",
                title: "text-secundary",
                actionButton:
                  "bg-secundary text-sm text-soft-letter px-2 py-1 rounded-xl",
                description: "text-primary",
                closeButton: " bg-soft-letter",
              },
            }}
          />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
