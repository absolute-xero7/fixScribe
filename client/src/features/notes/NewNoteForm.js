import { useState, useEffect } from "react"; // Importing React hooks
import { useNavigate } from "react-router-dom"; // Importing navigation hook from React Router
import { useAddNewNoteMutation } from "./notesApiSlice"; // Importing custom hook for adding a new note
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesome component
import { faSave } from "@fortawesome/free-solid-svg-icons"; // Importing save icon from FontAwesome

const NewNoteForm = ({ users }) => {
    // Destructuring the result of the custom hook into specific variables
    const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();

    // Hook for navigation
    const navigate = useNavigate();

    // State variables for form inputs
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id); // Defaulting to the first user's ID
    const [errMsg, setErrMsg] = useState(''); // State for error messages

    // Effect hook to reset form and navigate when note is successfully added
    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, navigate]);

    // Effect hook to clear error message when inputs change
    useEffect(() => {
        setErrMsg('');
    }, [title, text, userId]);

    // Handlers for input changes
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onTextChanged = (e) => setText(e.target.value);
    const onUserIdChanged = (e) => setUserId(e.target.value);

    // Checking if all fields are filled and no loading is in progress
    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    // Handler for form submission
    const onSaveNoteClicked = async (e) => {
        e.preventDefault();
        try {
            if (canSave) {
                await addNewNote({ user: userId, title, text }).unwrap();
            }
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Title or Text');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message || 'Failed to save the note');
            }
        }
    };

    // Creating options for the user select dropdown
    const options = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ));

    // Classes for error message and incomplete input validation
    const errClass = errMsg ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : '';
    const validTextClass = !text ? "form__input--incomplete" : '';

    // JSX content for the form
    const content = (
        <>
            <p className={errClass} aria-live="assertive">{errMsg}</p>
            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className="form__label" htmlFor="text">
                    Text:
                </label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <label className="form__label" htmlFor="username">
                    ASSIGNED TO:
                </label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </form>
        </>
    );

    return content;
};

export default NewNoteForm;
