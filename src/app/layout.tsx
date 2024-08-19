import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Providers} from './providers'
import { fonts } from "./fonts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Rapport | internRFC",
    template: "%s | internRFC",
  },
  description: "interRFC website for intern management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
  );
}
