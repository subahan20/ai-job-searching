import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./store/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Job Boards Sync & Profile Matcher - LinkedIn, Naukri, Indeed",
  description: "Sync your skills and experience to check matches instantly and apply across top platforms like LinkedIn, Naukri, and Indeed directly inside one dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
