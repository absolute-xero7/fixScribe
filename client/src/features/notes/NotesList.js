import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth()

  // Fetch notes data using the custom hook
  const {
    data: notes, // Destructure notes data
    isLoading, // Loading state
    isSuccess, // Success state
    isError, // Error state
    error // Error object
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content // Variable to store the content to be rendered

  // Display loading message if data is being fetched
  if (isLoading) content = <p>Loading...</p>

  // Display error message if there is an error fetching the data
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  // If data fetching is successful, render the table
  if (isSuccess) {
    const { ids, entities } = notes // Destructure ids from notes data

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    // Map note IDs to Note components
    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

    // Render the table with note data
    content = (
      <div className="table-container">
        <table className="table table--notes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th note__status">Status</th>
              <th scope="col" className="table__th note__created">Created</th>
              <th scope="col" className="table__th note__updated">Updated</th>
              <th scope="col" className="table__th note__title">Title</th>
              <th scope="col" className="table__th note__username">Owner</th>
              <th scope="col" className="table__th note__edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }
  return content // Return the content to be rendered
}

export default NotesList
