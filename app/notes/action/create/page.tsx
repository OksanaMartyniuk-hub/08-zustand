import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"; // Імпортуємо новий файл стилів

export const metadata: Metadata = {
  title: "Створити нову нотатку",
  description:
    "Зручна форма для створення нової нотатки в сервісі NoteHub з автозбереженням чернетки.",
  openGraph: {
    title: "Створити нову нотатку | NoteHub",
    description:
      "Форма створення нотатки в NoteHub з автоматичним збереженням чернетки.",
    url: "https://notehub.com",
    images: [
      {
        url: "https://goit.global",
        width: 1200,
        height: 630,
        alt: "Сторінка створення нотатки в NoteHub",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
