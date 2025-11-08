import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Note } from '../models/Note';
import { formatDate } from '../utils/helpers';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(note.text);

    const handleDelete = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => onDelete(note.id),
                },
            ]
        );
    };

    const handleSaveEdit = () => {
        const trimmed = editText.trim();
        if (!trimmed) {
            Alert.alert('Error', 'Note cannot be empty');
            return;
        }
        onEdit(note.id, trimmed);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditText(note.text);
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.editInput}
                        value={editText}
                        onChangeText={setEditText}
                        multiline
                        autoFocus
                    />
                    <View style={styles.editButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleCancelEdit}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSaveEdit}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.text}>{note.text}</Text>
                    <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.button, styles.editActionButton]}
                            onPress={() => setIsEditing(true)}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        lineHeight: 22,
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    editActionButton: {
        backgroundColor: '#f0f0f0',
    },
    editButtonText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    editInput: {
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    editButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});