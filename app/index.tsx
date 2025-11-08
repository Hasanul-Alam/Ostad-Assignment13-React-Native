import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NoteInput, NoteList } from '../src/components';
import type { AppDispatch } from '../src/store';
import {
  addNote,
  clearAllNotes,
  deleteNote,
  editNote,
  loadNotes,
  selectAllNotes,
  selectLoading,
  selectNotesCount,
} from '../src/store/todoSlice';

export default function TodoScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);
  const notesCount = useSelector(selectNotesCount);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  const handleAddNote = (text: string) => {
    dispatch(addNote({ text }));
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleEditNote = (id: string, text: string) => {
    dispatch(editNote({ id, text }));
  };

  const handleClearAll = () => {
    if (notes.length === 0) return;
    Alert.alert(
      'Clear All Notes',
      'Are you sure you want to delete all notes? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearAllNotes()),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading notes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {notesCount === 0
              ? 'No notes'
              : `${notesCount} ${notesCount === 1 ? 'Note' : 'Notes'}`}
          </Text>
          {notesCount > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <NoteInput onAdd={handleAddNote} />

        <NoteList
          notes={notes}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    fontSize: 14,
    color: '#ff3b30',
    fontWeight: '600',
  },
});