import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Todo() {
    const [newTask, setNewTask] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newDeadline, setNewDeadline] = useState('')
    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedDeadline, setEditedDeadline] = useState('')
    const [todoList, setTodoList] = useState([])
    const[editableId, setEditableId] = useState(null)

    useEffect(() => {
        axios.get('localhost:8000/api/task-tracker')
            .then(result => {
                setTodoList(result.data)
            })
            .catch(err => console.error(err))
    }, [])

    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if(rowData) {
            setEditableId(id)
            setEditedTitle(rowData.title)
            setEditedDescription(rowData.description)
            setEditedDeadline(rowData.deadline || "")
        } else {
            setEditableId(null)
            setEditedTitle("")
            setEditedDescription("")
            setEditedDeadline("")
        }
    }

    const addTask = (e) => {
        e.preventDefault()
        if (!newTask || !newDescription || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }

        axios.post('localhost:8000/api/task-tracker', {
            task: newTask,
            description: newDescription,
            deadline: newDeadline
        })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const saveEditedTask = (id) => {
        const editedData = {
            title: editedTitle,
            description: editedDescription,
            deadline: editedDeadline,
        };

        if (!editedTitle || !editedDescription || !editedDeadline) {
            alert("All fields must be filled out")
            return
        }

        axios.put("localhost:8000/api/task-tracker/" + id, editedData)
            .then(result => {
                console.log(result)
                setEditableId(null)
                setEditedTitle("")
                setEditedDescription("")
                setEditedDeadline("")
                window.location.reload()
            })
    }

    const deleteTask = (id) => {
        axios.delete('localhost:8000/api/deleteTask/' + id)
            .then(result => {
                console.log(result)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-7'>
                        <h2 className='text-center'>Todo List</h2>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead className='table-primary'>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                {Array.isArray(todoList) ? (
                                    <tbody>
                                        {todoList.map((data) => (
                                            <tr key={data._id}>
                                                <td>
                                                    {editableId === data._id ? (
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={editedTitle}
                                                            onChange={(e) => setEditedTitle(e.target.value)}
                                                        />
                                                    ) : (
                                                        data.title
                                                    )} 
                                                </td>
                                                <td>
                                                    {editableId === data._id ? (
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            value={editedDescription}
                                                            onChange={(e) => setEditedDescription(e.target.value)}
                                                        />
                                                    ) : (
                                                        data.description
                                                    )} 
                                                </td>
                                                <td>
                                                    {editableId === data._id ? (
                                                        <input
                                                            type='datetime-local'
                                                            className='form-control'
                                                            value={editedDeadline}
                                                            onChange={(e) => setEditedDeadline(e.target.value)}
                                                        />
                                                    ) : (
                                                        data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                                    )} 
                                                </td>
                                                <td>
                                                    {editableId === data._id ? (
                                                        <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}>
                                                            Edit
                                                        </button>
                                                    )}
                                                    <button className='btn btn-danger btn-sm ml-1' onClick={() => deleteTask(data._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colspan="4">Loading products...</td>
                                        </tr>
                                    </tbody>
                                )}

                            </table>
                        </div>
                    </div>
                    <div>
                        <h2>Add Task</h2>
                        <form>
                            <div>
                                <label>Task</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Enter Task'
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Enter Description'
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Deadline</label>
                                <input
                                    className='form-control'
                                    type="datetime-local"
                                    onChange={(e) => setNewDeadline(e.target.value)}
                                />
                            </div>
                            <button onClick={addTask} className='btn btn-success btn-sm'>
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo