import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import NotesApi from './api';
import {Note, NoteId} from "../structures/NoteProps";

export interface NotesState {
  notes: Note[];
  isFetching: boolean;
  isPosting: boolean;
  isUpdating: false | NoteId;
  isDeleting: false | NoteId;
}

const initialState: NotesState = {
  notes: [],
  isFetching: true,
  isPosting: false,
  isUpdating: false,
  isDeleting: false,
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
        state.isFetching = false;
      })
      .addCase(postNote.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.isPosting = false;
      })
      .addCase(updateNote.pending, (state, action) => {
        state.isUpdating = action.meta.arg.id;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const idx = state.notes.findIndex(note => note.id === action.payload.id);
        state.notes[idx] = action.payload;
        state.isUpdating = false;
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.isDeleting = action.meta.arg;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note: Note) => note.id !== action.payload);
        state.isDeleting = false;
      });
  },
});

export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
