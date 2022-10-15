import { FC, useState } from 'react';

import { API } from '@/api';
import { Post } from '@/api/rest/posts';
import { POSTS } from '@/components/Draggable/data';
import DraggableColumn from '@/components/Draggable/DraggableColumn';
import { PostCard } from '@/components/PostCards/components';

const PostCards: FC = () => {
  const [posts, setPosts] = useState<Post[]>(POSTS);
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
    <DraggableColumn
      cards={posts}
      renderCard={(card) => <PostCard post={card} />}
    />
    // <VirtualizedGrid
    //   entities={posts}
    //   loadMoreEntities={loadMorePosts}
    //   columnCount={2}
    //   renderCard={(post) => <PostCard post={post} />}
    //   rowGap={'10px'}
    //   columnGap={'10px'}
    //   height={'600px'}
    //   width={'800px'}
    // />
  );
};

export default PostCards;
