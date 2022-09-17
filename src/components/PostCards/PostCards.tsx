import { FC, useState } from 'react';

import { API } from '@/api';
import { Post } from '@/api/rest/posts';
import { PostCard } from '@/components/PostCards/components';
import VirtualizedGrid from '@/UI/VirtualizedGrid';

const PostCards: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadMorePosts = async () => {
    if (hasMore) {
      const newPosts = await API.posts.getAllWithPagination({
        page: page,
        limit: 20,
      });

      setPosts([...posts, ...newPosts]);
      setPage(page + 1);

      if (!newPosts.length) {
        setHasMore(false);
      }
    }
  };

  return (
    <VirtualizedGrid
      entities={posts}
      loadMoreEntities={loadMorePosts}
      columnCount={2}
      renderCard={(post) => <PostCard post={post} />}
      rowGap={'10px'}
      columnGap={'10px'}
      height={'600px'}
      width={'800px'}
    />
  );
};

export default PostCards;
