import React, { useEffect, useState } from "react";
import PostCard from "@/components/shared/PostCard";

type Post = {
  id: string;
  author: string;
  timestamp: string;
  caption: string;
  location: string;
  tags: string;
  file: string; // File is a string (URL)
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://10.10.10.92:8000/api/v1/posts/?perpage=2&page=1');
        const data = await response.json();
        setPosts(data.results as Post[]); // Cast API data to Post[]
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            author={post.author}
            timestamp={post.timestamp}
            caption={post.caption}
            location={post.location}
            tags={post.tags}
            file={post.file}
          />
        ))
      ) : (
        <p></p>
      )}
      <PostCard author={"Ayaan"} timestamp={"3:55 pm"} caption={"Hi! this is my first post"} location={"Kolkata"} tags={"test"} file={""}/>
      <PostCard author={"Debrup"} timestamp={"3:55 pm"} caption={"Hi! this is my second post"} location={"Kolkata"} tags={"test"} file={""}/>

    </div>
  );
};

export default Home;
