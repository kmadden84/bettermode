# BetterMode React App

A modern React application built with TypeScript and Vite, focusing on social interactions and post management.

## Video

https://github.com/user-attachments/assets/6d0a4430-5a72-4555-99f1-6b877a82b287

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `yarn install`
3. Create a `.env` file and add the following environment variables:
   - `VITE_AUTH_TOKEN`
     this will tbe the BeterMode Bearer Token
4. Start the development server: `yarn dev`
5. The bearer token is hardcoded from the .env file in `ApolloProvider.tsx`

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Apollo Client for GraphQL
- ESLint for code quality

## 🔑 Key Features

- Post listings, routing to post detail page
- Reaction system (with animations and color changes to reflect the reaction state

## 📚 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## 🧩 Project Structure

src/
├── components/
│ ├── PostList.tsx
│ └── [Other components]
├── graphql/
│ ├── mutations.ts
│ └── queries.ts
├── App.tsx
└── main.tsx
