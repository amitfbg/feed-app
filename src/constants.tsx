import { Credentials, Post } from "./types";

export const STORAGE_KEY = "USER_LOGIN";
export const encodePassword = (password: string) => {
  return btoa(password);
};
export const PREDEFINED_USERS: Credentials[] = [
  { email: "demo@example.com", password: encodePassword("password123") },
  { email: "test@user.com", password: encodePassword("testpass") },
];
export const USERS_STORAGE_KEY = "USER_REGISTRY";

// --- posts -----------------------------------------------------------------

export const POSTS_STORAGE_KEY = "POSTS";

export const PREDEFINED_POSTS: Post[] = [
  {
    id: crypto.randomUUID(),
    author: "Theresa Webb",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    createdAt: Date.now() - 600_000,
  },
  {
    id: crypto.randomUUID(),
    author: "John Doe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    createdAt: Date.now() - 300_000,
  },
  {
    id: crypto.randomUUID(),
    author: "Jane Doe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    createdAt: Date.now() - 100_000,
  },
];
