import React, { useState, useEffect, ChangeEvent } from 'react';

interface Task {
    text: string;
    completed: boolean;
}

// Composant principal de la to-do list
const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    // Charger les tâches depuis le localStorage au chargement du composant
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Sauvegarder les tâches dans le localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Gérer l'ajout d'une nouvelle tâche
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    // Gérer la suppression d'une tâche
    const handleDeleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    // Gérer la complétion d'une tâche
    const handleToggleTask = (index: number) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                    placeholder="Nouvelle tâche"
                    className="flex-grow p-2 border border-gray-300 rounded"
                />
                <button onClick={handleAddTask} className="ml-2 p-2 bg-blue-500 text-white rounded">Ajouter</button>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b border-gray-200">
                        <span
                            onClick={() => handleToggleTask(index)}
                            className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {task.text}
                        </span>
                        <button
                            onClick={() => handleDeleteTask(index)}
                            className="ml-2 p-1 bg-red-500 text-white rounded"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
