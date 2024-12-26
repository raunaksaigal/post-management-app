import React, { useState } from 'react';

interface PostCardProps {
  author: string;
  timestamp: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const PostCard: React.FC<PostCardProps> = ({ author, timestamp, title, description, imageUrl }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  return (
    <div className="border rounded-lg p-4 w-auto max-w-md mx-auto bg-white shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">{author}</h4>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="w-auto max-w-full h-auto rounded mb-4" />}
      <div className="flex justify-between items-center">
        <button className="flex items-center text-blue-500 hover:text-blue-700" onClick={handleLike}>
          <span className="mr-2">👍</span> {likes}
        </button>
        <button className="flex items-center text-blue-500 hover:text-blue-700" onClick={handleComment}>
          <span className="mr-2">💬</span> {comments}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
