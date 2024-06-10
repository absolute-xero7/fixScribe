import { useRef, useState, useEffect } from 'react'; // Importing React hooks
import { useNavigate, Link } from 'react-router-dom'; // Importing navigation and link components from React Router

import { useDispatch } from 'react-redux'; // Importing dispatch hook from Redux
import { setCredentials } from './authSlice'; // Importing setCredentials action from authSlice
import { useLoginMutation } from './authApiSlice'; // Importing custom hook for login mutation

import usePersist from '../../hooks/usePersist'; // Importing custom hook for persisting state

const Login = () => {
  const userRef = useRef(); // Creating a ref for the username input field
  const errRef = useRef(); // Creating a ref for the error message
  const [username, setUsername] = useState(''); // State for storing the username
  const [password, setPassword] = useState(''); // State for storing the password
  const [errMsg, setErrMsg] = useState(''); // State for storing the error message
  const [persist, setPersist] = usePersist(); // Using custom hook for persisting state

  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook for dispatching actions

  const [login, { isLoading }] = useLoginMutation(); // Using custom hook for login mutation

  // Effect hook to focus on the username input field when the component mounts
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Effect hook to clear the error message when username or password changes
  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission
    try {
      const { accessToken } = await login({ username, password }).unwrap(); // Attempting login and getting access token
      dispatch(setCredentials({ accessToken })); // Dispatching setCredentials action with access token
      setUsername(''); // Clearing username state
      setPassword(''); // Clearing password state
      navigate('/dash'); // Navigating to dashboard
    } catch (err) {
      // Handling errors and setting appropriate error messages
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus(); // Focusing on the error message
    }
  };

  // Handler for username input change
  const handleUserInput = (e) => setUsername(e.target.value);

  // Handler for password input change
  const handlePwdInput = (e) => setPassword(e.target.value);

  // Handler for toggling persist state
  const handleToggle = () => setPersist(prev => !prev);

  // Determining error message class
  const errClass = errMsg ? "errmsg" : "offscreen";

  // Returning loading message if the login mutation is in progress
  if (isLoading) return <p>Loading...</p>;

  // JSX content for the component
  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
