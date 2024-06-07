import { useSelector } from 'react-redux'; // Import the useSelector hook from react-redux
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom
import { selectUserById } from './usersApiSlice'; // Import the selector function to get a user by ID
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const User = ({ userId }) => {
    // Use useSelector to get the user from the Redux store by userId
    const user = useSelector(state => selectUserById(state, userId));

    // Use useNavigate to get a navigation function
    const navigate = useNavigate();

    if (user) { // Check if the user exists
        // Function to handle navigation to the edit user page
        const handleEdit = () => navigate(`/dash/users/${userId}`);

        // Convert user roles array to a string with commas and spaces
        const userRolesString = user.roles.toString().replaceAll(',', ', ');

        // Determine the CSS class for table cell based on user's active status
        const cellStatus = user.active ? '' : 'table__cell--inactive';

        // Return the table row with user details and an edit button
        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );

    } else return null; // Return null if the user does not exist
};

export default User; // Export the User component as the default export
