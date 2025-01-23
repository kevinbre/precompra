# Boilerplate Vite + React + Tailwind

This boilerplate is based on [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) with [Tailwind CSS](https://tailwindcss.com/).

## Extensions recommended:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

## Project setup

1- Clone the repository

2- Install dependencies

```
npm install
```

3- Run the project

```
npm run dev
```

## Project architecture

```
├── public 
│   └── favicon.svg
├── src
│   ├── assets
│   │   ├── fontawesome
│   │   |   ├── css
│   │   |   └── webfonts
│   │   └── images
│   ├── components
│   │   ├── layout
│   │   └── ui
│   ├── controllers
│   ├── hooks
│   ├── services
│   |   ├── axios-service.ts
│   |   ├── config.ts
│   │   ├── fetch-service.ts
|   |   ├── headers-service.ts
|   |   └── http-client.ts
│   ├── types
│   │   └── services
|   |       └── types.ts
│   ├── views
│   ├── App.tsx
│   ├── index.jsx
│   └── main.tsx
├── .eslintrc.js
├── .gitignore
├── .env
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## Project configuration

### Environment variables

Create a `.env` file in the root of the project.

### Watch mode

Make sure don't have `errors` on the `wath mode` after push your code to the repository.

### ESLint

Make sure don't have `errors` on the `eslint` after push your code to the repository.

## Absolute imports

You can import your `components`, `hooks`, `services`, `types`, `views`, etc. with absolute paths.

```
import { Button } from '@/components/ui/button';
```








