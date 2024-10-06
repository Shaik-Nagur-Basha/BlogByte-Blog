# BlogByte Blog

`BlogByte Blog` is a full-stack blogging platform built using the `MERN (MongoDB, Express, React, Node.js) stack`. This platform allows users to create, view, and manage blog posts with user authentication and real-time updates. It utilizes `RESTful APIs ` for backend operations and follows the `MVC (Model-View-Controller)` design pattern for better scalability and organization.

## Demo

Check out the `live demo` of `BlogByte Blog`: [Live Demo](https://blogbyte-blog.onrender.com)

Here are some screenshots of `Admin Pages`: [Click here](https://github.com/Shaik-Nagur-Basha/BlogByte-Blog/edit/main/README.md#screenshots)

## Features

- `Admin Role`: Mange the data of website by `CRUD` Operations on Blog's, comments and users data. He can only create blog's.
- `Google OAuth` / `User Authentication`: Users can sign up, log in, and manage their profiles.
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

4. **Run the server**:
   ```bash
   cd blogbyte-blog
   npm run dev
   ```

5. **Run the frontend**:
   Navigate to the `client` directory and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   
6. **Access the app**:
   Open your browser and go to `http://localhost:5173` to access the app.

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

## Screenshots
Here are some screenshots of the BlogByte Blog `Admin Pages`:

![Dashboard tab p1](https://github.com/user-attachments/assets/982ecb3a-0b28-4fdc-a9c7-1c2787ebbe37)
![Dashboard tab p2](https://github.com/user-attachments/assets/eff6015b-7adf-48bb-a82f-6aac86126d33)
![profile tab](https://github.com/user-attachments/assets/7f196a6c-0c33-48f6-9173-885de7bf6654)
![create post page](https://github.com/user-attachments/assets/6ddca256-3293-467c-aa8e-9579c76be732)
![posts tab](https://github.com/user-attachments/assets/af59da62-de1d-4cda-a039-9c366300cbcf)
![update post page](https://github.com/user-attachments/assets/a1119ed2-f04a-44f7-8ffd-3b43aa389e9c)
![users tab](https://github.com/user-attachments/assets/5c44f32c-3a4a-4abd-8192-d8eef483a80d)
![comments tab](https://github.com/user-attachments/assets/907cb2ad-38af-4024-838d-ea224bd6c813)


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, improvements, or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
