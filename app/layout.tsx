import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "FinStart - לימוד פיננסי חכם",
  description: "למד לנהל את הכסף שלך בצורה חכמה - אפליקציית לימוד פיננסי לצעירים",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#14b8a6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-sans antialiased">
        <UserProvider>
          <div className="mx-auto max-w-md min-h-screen relative">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
