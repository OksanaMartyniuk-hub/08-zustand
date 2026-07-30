import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

// 1. Асинхронна функція для генерації динамічного SEO та Open Graph
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const url = `https://notehub.com{id}`;

  try {
    // Отримуємо дані нотатки через ваш API-клієнт
    const note = await fetchNoteById(id);
    const title = note.title || "Нотатка";

    // Створюємо короткий опис, обрізаючи основний текст нотатки
    const description = note.content
      ? note.content.substring(0, 150) + "..."
      : "Детальний перегляд та редагування вашої нотатки в NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title: `${title} | NoteHub`,
        description,
        url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `Перегляд нотатки: ${title}`,
          },
        ],
      },
    };
  } catch (error) {
    // Дружній фолбек, якщо сталася помилка (наприклад, неправильний ID)
    return {
      title: "Нотатку не знайдено",
      description:
        "Ой! Схоже, цієї нотатки більше немає або посилання на неї недійсне.",
      openGraph: {
        title: "Нотатку не знайдено | NoteHub",
        description: "Нотатка не існує або була видалена.",
        url,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Помилка завантаження нотатки",
          },
        ],
      },
    };
  }
}

// 2. Ваш серверний компонент з префетчингом
export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
