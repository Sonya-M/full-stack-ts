import Query from './resolvers/Query';
import { Resolvers } from './resolvers-types.generated';
import Db, { DbTweet, DbUser } from './db';
import User from './resolvers/User';
import Tweet from './resolvers/Tweet';
import Mutation from './resolvers/Mutation';
import Trend from './resolvers/Trend';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}
const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation,
  User,
  Tweet,
  Trend,
};
export default resolvers;
