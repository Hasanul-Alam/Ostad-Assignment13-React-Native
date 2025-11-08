import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../models/Note";

const STORAGE_KEY = "@todo_notes";

export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error saving notes:", error);
  }
};

export const loadNotesFromStorage = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      const notes = JSON.parse(jsonValue);
      return notes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
      }));
    }
    return [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
