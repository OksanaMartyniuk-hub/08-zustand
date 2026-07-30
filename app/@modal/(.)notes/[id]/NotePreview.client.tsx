"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();

  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (isError || !note) return null;

  const currentTag = note.tag || "";

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button
          type="button"
          onClick={handleClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: "16px",
            textDecoration: "underline",
          }}
        >
          Back
        </button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <div>
            {currentTag && <span className={css.tag}>{currentTag}</span>}
          </div>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {note.createdAt
              ? new Date(note.createdAt).toLocaleString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>
      </div>
    </Modal>
  );
}
