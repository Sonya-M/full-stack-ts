import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { trendTransform, tweetTransform } from '../transforms';

const queryTwitterResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    if (!firstUser)
      throw new Error(
        'currentUser was requested, but there are no users in the database'
      );
    return firstUser;
  },
  suggestions: (_, __, context) => {
    const { db } = context;
    // example usage of context:
    // db.getStuff()
    return db.getAllSuggestions();
  },
  tweets: (
    _parent,
    _args,
    { db, dbTweetToFavoriteCountMap, dbUserCache, dbTweetCache }
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
    });
    return db.getAllTweets().map((t) => {
      dbTweetCache[t.id] = t;
      return tweetTransform(t);
    });
  },
  trends: (_, __, { db }) => {
    return db.getAllTrends().map(trendTransform);
  },
};

export default queryTwitterResolver;
