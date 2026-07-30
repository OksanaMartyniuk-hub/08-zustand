import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteNoteMutation,
    isPending,
    variables,
  } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isCurrentlyDeleting = isPending && variables === note.id;

        return (
          <li key={note.id} className={css.listItem}>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              {note.tag && <span className={css.tag}>{note.tag}</span>}

              <div style={{ display: "flex", gap: "8px" }}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button
                  className={css.button}
                  disabled={isCurrentlyDeleting}
                  onClick={() => deleteNoteMutation(note.id)}
                >
                  {isCurrentlyDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
