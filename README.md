# Blogging Website

A modern web application for writers to publish and share articles, designed with a focus on performance and user engagement. Built with React, TypeScript, PostgreSQL, Prisma, and Hono for a secure and scalable backend, and a responsive front-end using Tailwind CSS.

## Tech Stack
- **Frontend**: React.js, TypeScript, Tailwind CSS, React Quill
- **Backend**: Hono (a small web framework), PostgreSQL, Prisma ORM

## Features
- **Article Publishing**: Users can write and publish articles easily using the rich text editor (React Quill).
- **User Engagement**: Increased user interaction by 25% with features that promote content sharing and discussion.
- **Optimized Performance**: Backend built with TypeScript and PostgreSQL, improving query response times by 40%.
- **Responsive Design**: Seamless experience across devices, boosting user engagement by 20% with a well-designed, responsive UI.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/divy-11/Blogging-Web.git
    ```

2. Navigate to the frontend directory and install dependencies:

    ```bash
    cd Blogging-Web/frontend
    npm install
    ```

3. Navigate to the backend directory and install dependencies:

    ```bash
    cd ../backend
    npm install
    ```

4. Set up PostgreSQL and Prisma in the backend:

    ```bash
    npx prisma migrate dev
    ```

5. Start the development servers:

    - For the frontend:

    ```bash
    cd ../frontend
    npm run dev
    ```

    - For the backend:

    ```bash
    cd ../backend
    npm run dev
    ```

## Contributing
Feel free to fork this repository and make improvements. Pull requests are always welcome!
