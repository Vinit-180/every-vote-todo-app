# Home Assignment: Todo List Application

## Objective  
Develop a full stack Todo List application using the provided backend code for authentication. The application should allow users to create, read, update, and delete todo items.

## Technologies
- **Backend:** Express.js (authentication code provided)
- **Frontend:** React.js (architecture is flexible)

## Features
- **Task Management**: Add, edit, and delete tasks with ease (CRUD Operations).
- **Real-time Updates**: Experience smooth and seamless task updates.
- **User-friendly Interface**: Intuitive and responsive design for all devices.
- **Persistence**: Tasks are saved and retrieved effortlessly, ensuring no data loss.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS and TailwindCSS
- **Deployment**: Hosted on [Platform Name, e.g., Heroku, Vercel, AWS]


## Installation

To get started with the Every Vote To-Do App, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- MySQl

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Vinit-180/every-vote-todo-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd every-vote-todo-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   
   Create a `.env` file in the root directory. consider the `.env.example` for setting up the variables.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the backend app in your browser at `http://localhost:8000`.

7. Now go to `todo-app` directory:
   ```bash
   cd todo-app
   ```

8. Install dependencies:
   ```bash
   npm install
   ```

9. Start the development server:
   ```bash
   npm run dev
   ```
10. Access the backend app in your browser at `http://localhost:5173`.


## Usage

1. Open the app in your browser.
2. Add tasks by typing in the input field and clicking the **Add Task** button.
3. Delete tasks when they are completed.

```

Directory structure:
└── vinit-180-every-vote-todo-app/
    ├── ReadMe.md
    ├── backend.md
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    ├── src/
    │   ├── env.ts
    │   ├── index.ts
    │   ├── controllers/
    │   │   ├── index.ts
    │   │   └── Auth/
    │   │       ├── index.ts
    │   │       ├── login.controller.ts
    │   │       └── register.controller.ts
    │   ├── db/
    │   │   ├── db.create.ts
    │   │   ├── db.setup.ts
    │   │   └── index.ts
    │   ├── entities/
    │   │   ├── core.entity.ts
    │   │   ├── index.ts
    │   │   └── user.entity.ts
    │   ├── errors/
    │   │   ├── argumentValidation.error.ts
    │   │   ├── custom.error.ts
    │   │   ├── index.ts
    │   │   └── unauthorized.error.ts
    │   ├── middlewares/
    │   │   ├── error.middleware.ts
    │   │   ├── index.ts
    │   │   └── route.middleware.ts
    │   ├── routes/
    │   │   ├── authRouter.ts
    │   │   └── index.ts
    │   ├── services/
    │   │   ├── index.ts
    │   │   └── user.service.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   ├── checkAuth.ts
    │   │   ├── encrypt.ts
    │   │   ├── errorHandler.ts
    │   │   ├── generate.ts
    │   │   ├── index.ts
    │   │   ├── logger.ts
    │   │   ├── password.ts
    │   │   └── validateIp.ts
    │   └── validators/
    │       ├── index.ts
    │       ├── auth/
    │       │   ├── index.ts
    │       │   ├── login.validator.ts
    │       │   └── register.validator.ts
    │       └── title/
    │           ├── createTitle.validator.ts
    │           └── index.ts
    └── todo-app/
        ├── README.md
        ├── components.json
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        ├── vite.config.ts
        ├── .gitignore
        ├── public/
        └── src/
            ├── App.css
            ├── App.tsx
            ├── index.css
            ├── main.tsx
            ├── store.ts
            ├── vite-env.d.ts
            ├── assets/
            ├── components/
            │   ├── Auth.tsx
            │   ├── Navbar.tsx
            │   ├── Theme-Provider.tsx
            │   ├── Toggle.tsx
            │   └── ui/
            │       ├── avatar.tsx
            │       ├── button.tsx
            │       ├── calendar.tsx
            │       ├── card.tsx
            │       ├── dialog.tsx
            │       ├── dropdown-menu.tsx
            │       ├── input.tsx
            │       ├── popover.tsx
            │       ├── table.tsx
            │       ├── tabs.tsx
            │       └── textarea.tsx
            ├── lib/
            │   └── utils.ts
            ├── pages/
            │   └── Home/
            │       └── Home.tsx
            └── redux/
                └── authSlice.ts
```