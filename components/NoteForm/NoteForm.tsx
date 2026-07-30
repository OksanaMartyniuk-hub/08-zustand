"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Отримуємо стан та екшени із Zustand стору
  const { draft, setDraft, clearDraft } = useNoteStore();
  const isHydrated = useNoteStore.persist?.hasHydrated();

  // Mutation для створення нотатки через TanStack Query
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: (error: Error) => {
      console.error("Помилка створення нотатки:", error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!draft.title || draft.title.length < 3) {
      alert("Назва має містити мінімум 3 символи");
      return;
    }

    createMutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  if (!isHydrated) {
    return <div>Loading form data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()} // Повертає на попередній маршрут без очищення чернетки
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
