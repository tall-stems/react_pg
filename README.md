# React Playground

A React + TypeScript playground for experimenting with frontend development patterns, libraries, and best practices.

## 📊 Current Status

**Working:** Task management app with CRUD operations, responsive design, Material-React-Table integration, accessibility features (WCAG AA compliant), and form validation with Formik.

**Tech Stack:** React 18, TypeScript, Material UI v5, TanStack Query (React Query), Formik, Material-React-Table, Vite, Vitest

**Recent Changes:** Added table view for tasks, fixed React Hooks violations in `useResponsive`, disabled exhaustive-deps ESLint rule for flexibility.

## � About This Project

This is a personal playground for testing and learning React ecosystem tools. The current implementation is a task manager app that serves as a testbed for:

- Component patterns and architecture
- State management strategies (React Query)
- Form handling and validation
- Responsive design and accessibility
- Testing approaches (Vitest, Testing Library)
- Material UI customization and theming

Feel free to experiment, break things, and try new patterns here!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Lint code
npm run lint

# Build for production
npm run build
```

## 📝 Notes for Future Me

- **API:** Currently using MSW (Mock Service Worker) for fake API responses
- **Routing:** No router yet - using component state for navigation
- **Forms:** Formik handles validation, Material UI for components
- **Tables:** Material-React-Table for data grid functionality
- **Theme:** Custom Material UI theme in `src/theme.ts`
- **Hooks:** Custom hooks in `src/hooks/` (responsive design, query hooks)
- **Tests:** Located in `src/__tests__/`, run with Vitest

## 📄 License

MIT
