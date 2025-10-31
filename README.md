# Kanban Task Management Board

A modern, interactive Kanban board application built with React, TypeScript, and Material-UI. This application allows you to manage tasks across multiple workflow stages with an intuitive drag-and-drop interface.

## Features

The application provides a comprehensive task management experience with the following capabilities:

- Kanban board with four workflow columns: Backlog, In Progress, Review, and Done
- Drag-and-drop functionality to move tasks between columns with smooth animations
- Full task lifecycle management: create, edit, and delete tasks through modal interfaces
- Search functionality to filter tasks by title or description
- Modern, responsive user interface built with Material-UI and Tailwind CSS
- Efficient state management using Zustand for client-side updates
- Data fetching and caching powered by React Query
- Mock REST API using json-server for development and testing

## Tech Stack

This project is built with the following technologies:

- React 19 for building the user interface
- TypeScript for type safety and better developer experience
- Vite as the build tool and development server
- Material-UI (MUI) for React components and styling
- Tailwind CSS for utility-first styling
- Zustand for lightweight state management
- React Query (TanStack Query) for data fetching, caching, and synchronization
- json-server for creating a mock REST API

## Prerequisites

Before installing and running the application, ensure you have the following installed on your system:

- Node.js version 18 or higher
- npm (comes bundled with Node.js)

## Installation

Follow these steps to set up the project:

1. Navigate to the project directory:

   ```bash
   cd /home/omar/projects/mindluster-task
   ```

2. Install all project dependencies:

   ```bash
   npm install
   ```

3. Install json-server globally (if not already installed):
   ```bash
   npm install -g json-server
   ```

## Running the Application

The application requires two processes to run simultaneously: the mock API server and the development server. You will need to run these commands in separate terminal windows.

### Starting the Mock API Server

In the first terminal, start the json-server to provide the REST API:

```bash
npm run server
```

This command starts json-server on `http://localhost:3001` and watches the `db.json` file for changes.

### Starting the Development Server

In a second terminal, start the Vite development server:

```bash
npm run dev
```

The development server will start and display the local URL (typically `http://localhost:5173`). Open this URL in your browser to view the application.

## Project Structure

The project follows a modular structure with clear separation of concerns:

```
src/
├── components/          # React component files
│   ├── KanbanBoard.tsx      # Main board container component
│   ├── KanbanColumns.tsx    # Container for all Kanban columns
│   ├── KanbanColumn.tsx     # Individual column component
│   ├── Task.tsx             # Task card component with drag functionality
│   ├── TaskToolbar.tsx      # Toolbar with search and add task button
│   ├── TaskModal.tsx        # Modal dialog for creating and editing tasks
│   ├── DeleteTaskModal.tsx  # Confirmation modal for task deletion
│   └── PrimaryButton.tsx    # Reusable primary action button component
├── store/               # State management
│   └── taskStore.ts         # Zustand store for task state management
├── types/               # TypeScript type definitions
│   └── task.ts              # Task interface and type definitions
├── utils/               # Utility functions
│   ├── apiUtils.ts          # API fetching utilities
│   ├── dragDropUtils.ts     # Drag and drop event handlers
│   └── taskUtils.ts         # Task manipulation helper functions
├── App.tsx              # Root application component
└── main.tsx             # Application entry point with React Query setup
```

## Available Scripts

The following npm scripts are available:

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run server` - Start json-server API on port 3001

## Usage Guide

### Creating a New Task

To add a new task to the board:

1. Click the "Add Task" button located in the top toolbar
2. Enter a task title in the modal dialog (required field)
3. Optionally add a description for the task
4. Click "Add Task" to save

New tasks are automatically placed in the Backlog column.

### Editing an Existing Task

To modify a task:

1. Click the edit icon (pencil) in the bottom-right corner of any task card
2. Update the title or description in the modal dialog
3. Click "Save Changes" to apply the updates

### Deleting a Task

To remove a task from the board:

1. Click the delete icon (trash) in the bottom-right corner of any task card
2. Confirm the deletion in the confirmation modal
3. The task will be permanently removed from the board

### Moving Tasks Between Columns

To reorganize tasks:

1. Click and hold on any task card
2. Drag it to a different column
3. Release to drop the task in the new column

The task will automatically update to reflect its new column assignment.

### Searching for Tasks

Use the search bar in the toolbar to filter tasks. The search functionality matches task titles and descriptions in real-time as you type.

## Data Structure

Tasks are stored in the `db.json` file with the following JSON structure:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "column": "backlog"
    }
  ]
}
```

The `column` field accepts one of four values:

- `"backlog"` - Initial task state
- `"inprogress"` - Task currently being worked on
- `"review"` - Task awaiting review
- `"done"` - Completed task

## Development Notes

This application implements several modern React patterns and best practices:

- State management is handled by Zustand for client-side mutations, while React Query manages server data synchronization
- Drag and drop functionality uses the native HTML5 Drag and Drop API
- UI components are built with Material-UI for consistency and accessibility
- Utility functions are separated from components to improve testability and maintainability
- Type safety is enforced throughout with TypeScript

## Building for Production

To create a production build of the application:

```bash
npm run build
```

The optimized build output will be generated in the `dist/` directory and can be deployed to any static hosting service.

## License

This project is private and proprietary.
