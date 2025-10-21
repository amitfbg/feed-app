# feed-App (Frontend-only)

React + TypeScript + Tailwind + React Router. Auth & posts persisted with `localStorage`.
Unauthenticated interactions trigger a sign-in/sign-up modal.

## ✨ Features

- Feed landing page with post editor and list
- Sign In / Sign Up dedicated pages
- Modal auth gate on interactions (for unauthenticated users)
- Publish posts (only text); other actions show "Function not implemented"
- Context + useReducer state management, `localStorage` persistence

## 🚀 Run locally

```bash
npm install
npm run dev
```

## 🧱 Stack

- React + Vite + TypeScript
- TailwindCSS
- React Router
- React Context + localStorage

## 🛠 Notes

- No backend or real auth; email field alone will "log in".
- To reset the app, clear localStorage keys: `fr:user` and `fr:posts`.
