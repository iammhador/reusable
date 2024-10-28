<h1 align="center">User Information Management System</h1> <p align="center">A responsive user management interface with search, filter, pagination, infinite scroll, and CRUD operations.</p>
🚀 Features
Table with User Information: Displays a list of user details, including Full Name, Email, Status, and more.
🔍 Search Data: Instantly search users by Full Name.
🔄 Filter Data: Filter users by Status (Active, Pending, Inactive), with the selected filter highlighted in red.
➕ Add Data: Open a modal to add new user data, collecting fields like Full Name, Email, Status, etc.
✏️ Edit Data: Edit user details using the same modal used for adding.
🗑️ Delete Data: Remove entries from the table without page refresh.
🔢 Pagination & Infinite Scroll: Toggle between pagination and infinite scroll to load additional data.
📋 Sorting Based on Page Size: Sort the table based on a selected number of entries per page.
⏳ Skeleton Loading: Provides visual feedback during data loading.
Modal for Create and Update: A dynamic modal for adding and updating data entries, enhancing usability.
📸 Project Screenshots
User Table with Pagination
<p align="center"> <img src="./screenshots/user-table-pagination.png" alt="User Table with Pagination" width="75%"> </p>
User Table with Infinite Scroll
<p align="center"> <img src="./screenshots/user-table-infinite-scroll.png" alt="User Table with Infinite Scroll" width="75%"> </p>
Add/Edit User Modal
<p align="center"> <img src="./screenshots/user-modal.png" alt="Add/Edit User Modal" width="75%"> </p>
🛠️ Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/user-info-management.git
cd user-info-management
Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
🚀 Usage
Launch the app and visit localhost:3000.
Search, filter, and sort through user data with the provided tools.
Add, edit, and delete user data entries directly from the table.
Switch between pagination and infinite scroll modes to experience different data-loading options.
📂 Project Structure
php
Copy code
src/
├── components/
│   ├── Table.tsx         # Table component with pagination and infinite scroll
│   ├── Modal.tsx         # Modal component for adding and editing users
│   └── SkeletonLoader.tsx # Skeleton loader component for loading states
├── pages/
│   └── index.tsx         # Main page containing the table and search/filter controls
└── public/
    └── users.json        # Sample data for populating the user table
🔧 Key Libraries & Tools
React Icons: For action icons (edit, delete, search).
TailwindCSS: For consistent, responsive styling.
TypeScript: For type safety and improved development experience.
🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request with improvements.
