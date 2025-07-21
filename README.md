# VisuaLab Studio Frontend

This is the frontend for VisuaLab Studio, a SaaS web application that allows users to generate and edit professional product ads using AI. This project is built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI, focusing on an intuitive, responsive, and maintainable user experience.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Running the Development Server](#running-the-development-server)
-   [Project Structure](#project-structure)
-   [State Management](#state-management)
-   [API Integration (Mock)](#api-integration-mock)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [Contact](#contact)

## Features

-   **Product Description Input:** Textarea for product descriptions and optional image upload for reference.
-   **AI Prompt Enhancement:** Toggle to simulate AI-driven prompt improvement.
-   **Configurable Sidebar:**
    -   Background Removal with custom color picker.
    -   Shadow Effects with intensity slider and style dropdown.
    -   Lifestyle Shots with contextual prompt input.
    -   CTA Text Overlay with font size and color options.
    -   Advanced Settings: Image resolution, aspect ratio, output format.
-   **Generate Ad Button:** Triggers mock AI image generation with loading and error states.
-   **Image Gallery:** Displays generated images in a responsive grid with zoom, download, and re-edit options.
-   **Dashboard:** Homepage with a welcome message and "Start New Project" button.
-   **Responsive Design:** Optimized for mobile, tablet, and desktop.
-   **Accessibility:** Built with WCAG 2.1 guidelines in mind.

## Tech Stack

-   **Framework:** Next.js (React)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Component Library:** Shadcn UI
-   **State Management:** Zustand
-   **Icons:** Lucide React

## Getting Started

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone [repository-url]
    cd visualab-studio-frontend
    \`\`\`
    *(Note: If you downloaded this project from v0, you can skip this step and proceed with the `npm install` command in your project directory.)*

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    \`\`\`

### Running the Development Server

To run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will start on the dashboard page. Navigate to `/editor` to access the main ad generation interface.

## Project Structure

\`\`\`
visualab-studio-frontend/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts  # Mock API for image generation
│   │   └── edit/
│   │       └── route.ts    # Mock API for image re-editing
│   ├── dashboard/
│   │   └── page.tsx      # Dashboard page
│   ├── editor/
│   │   └── page.tsx      # Main editor page
│   ├── projects/
│   │   └── page.tsx      # Placeholder for projects page
│   ├── settings/
│   │   └── page.tsx      # Placeholder for settings page
│   ├── globals.css       # Global Tailwind CSS styles
│   └── layout.tsx        # Root layout for the application
├── components/
│   ├── ui/               # Shadcn UI components (auto-generated/managed by shadcn CLI)
│   ├── config-sidebar.tsx # Sidebar for image configuration
│   ├── footer.tsx        # Application footer
│   ├── generate-button.tsx # Button to trigger image generation
│   ├── header.tsx        # Application header/navigation
│   ├── image-gallery.tsx # Displays generated images
│   ├── prompt-input.tsx  # Input for product description and reference image
│   └── theme-provider.tsx # Dark mode theme provider
├── hooks/
│   └── use-image-generation.ts # Custom hook for image generation/editing logic
├── lib/
│   └── store.ts          # Zustand store for global state management
├── types/
│   └── app.ts            # TypeScript interfaces and types
├── public/
│   └── placeholder.svg   # Placeholder image for generated content
├── README.md             # Project documentation
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## State Management

The application uses [Zustand](https://zustand-bear.github.io/zustand/) for lightweight and centralized state management. The main store is defined in `lib/store.ts` and manages:

-   `productDescription`: User's text input for the product.
-   `referenceImageFile`: Uploaded image file.
-   `aiPromptEnhancement`: Toggle for AI prompt enhancement.
-   `config`: All image generation/editing configuration options.
-   `generatedImages`: Array of `ImageResult` objects.
-   `isLoading`: Boolean to indicate API call loading state.
-   `error`: String to store any API errors.

Components interact with the store using the `useVisuaLabStore` hook to read and update state.

## API Integration (Mock)

The frontend is designed to interact with a backend proxy that would, in turn, communicate with Bria AI's APIs. For this project, mock Next.js API routes are provided to simulate these interactions:

-   `POST /api/generate`: Simulates the `text-to-image` or `packshot` API call. It accepts `productDescription`, `config` (JSON string), and an optional `referenceImage`. It returns a placeholder image URL and the configuration used.
-   `POST /api/edit`: Simulates `cutout` or other image manipulation APIs. It accepts an `imageId`, `currentSrc`, `newConfig`, and `productDescription`. It returns an updated placeholder image URL.

These mock APIs introduce a small delay to simulate network latency and demonstrate loading states.

## Deployment

This project is optimized for deployment on Vercel. Simply push your code to a Git repository (GitHub, GitLab, Bitbucket) and connect it to a new Vercel project. Vercel will automatically detect the Next.js framework and deploy your application.

## Contributing

Feel free to fork this repository and contribute. Please ensure your code adheres to the existing style and quality guidelines.

## Contact

For support or inquiries, please contact `support@bria.ai`.
