import React, { useState } from "react";
import { useAuth } from "../state/AuthContext";
import {
  ArrowDown,
  Bold,
  Checklist,
  Code,
  Italic,
  List,
  ListNumbers,
  Microphone,
  Plus,
  Quote,
  Send,
  Trash,
  Underline,
  Video,
} from "tabler-icons-react";

export default function PostEditor({
  onPublish,
  onRequireAuth,
}: {
  onPublish: (text: string) => void;
  onRequireAuth: (isTextArea?: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const { isAuthenticated } = useAuth();

  const handleSubmit = () => {
    onRequireAuth(true);
    if (!value.trim()) return;
    onPublish(value.trim());
    setValue("");
  };

  return (
    <div className="max-w-2xl w-full p-2 bg-gray-200 rounded-2xl feed-card">
      <div className="card rounded-2xl pt-4">
        {/* editor formatter*/}
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-xl p-1 pr-3">
            <div
              className="flex items-center gap-2 bg-white rounded-md p-1 cursor-pointer"
              onClick={() => onRequireAuth()}
            >
              Paragraph <ArrowDown className="text-gray-500" />
            </div>
            <button onClick={() => onRequireAuth()}>
              <Bold />
            </button>
            <button onClick={() => onRequireAuth()}>
              <Italic />
            </button>
            <button onClick={() => onRequireAuth()}>
              <Underline />
            </button>
            <div className="h-8 border border-gray-300" />
            <button onClick={() => onRequireAuth()}>
              <List />
            </button>
            <button onClick={() => onRequireAuth()}>
              <ListNumbers />
            </button>
            <div className="h-8 border border-gray-300" />
            <button onClick={() => onRequireAuth()}>
              <Quote />
            </button>
            <button onClick={() => onRequireAuth()}>
              <Code />
            </button>
          </div>
          <button onClick={() => onRequireAuth()} className="text-red-500 ">
            <Trash />
          </button>
        </div>
        {/* editor input */}
        <div className="flex gap-2 p-4">
          <div
            onClick={() => onRequireAuth()}
            className="text-gray-500 cursor-pointer"
          >
            🙂
          </div>
          <textarea
            id="post-editor"
            className="w-full outline-none"
            rows={3}
            placeholder="How are you feeling today?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={(e) => {
              if (!isAuthenticated) {
                e.target.blur();
                onRequireAuth(true);
              }
            }}
          />
        </div>
        {/* editor actions */}
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => onRequireAuth()}>
              <Plus />
            </button>
            <button onClick={() => onRequireAuth()}>
              <Microphone />
            </button>
            <button onClick={() => onRequireAuth()}>
              <Video />
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="text-blue-500 cursor-pointer"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
