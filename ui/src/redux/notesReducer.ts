import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import {deleteNote, fetchNotes, postNote, updateNote} from './api';
import {Note} from "../structures/NoteProps";

export interface NotesState {
  notes: Note[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotesState = {
  notes: [],
  status: 'idle',
};

export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    return await fetchNotes();
  }
);

export const postNoteAsync = createAsyncThunk(
  'notes/postNote',
  async (text: string) => {
    return await postNote(text);
  }
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote',
  async (args: {id: number, text: string}) => {
    return await updateNote(args.id, args.text);
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNote',
  async (id: number) => {
    await deleteNote(id);
    return id;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // fetched: (state, action) => {
    //   state.notes = action.payload;
    // },
    // posted: (state, action) => {
    //   state.notes.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes = action.payload;
      })
      .addCase(fetchNotesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(postNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const idx = state.notes.findIndex(note => note.id === action.payload.id);
        state.notes[idx] = action.payload;
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        const idx = state.notes.findIndex(note => note.id === action.payload);
        state.notes.splice(idx, 1);
      });
  },
});

// export const { fetched, posted } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
