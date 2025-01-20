# Tasker App

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Learning Outcomes](#learning-outcomes)
  - [General](#general)
  - [Backend](#backend)
  - [Frontend](#frontend)

## Description

This is a simple tasker app that allows you to add, delete, and mark tasks as complete. It is built using React (Vite) as the frontend and Node.js (Express) as the backend. The data is stored in a MongoDB database using Prisma as the ORM. The app is styled using Tailwind CSS. This is a monorepo project using Turborepo. Turborepo allows us to manage multiple packages in a single repository.

## Technologies

- React (Vite)
- Node.js (Express)
- MongoDB (Prisma)
- Tailwind CSS
- TypeScript
- Turborepo

## Features

- User
  - Register
  - Login
  - Logout
  - View profile
  - Update profile
  - Delete account
- Teams
  - Create a team
  - Invite a user to a team
  - View all members of a team
- Task
  - Add a task
  - Delete a task
  - Mark a task as complete, in-progress, or not started
  - Assign a task to a user
  - View all tasks
- File Upload
  - Upload a file
  - Delete a file
  - View all files

## Installation

1. Clone the repository using git:

```bash
git clone git@github.com:muhammadarifftaha/tasker-app.git
```

2. Install the dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory and add the variables provided by the repo owner.

4. Start the development server from the root directory using the following command:

```bash
yarn dev
```

## Learning Outcomes

### General

- Learn how to create a full-stack application using React and Node.js
- Learn the best practices for structuring a full-stack application
  - Code-splitting
  - Atomic Design
  - Reusable components/patterns
- Learn git workflows
  - Branching
  - Pull requests
  - Code reviews
- Learn to properly document code
  - JSDoc/TypeDoc
  - Markdown

### Backend

- Setup and Create a RESTful API using Express
- Apply the Repository, Service, and Controller (Action) pattern
  - Create a repository to interact with the database (Prisma)
  - Create a service to handle the business logic consuming the repository methods
  - Create a controller to handle the request and response
- Database
  - Setup MongoDB using Prisma
  - Create models and relations
- Authentication
  - Register a user
  - Login a user
  - Logout a user
  - Protect routes using JWT
- File Upload
  - Upload a file
  - Delete a file

### Frontend

- Setup and Create a React app using Vite
- Apply the Atomic Design pattern
  - Create atoms, molecules, organisms, templates, and pages
    - Atoms: smallest components
    - Molecules: components made up of atoms
    - Organisms: components made up of molecules and atoms
    - Templates: components that define the layout
    - Pages: components that define the routes (screens)
- State Management
  - Use React Context API to manage global state (user, team, task, file)
- Authentication
  - Register a user
  - User Roles (Admin, User)
  - Login a user
  - Logout a user
  - Protect routes using JWT
- Forms
  - Create forms for user registration, login, and profile update
  - Validate forms using Zod
  - Handle file upload and form submission
- Styling
  - Style the app using Tailwind CSS
  - Create reusable components
