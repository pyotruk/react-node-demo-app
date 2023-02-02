import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import NotesApi from './api';
import {Note} from "../structures/NoteProps";

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    return await NotesApi.fetch();
  }
);

export const postNote = createAsyncThunk(
  'notes/postNote',
  async (text: string) => {
    return await NotesApi.post(text);
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (args: {id: number, text: string}) => {
    return await NotesApi.update(args.id, args.text);
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: number) => {
    await NotesApi.delete(id);
    return id;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(postNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const idx = state.notes.findIndex(note => note.id === action.payload.id);
        state.notes[idx] = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note: Note) => note.id !== action.payload);
      });
  },
});

export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
