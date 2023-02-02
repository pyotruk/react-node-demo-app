import {Note} from "../structures/NoteProps";

const API_URL = "http://localhost:3033";
const HTTP_HEADERS = {
  "Content-Type": "application/json"
};

const NotesApi = {
  fetch: async (): Promise<Note[]> => {
    const response: Response = await fetch(`${API_URL}/notes`);
    return await response.json();
  },

  post: async (text: string): Promise<Note> => {
    const response: Response = await fetch(`${API_URL}/note`, {
      method: "POST",
      headers: HTTP_HEADERS,
      body: JSON.stringify({text})
    });
    return await response.json();
  },

  update: async (id: number, text: string): Promise<Note> => {
    const response: Response = await fetch(`${API_URL}/note`, {
      method: "PATCH",
      headers: HTTP_HEADERS,
      body: JSON.stringify({id, text})
    });
    return await response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/note`, {
      method: "DELETE",
      headers: HTTP_HEADERS,
      body: JSON.stringify({id})
    });
  }
}

export default NotesApi;
