import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../models/Note";
import { loadNotesFromStorage, saveNotes } from "../services/storageService";

interface TodoState {
  notes: Note[];
  loading: boolean;
}

const initialState: TodoState = {
  notes: [],
  loading: false,
};

export const loadNotes = createAsyncThunk("todos/loadNotes", async () => {
  const notes = await loadNotesFromStorage();
  return notes;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ text: string }>) => {
      const newNote: Note = {
        id: Date.now().toString(),
        text: action.payload.text,
        createdAt: new Date(),
      };
      state.notes.push(newNote);
      saveNotes(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveNotes(state.notes);
    },
    editNote: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.text = action.payload.text;
        saveNotes(state.notes);
      }
    },
    clearAllNotes: (state) => {
      state.notes = [];
      saveNotes([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(loadNotes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addNote, deleteNote, editNote, clearAllNotes } =
  todoSlice.actions;

export const selectAllNotes = (state: { todos: TodoState }) =>
  state.todos.notes;
export const selectNotesCount = (state: { todos: TodoState }) =>
  state.todos.notes.length;
export const selectLoading = (state: { todos: TodoState }) =>
  state.todos.loading;

export default todoSlice.reducer;
