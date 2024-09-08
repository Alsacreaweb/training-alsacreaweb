import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Edit() {
    const { id } = useParams();
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
    const [note, setNote] = useState(notes.find(note => note.id === parseInt(id)) || {});

    const handleTitleChange = (e) => {
        setNote(prevNote => ({ ...prevNote, title: e.target.value }));
    };

    const handleContentChange = (content) => {
        setNote(prevNote => ({ ...prevNote, content }));
    };

    const handleSave = () => {
        const newNotes = notes.map(n => n.id === note.id ? note : n);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes));
    };

    if (!note.id) {
        return (
            <div className="bg-slate-100 h-screen w-screen flex flex-col items-center p-2">
                <div className="bg-slate-200 py-8 px-4 rounded-lg shadow-lg lg:min-w-[500px] md:min-w-screen flex flex-col gap-8">
                    <h1 className="text-2xl font-bold">404 - Note non trouvée</h1>
                    <p>La note que vous cherchez n'existe pas.</p>
                    <Link to="/" className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg w-max">Retour à l'accueil</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 h-screen w-screen flex flex-col items-center p-2">
            <div className="bg-slate-200 py-8 px-4 rounded-lg shadow-lg lg:min-w-[500px] md:min-w-screen flex flex-col gap-8">
                <input
                    type="text"
                    className="text-slate-700"
                    placeholder="Titre de la note"
                    value={note.title}
                    onChange={handleTitleChange}
                />
                <textarea
                    id="content"
                    className="text-slate-700 h-96"
                    placeholder="Contenu de la note"
                    value={note.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                />
                <div className="flex justify-between">
                    <button
                        className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg w-max"
                        onClick={handleSave}
                    >
                        Enregistrer
                    </button>
                    <Link to="/" className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg w-max">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}