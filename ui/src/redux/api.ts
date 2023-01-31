import {Note} from "../structures/NoteProps";

const API_URL = "http://localhost:3033";
const HTTP_HEADERS = {
  "Content-Type": "application/json"
};

export async function fetchNotes(): Promise<Note[]> {
  const response: Response = await fetch(`${API_URL}/notes`);
  return await response.json();
}

export async function postNote(text: string): Promise<Note> {
  const response: Response = await fetch(`${API_URL}/note`, {
    method: "POST",
    headers: HTTP_HEADERS,
    body: JSON.stringify({text})
  });
  return await response.json();
}

export async function updateNote(id: number, text: string): Promise<void> {
  await fetch(`${API_URL}/note`, {
    method: "PATCH",
    headers: HTTP_HEADERS,
    body: JSON.stringify({id, text})
  });
}

export async function deleteNote(id: number): Promise<void> {
  await fetch(`${API_URL}/note`, {
    method: "DELETE",
    headers: HTTP_HEADERS,
    body: JSON.stringify({id})
  });
}
