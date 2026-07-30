import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || ""}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (
  page: number,
  perPage: number = 12,
  search: string = "",
  tag: string = "",
): Promise<FetchNotesResponse> => {
  const queryParams: FetchNotesParams = { page, perPage };

  if (search) queryParams.search = search;
  if (tag) queryParams.tag = tag;

  const response: AxiosResponse<FetchNotesResponse> = await instance.get(
    "/notes",
    {
      params: queryParams,
    },
  );
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.get(`/notes/${id}`);
  return response.data;
};
