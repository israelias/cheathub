import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const About: React.FC<Props> = () => {
  const postId = 5;
  return (
    <div>
      <div>about</div>
      <Link to={`/posts/${postId}`}>go to post 1</Link>
    </div>
  );
};
