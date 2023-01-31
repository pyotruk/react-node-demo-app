import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import {fetchNotes, postNote} from './api';
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
      });
  },
});

// export const { fetched, posted } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
