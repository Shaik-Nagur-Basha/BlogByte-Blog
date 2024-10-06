# BlogByte Blog

`BlogByte Blog` is a full-stack blogging platform built using the `MERN (MongoDB, Express, React, Node.js) stack`. This platform allows users to create, view, and manage blog posts with user authentication and real-time updates. It utilizes `RESTful APIs ` for backend operations and follows the `MVC (Model-View-Controller)` design pattern for better scalability and organization.

## Demo

Check out the `live demo` of `BlogByte Blog`:

[Live Demo](https://blogbyte-blog.onrender.com)

## Features

- `Admin Role`: Mange the data of website by `CRUD` Operations on Blog's, comments and users data. He can only create blog's.
- `User Authentication`: Users can sign up, log in, and manage their profiles.
- `Create, Read, Update, Delete (CRUD)`: Full functionality to write, edit, and delete blog posts.
- `RESTful API`: All blog and user operations are handled through RESTful API endpoints.
- `Comments and Likes`: Users can engage with blogs by adding comments and liking posts.
- `Responsive Design`: The UI is fully responsive, providing a seamless experience across devices.
- `MVC Architecture`: Ensures a clean separation of concerns between data, business logic, and user interface.
- `Search and Filter`: Users can search and filter blogs by keywords or categories.
- `Rich Text Editor`: Provides a rich text editor for writing blog posts.

## Tech Stack

### Backend:
- `Node.js`: Server-side JavaScript runtime.
- `Express.js`: Web framework for building RESTful APIs.
- `MongoDB`: NoSQL database for storing blogs, users, and comments.
- `Mongoose`: ODM (Object Data Modeling) library for MongoDB.
- `JWT (JSON Web Tokens)`: For secure user authentication.

### Frontend:
- `React.js`: JavaScript library for building user interfaces.
- `Redux`: State management for consistent data flow in the app.
- `Tailwind CSS`: For responsive and modern design.

### API:
- `RESTful APIs`: Handling CRUD operations for blogs, users, comments, and likes.

## Installation

### Prerequisites:
- Node.js and npm installed.
- MongoDB set up.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/blogbyte-blog.git
   ```

2. **Install server dependencies**:
   ```bash
   cd blogbyte-blog
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `root directory` and add the following:
   ```env
   MONGODB_URI=<mongodb+srv://<username>:<password>@cluster0.sat8w.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=Cluster0> from "https://www.mongodb.com/products/platform/atlas-database" from "https://www.mongodb.com/products/platform/atlas-database"
   JWT_SECRET=<Random String>
   ```
   Create a `.env` file in the `client directory` and add the following:
   ```env
   VITE_FIREBASE_API_KEY=<firebase-API-KEY> from "https://console.firebase.google.com"
   ```

6. **Run the server**:
   ```bash
   cd blogbyte-blog
   npm run dev
   ```

7. **Run the frontend**:
   Navigate to the `client` directory and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```

8. **Access the app**:
   Open your browser and go to `http://localhost:5173` to access the app.


## Screenshots

Here are some screenshots of the BlogByte Blog `Admin Pages`:

## Folder Structure

```
blogbyte-blog/
│
├── client/                         # Frontend code (React)
├── api/                            # Backend code (NodeJS, ExpressJS, MongoDB & JWT.
├── api/controllers/                # API controllers
├── api/models/                     # Database models
├── api/routes/                     # API routes
├── api/utils/                      # Utility functions
└── api/index.js                    # Main server file
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, improvements, or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
