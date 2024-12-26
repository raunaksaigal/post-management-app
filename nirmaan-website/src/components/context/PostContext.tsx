import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of a Post
export interface Post {
  id: number;
  caption?: string;
  file?: string[]; // URLs for uploaded files
  location?: string;
  tags?: string;
}

// Define the context value
interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}

// Create the context
const PostContext = createContext<PostContextType | undefined>(undefined);

// Hook to access the PostContext
export const usePostContext = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

// PostProvider component
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
