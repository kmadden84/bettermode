# BetterMode React App

A modern React application built with TypeScript and Vite, focusing on social interactions and post management.

## Video


https://github.com/user-attachments/assets/d9066e9a-ef88-4a48-9a4c-41cb3bcdb5c8

##Images

![screencapture-localhost-5173-2024-08-07-17_09_04](https://github.com/user-attachments/assets/bef73ad1-1d51-43ff-893d-d39de4b1906a)
![screencapture-localhost-5173-post-SVOYL9Tdz8ZFOqR-2024-08-07-17_09_20](https://github.com/user-attachments/assets/6db5932f-f5bf-4db7-9978-ec08e194d559)
![screencapture-localhost-5173-2024-08-07-17_09_15](https://github.com/user-attachments/assets/c877a434-6d92-4288-82cf-89e46899f475)


## 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `yarn install`
3. Login with test credentials:
  - username: testaccount@test.com
  - password: Test@ccount1234
\n**OR**  
4. Create a `.env` file and add the following environment variables:
   - `VITE_AUTH_TOKEN`
     this will tbe the BeterMode Bearer Token
5. Start the development server: `yarn dev`
6. The bearer token is hardcoded from the .env file in `ApolloProvider.tsx`

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Apollo Client for GraphQL
- Jest for unit tests
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
