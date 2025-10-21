export type User = { email: string } | null;
export type Credentials = { email: string; password: string };

// --- posts -----------------------------------------------------------------
export type Post = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
};
