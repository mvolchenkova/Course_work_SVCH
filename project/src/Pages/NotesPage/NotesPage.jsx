import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteNoteThunk, fetchNotesThunk, updateNoteThunk } from "../../slices/userSlice";
import '../NotesPage/NotesPage.css';

export default function NotesPage() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.users.notes);
  const userId = localStorage.getItem('userId');
  
  // Для хранения редактируемого состояния заметок
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    dispatch(fetchNotesThunk(userId));
  }, [dispatch, userId]);

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingText(note.text);
  };

  const saveEdit = (noteId) => {
    if (editingText.trim()) {
      dispatch(updateNoteThunk({ noteId, text: editingText }));
    }
    setEditingNoteId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditingText('');
  };

  return (
    <div className="notes-page">
      <h2>All Notes</h2>

      {notes.map(note => (
        <div key={note.id} className="note-card">
          {editingNoteId === note.id ? (
            <>
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <div className="note-buttons">
                <button className="save-btn" onClick={() => saveEdit(note.id)}>Save</button>
                <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p>{note.text}</p>
              <div className="note-buttons">
                <button className="edit-btn" onClick={() => startEditing(note)}>Edit</button>
                <button className="delete-btn" onClick={() => dispatch(deleteNoteThunk(note.id))}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}