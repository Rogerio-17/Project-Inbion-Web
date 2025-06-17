import "./globals.css";
import { Red_Hat_Display } from "next/font/google"
import { GoogleAnalytics } from '@next/third-parties/google'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ["400", "500", "600"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${redHatDisplay.className} bg-background-primary overflow-x-hidden text-content-body antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-4MBV2E48BR" />
    </html>
  );
}
