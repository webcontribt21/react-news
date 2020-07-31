import { HNItem } from 'types';

const api = 'https://hacker-news.firebaseio.com/v0';

export const fetchItem = (id: number): Promise<HNItem> => {
  return fetch(`${api}/item/${id}.json`).then((res: Response) => res.json() as Promise<HNItem>);
};

export const fetchComments = (ids: Array<number>): Promise<Array<HNItem>> => {
  return Promise.all(ids.map(fetchItem)).then((comments: Array<HNItem>) =>
    comments.filter(
      (comment: HNItem) => comment.type === 'comment' && !comment.deleted && !comment.dead
    )
  );
};

export const fetchTopStories = (): Promise<Array<HNItem>> => {
  return fetch(`${api}/topstories.json`)
    .then((res: Response) => res.json())
    .then((ids: Array<number>) => {
      if (!ids) {
        throw new Error('Error getting the top stories.');
      }

      return ids;
    })
    .then((ids: Array<number>) => Promise.all(ids.map(fetchItem)))
    .then((posts: Array<HNItem>) =>
      posts.filter((post: HNItem) => post.type === 'story' && !post.deleted && !post.dead)
    );
};
