import { Outlet, Link } from "react-router-dom"; // Importing Outlet and Link components from React Router
import { useEffect, useRef, useState } from 'react'; // Importing React hooks
import { useRefreshMutation } from "./authApiSlice"; // Importing custom hook for refresh mutation
import usePersist from "../../hooks/usePersist"; // Importing custom hook for persisting state
import { useSelector } from 'react-redux'; // Importing selector hook from Redux
import { selectCurrentToken } from "./authSlice"; // Importing selector for current token from authSlice

const PersistLogin = () => {
    const [persist] = usePersist(); // Using custom hook for persisting state
    const token = useSelector(selectCurrentToken); // Getting current token from Redux store
    const effectRan = useRef(false); // Creating a ref to track if the effect has run

    const [trueSuccess, setTrueSuccess] = useState(false); // State to track successful token refresh

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation(); // Using custom hook for refresh mutation

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh(); // Refreshing the token
                    setTrueSuccess(true); // Setting success state
                } catch (err) {
                    console.error(err); // Logging error
                }
            };

            if (!token && persist) verifyRefreshToken(); // If no token and persist is true, verify refresh token
        }

        return () => effectRan.current = true; // Setting effectRan to true when component unmounts

        // eslint-disable-next-line
    }, []); // Empty dependency array to run effect only once

    let content;
    if (!persist) { // persist: no
        console.log('no persist');
        content = <Outlet />;
    } else if (isLoading) { // persist: yes, token: no
        console.log('loading');
        content = <p>Loading...</p>;
    } else if (isError) { // persist: yes, token: no
        console.log('error');
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        );
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log('success');
        content = <Outlet />;
    } else if (token && isUninitialized) { // persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />;
    }

    return content; // Returning the appropriate content
};

export default PersistLogin;
