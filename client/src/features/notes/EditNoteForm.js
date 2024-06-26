import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, users }) => {
    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation();
    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation();

    // Hook for navigation
    const navigate = useNavigate();

    // State variables for form inputs
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [completed, setCompleted] = useState(note.completed);
    const [userId, setUserId] = useState(note.user);

    // Effect hook to reset form and navigate when note is successfully updated or deleted
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    // Handlers for input changes
    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onCompletedChanged = e => setCompleted(prev => !prev);
    const onUserIdChanged = e => setUserId(e.target.value);

    // Checking if all fields are filled and no loading is in progress
    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    // Handler for form submission to save the note
    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed });
        }
    };

    // Handler for deleting the note
    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id });
    };

    // Formatting the created and updated dates
    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

    // Creating options for the user select dropdown
    const options = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ));

    // Classes for error message and incomplete input validation
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : '';
    const validTextClass = !text ? "form__input--incomplete" : '';

    // Error content to display
    const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

    let deleteButton = null;
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    };

    // JSX content for the form
    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Note #{note.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="note-title">
                    Title:
                </label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className="form__label" htmlFor="note-text">
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>
                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:
                        </label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    );

    return content;
};

export default EditNoteForm;
