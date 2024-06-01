import { MainMenu } from "@/components/MainMenu";
import { cn } from "@/lib/cn";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Poppins, Roboto_Flex as Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.felipelima.net"),
  title: {
    default: "Felipe Lima",
    template: "%s | Felipe Lima",
  },
  description:
    "Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.",
  openGraph: {
    title: "Felipe Lima",
    description:
      "Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.",
    url: "https://www.felipelima.net",
    siteName: "Felipe Lima",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Felipe Lima",
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          poppins.className,
          "bg-zinc-100 font-sans text-indigoDark-900 dark:bg-indigoDark-500 dark:text-framboesa-50"
        )}
      >
        <header className="h-auto p-4 top-0 z-40 sticky w-full backdrop-blur-lg border-b border-b-indigoDark-100 dark:border-b-indigoDark-700">
          <div className="relative">
            <MainMenu />
          </div>
        </header>
          {children}
        { process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId={process.env.GTM_ID!} /> }
        <Analytics />
      </body>
    </html>
  );
}
