import type { Metadata } from "next";
import Link from "next/link";
import css from "./page.module.css";

// Додано SEO метадані згідно з ТЗ
export const metadata: Metadata = {
  title: "404 - Page not found",
  description:
    "Сторінку не знайдено. Перевірте правильність введеної адреси або поверніться до нотаток NoteHub.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "Сторінку не знайдено на сервісі NoteHub.",
    url: "https://notehub.com",
    images: [
      {
        url: "https://goit.global",
        width: 1200,
        height: 630,
        alt: "Сторінку не знайдено на NoteHub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/notes/filter"
        style={{
          marginTop: "20px",
          display: "inline-block",
          color: "#0070f3",
          textDecoration: "underline",
        }}
      >
        Return to Notes
      </Link>
    </div>
  );
}
