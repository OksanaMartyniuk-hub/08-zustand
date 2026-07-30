"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const backendTag = tag === "all" ? "" : tag;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["notes", page, 12, search, backendTag],
    queryFn: () => fetchNotes(page, 12, search, backendTag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          marginTop: "24px",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, maxWidth: "300px" }}>
          <SearchBox onChange={debouncedSearch} />
        </div>

        <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/notes/action/create"
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Create note +
          </Link>
        </div>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isPlaceholderData && <div>Оновлення...</div>}

      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {!isLoading && !isError && notes.length === 0 && search && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Нічого не знайдено за запитом &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}
