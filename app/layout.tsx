import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const BASE_URL = "https://notehub.com";

export const metadata: Metadata = {
  title: {
    default: "NoteHub — Сучасний сервіс для ваших нотаток",
    template: "%s | NoteHub",
  },
  description:
    "Зберігайте, редагуйте та структуруйте свої думки та нотатки в одному місці за допомогою NoteHub.",
  openGraph: {
    title: "NoteHub — Сучасний сервіс для ваших нотаток",
    description:
      "Зберігайте, редагуйте та структуруйте свої думки та нотатки в одному місці за допомогою NoteHub.",
    url: BASE_URL,
    images: [
      {
        url: "https://goit.global",
        width: 1200,
        height: 630,
        alt: "NoteHub — Платформа для керування нотатками",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body
        className={roboto.className}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>

          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
