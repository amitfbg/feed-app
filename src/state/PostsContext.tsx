import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { Post } from "../types";
import { POSTS_STORAGE_KEY, PREDEFINED_POSTS } from "../constants";

type PostsContextValue = {
  posts: Post[];
  addNewPost: (text: string, author: string) => string;
};

const PostsContext = createContext<PostsContextValue>({
  posts: [],
  addNewPost: () => "",
});

function loadPosts(): Post[] {
  const raw = localStorage.getItem(POSTS_STORAGE_KEY);
  if (!raw) return PREDEFINED_POSTS;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Post[]) : PREDEFINED_POSTS;
  } catch {
    return PREDEFINED_POSTS;
  }
}

export const PostsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>(loadPosts);

  useEffect(() => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addNewPost = useCallback(
    (text: string, author: string): string => {
      const trimmedText = text.trim();
      if (!trimmedText) return "";

      const id = crypto.randomUUID();
      const newPost: Post = {
        id,
        author,
        text: trimmedText,
        createdAt: Date.now(),
      };
      setPosts((prev) => [newPost, ...prev]);
      return id;
    },
    [posts]
  );

  const value = {
    posts,
    addNewPost,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
