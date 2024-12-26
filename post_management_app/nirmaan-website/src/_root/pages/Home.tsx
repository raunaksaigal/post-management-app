import React, { useState } from "react";
import PostCard from "@/components/shared/PostCard";
import { Link } from "react-router-dom"; // Import Link for routing

type Post = {
  caption: string;
  file: any[];
  location: string;
  tags: string;
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Feed</h1>
      {/* Display posts */}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <PostCard author={""} timestamp={""} title={""} description={""} key={index} {...post} />
        ))
      ) : (
        <p>No posts yet. Create one to get started!</p>
      )}
    </div>
  );
};

export default Home;
