import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';
import { favoriteTransform, tweetTransform } from '../transforms';

const mutationTwitterResolver: MutationResolvers<TwitterResolverContext> = {
  async createTweet(_parent, args, { dbTweetCache, db }) {
    const { body, userId } = args;
    const dbTweet = await db.createTweet({
      message: body,
      userId,
    });
    const dbTweetMap = (dbTweetCache ||= {});
    const dbAuthor = db.getUserById(userId);
    if (!dbAuthor) {
      throw new Error(`No author found for ${userId}`);
    }

    dbTweetMap[dbTweet.id] = dbTweet;
    return Object.assign(tweetTransform(dbTweet), { author: dbAuthor });
  },
  async createFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.createFavorite(favorite);
    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    };
  },
  async deleteFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.deleteFavorite(favorite);
    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    };
  },
};
export default mutationTwitterResolver;
