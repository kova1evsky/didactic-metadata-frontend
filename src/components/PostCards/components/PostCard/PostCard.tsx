import { FC } from 'react';
import styled from 'styled-components';

import { Post } from '@/api/rest/posts';

const PostCard: FC<{ post: Post }> = ({ post }) => {
  return (
    <Wrapper>
      <strong>id: {post.id}</strong>
      <h5>{post.userId}</h5>
      <h3>{post.title}</h3>
      <div>{post.body}</div>
    </Wrapper>
  );
};

export default PostCard;

const Wrapper = styled.div`
  padding: 20px;
  // max-width: 300px;
  border: 2px solid lightgreen;
  border-radius: 10px;
`;
