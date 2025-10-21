import { useCallback, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { usePosts } from "../state/PostsContext";
import PostEditor from "../components/PostEditor";
import PostCard from "../components/PostCard";
import AuthModal from "../components/AuthModal";

export default function FeedPage() {
  const { user, isAuthenticated } = useAuth();
  const { posts, addNewPost } = usePosts();
  const [modal, setModal] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const requireAuth = useCallback(
    (isTextArea: boolean = false) => {
      if (!isAuthenticated && !modal) {
        setModal(true);
        return;
      } else if (isAuthenticated && !isTextArea) {
        alert("Function not implemented.");
        return;
      }
    },
    [isAuthenticated, modal]
  );

  const handleAuthModalClose = () => {
    setModal(false);
  };

  const publish = (text: string) => {
    if (!isAuthenticated || !user) return setModal(true);
    const id = addNewPost(text, user?.email || "");
    if (id) setRecentlyAddedId(id);
  };

  return (
    <div className="flex flex-col items-center gap-4 page-fade">
      <PostEditor onPublish={publish} onRequireAuth={requireAuth} />
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          onRequireAuth={requireAuth}
          style={{ animationDelay: `${index * 80}ms` }}
          highlight={recentlyAddedId === post.id}
        />
      ))}
      <AuthModal open={modal} onClose={handleAuthModalClose} />
    </div>
  );
}
