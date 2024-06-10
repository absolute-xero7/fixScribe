# fixScribe
This full-stack web application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The app is designed to replace the current sticky note system used by a tech repair shop. It allows employees, managers, and admins to manage tech repair notes efficiently.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Heroku
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS
- **Testing**: Jest, React Testing Library
- **Version Control**: Git, GitHub
- **Other Tools**: Postman (API testing), VS Code (IDE)

  ## Features

- **Public Facing Page**: Displays basic contact information for the tech repair shop.
- **Employee Login**: Allows employees to log in to the notes app.
- **Welcome Page**: Provides a welcome page after login for easy navigation.
- **User Management**: Supports multiple user roles (Employees, Managers, Admins) with role-based access control.
- **Note Management**: Allows users to create, view, edit, and delete notes. Notes are assigned to specific users and have a ticket number, title, note body, created & updated dates, and status (OPEN or COMPLETED).
- **Security**: Requires users to log in at least once per week and provides a way to remove user access quickly if needed.
- **Mobile Compatibility**: Available in desktop mode but also designed to be accessible on mobile devices.
