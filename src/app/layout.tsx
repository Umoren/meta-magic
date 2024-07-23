import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Meta Content Generator",
  description: "Generate metadata for your articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex-grow  flex-1">{children}</div>
      </body>
    </html>
  );
}