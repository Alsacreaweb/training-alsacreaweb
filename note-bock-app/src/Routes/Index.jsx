import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Reorder } from "framer-motion";

export default function Index() {

    // Charger directement depuis localStorage lors de l'initialisation
    const [notes, setNotes] = useState(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        return storedNotes;
    });

    // Sauvegarder les notes dans le localStorage après chaque mise à jour des notes
    const updateNotes = (newNotes) => {
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes));
    };

    const handleAddNote = () => {
        Swal.fire({
            title: 'Quelle est votre note ?',
            html: '<input name="title" id="title" class="swal2-input" placeholder="Titre de votre note ?">',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Créer',
            preConfirm: () => {
                const title = (document.getElementById('title').value);
                if (!title) {
                    Swal.showValidationMessage('Le titre est requis');
                }
                return { title };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
                const newNotes = [...notes, { 'id': newId, 'title': result.value.title, 'content': '' }];
                updateNotes(newNotes);
            }
        });
    };

    const handleDeleteNote = (id) => {
        const newNotes = notes.filter(note => note.id !== id);
        updateNotes(newNotes);
    };

    const confirmDeleteNote = (note) => {
        Swal.fire({
            title: 'Veuillez confirmer?',
            text: `Etes vous sûr de vouloir supprimer la note ${note.title} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Non, annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteNote(note.id);
            }
        });
    };

    const handleReorder = (newOrder) => {
        updateNotes(newOrder);  // Mettre à jour l'ordre des notes
    };

    return (
        <div className="bg-slate-100 h-screen w-screen flex flex-col items-center p-2">
            <div className="bg-slate-200 py-8 px-4 rounded-lg shadow-lg lg:min-w-[500px] md:min-w-screen flex flex-col gap-8">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-700">Vos notes</h1>
                    <button className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg" onClick={handleAddNote}>Ajouter une note</button>
                </div>
                <Reorder.Group axis="y" values={notes} onReorder={handleReorder} className="space-y-4">
                    {notes.map((note) => (
                        <Reorder.Item
                            key={note.id}
                            value={note}
                            id={note.id}
                            drag="y"
                            className="flex justify-between items-center p-2 bg-slate-100 rounded-xl"
                        >
                            <p>{note.title}</p>
                            <div className="flex gap-2">
                                <Link className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg" to={`edit/${note.id}`}>Modifier</Link>
                                <button className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg" onClick={() => confirmDeleteNote(note)}>Supprimer</button>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
}
