import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { AnalyticsWrapper } from "./ui/components/AnalyticsWrapper";

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
        <AnalyticsWrapper>
          <div className="flex-grow  flex-1">{children}</div>
          <footer className="bg-gray-100 py-4 text-center">
            <p>
              hey {" "}

              <a href="https://umoren.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                samuel
              </a>
              {" "} built this
            </p>
          </footer>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}