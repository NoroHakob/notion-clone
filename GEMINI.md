# Project Overview: Notion Clone

This project is a Notion-like application built with Next.js, React, and Convex. It features real-time document editing, user authentication, and file storage. The application aims to provide a collaborative workspace for creating and organizing documents.

## Key Technologies:
- **Framework:** Next.js 16 (React 19)
- **Backend/Database:** Convex (real-time database, serverless functions, authentication integration)
- **Authentication:** Clerk (integrated with Convex)
- **Styling:** Tailwind CSS, Radix UI for unstyled components, Mantine for some UI components.
- **Rich Text Editor:** Blocknote
- **File Storage:** Edgestore
- **State Management:** Zustand
- **Theme Management:** Next-themes

## Architecture:
The project follows a typical Next.js application structure with an `app` directory for routing.
- **`app/(marketing)`:** Contains the landing page and marketing-related components.
- **`app/(main)`:** Houses the core application logic, including document management, navigation, and search. This section is protected by authentication.
- **`app/(admin)`:** (Inferred) This section likely contains administrative functionalities like user management based on the `app/(admin)/admin/users` and `app/(admin)/admin/admins` paths.
- **`app/(public)`:** Contains routes for publicly accessible content, such as document previews.
- **`components`:** Reusable UI components, including modals, providers, and Shadcn UI components (button, dialog, etc.).
- **`convex`:** Contains Convex-related files, including schema definitions, API functions, and authentication configuration.
- **`hooks`:** Custom React hooks for various functionalities (e.g., `use-scroll-top`, `use-modal-store`).
- **`lib`:** Utility functions and configurations (e.g., `edgestore.ts` for file uploads).

## Building and Running:

### Development
To run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build
To build the project for production:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Start
To start the production server after building:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

### Linting
To run the linter:
```bash
npm run lint
```

## Development Conventions:
- **TypeScript:** The project is written entirely in TypeScript, ensuring type safety.
- **Tailwind CSS:** Styling is primarily done using Tailwind CSS.
- **Component-based Architecture:** The UI is composed of reusable React components.
- **Convex for Backend:** Data persistence and serverless functions are handled by Convex.
- **Clerk for Authentication:** User authentication is managed through Clerk.

## Data Model (Convex):
The primary data model is the `documents` table, which includes:
- `title` (string)
- `userId` (string, indexed)
- `isArchived` (boolean)
- `parentDocument` (optional, reference to another document, indexed with `userId`)
- `content` (optional, string)
- `coverImage` (optional, string URL)
- `icon` (optional, string emoji)
- `isPublished` (boolean)

This schema supports hierarchical documents (like Notion pages within pages) and document lifecycle management (archiving, publishing).
