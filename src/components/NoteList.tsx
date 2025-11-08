import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Note } from '../models/Note';
import { NoteItem } from './NoteItem';

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onEdit }) => {
    if (notes.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notes yet</Text>
                <Text style={styles.emptySubtext}>Add your first note above!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 20,
        color: '#999',
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#bbb',
    },
});
