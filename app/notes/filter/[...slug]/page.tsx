import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;

  const currentTag = slug?.[0] || "all";

  const isAll = currentTag === "all";
  const title = isAll ? "Всі нотатки" : `Нотатки з тегом #${currentTag}`;
  const description = isAll
    ? "Переглядайте та керуйте всіма своїми нотатками в органайзері NoteHub."
    : `Усі ваші збережені нотатки, які відфільтровано за категорією або тегом #${currentTag}.`;

  const url = `https://notehub.com{slug ? slug.join("/") : ""}`;

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
          alt: isAll
            ? "Усі нотатки в NoteHub"
            : `Нотатки за тегом ${currentTag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const currentTag = slug?.[0] || "all";

  const backendTag = currentTag === "all" ? "" : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, 12, "", backendTag],
    queryFn: () => fetchNotes(1, 12, "", backendTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
