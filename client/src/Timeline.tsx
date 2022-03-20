import gql from 'graphql-tag';
import * as React from 'react';
import ComposePanel from './ComposePanel';
import Tweet from './Tweet';
import { useGetTimelineTweetsQuery } from './generated/graphql';

export const GET_TIMELINE_TWEETS = gql`
  query GetTimelineTweets {
    tweets {
      id
      body
      favoriteCount
      retweetCount
      commentCount
      createdAt
      favorites {
        user {
          id
        }
      }
      author {
        name
        handle
        avatarUrl
      }
    }
  }
`;

export interface TimelineProps {
  currentUserId: string;
  currentUserFavorites: string[];
}

const Timeline: React.FC<TimelineProps> = ({
  currentUserFavorites,
  currentUserId,
}) => {
  const { loading, error, data } = useGetTimelineTweetsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data!</p>;
  const { tweets } = data;
  if (!tweets) return <p>No tweets!</p>;
  console.log({ currentUserFavorites });
  return (
    <div id="timeline">
      <ComposePanel />
      {tweets.map((t) => {
        const author = t.author;
        if (!author) throw new Error(`Tweet ${t.id} has no author!`);
        const isFavorited = currentUserFavorites.includes(t.id);
        console.log({ isFavorited, id: t.id, body: t.body });
        const tweet = {
          id: t.id,
          isFavorited,
          author,
          commentCount: t.commentCount || 0,
          likeCount: t.favoriteCount || 0,
          retweetCount: t.retweetCount || 0,
          createdAt: new Date(t.createdAt),
          message: t.body,
        };
        return <Tweet tweet={tweet} currentUserId={currentUserId} key={t.id} />;
      })}

      <footer>
        <i className="fab fa-twitter"></i>
        <button>Load More</button>
      </footer>
    </div>
  );
};

export default Timeline;
