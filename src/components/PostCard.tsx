import { Heart, Message, Send } from "tabler-icons-react";
import { Post } from "../types";

export default function PostCard({
  post,
  onRequireAuth,
  highlight,
  style,
}: {
  post: Post;
  onRequireAuth: (isTextArea?: boolean) => void;
  highlight?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`max-w-2xl w-full p-2 bg-gray-200 rounded-2xl ${
        highlight ? "new-post" : ""
      }`}
      style={style}
    >
      {/* Post content */}
      <div className="card p-4 mb-2 rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
            {post.author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full">
            🙂
          </div>
          <p className="text-gray-700 w-full text-sm">{post.text}</p>
        </div>
      </div>
      {/* Post actions */}
      <div className="flex items-center gap-4 text-gray-500 pl-2">
        <button onClick={() => onRequireAuth()}>
          <Heart />
        </button>
        <button onClick={() => onRequireAuth()}>
          <Message />
        </button>
        <button onClick={() => onRequireAuth()}>
          <Send />
        </button>
      </div>
    </div>
  );
}
