import React, { useState } from "react";

interface PostCardProps {
  author: string;
  timestamp: string;
  caption: string;
  location: string;
  tags: string;
  file: string; // Assuming file is a URL string pointing to the image
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  timestamp,
  caption,
  location,
  tags,
  file,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleComment = () => {
    setComments((prevComments) => prevComments + 1);
  };

  return (
    <div className="border rounded-lg p-4 w-auto max-w-md mx-auto bg-white shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{author || "Anonymous"}</h4>
        <span className="text-sm text-gray-500">
          {timestamp || "Unknown time"}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{caption}</p>
      {file && (
        <img
          src={file}
          alt="Post"
          className="w-auto max-w-full h-auto rounded mb-4"
        />
      )}
      <p className="text-sm text-gray-600 mb-2">
        <strong>Location:</strong> {location || "Not specified"}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Tags:</strong> {tags || "None"}
      </p>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center text-blue-500 hover:text-blue-700"
          onClick={handleLike}
        >
          <span className="mr-2">👍</span> {likes}
        </button>
        <button
          className="flex items-center text-blue-500 hover:text-blue-700"
          onClick={handleComment}
        >
          <span className="mr-2">💬</span> {comments}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
