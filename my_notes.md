- common `schema.graphql` - store/update in our common repo?
  - prob. will need graphql tools to import the schema etc where needed on both sides? cf for server:

```ts
// https://www.typescript-training.com/course/full-stack-typescript/06-imported-resolver/
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GRAPHQL_SCHEMA_PATH } from './constants';
```

## UI

- https://www.typescript-training.com/course/full-stack-typescript/08-ui-consumes-data/
- https://www.typescript-training.com/course/full-stack-typescript/10-nested-data/#consume-it-in-the-ui
- https://frontendmasters.com/courses/fullstack-typescript/provider-ui-consuming-data/
- second half of https://frontendmasters.com/courses/fullstack-typescript/create-resolver-wiring-ui/
- https://frontendmasters.com/courses/fullstack-typescript/using-union-types/
-

```ts
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache, // store data and access it thru multiple components without worrying about firing n same reqs w/in short period of time
} from '@apollo/client';

//...
const client = new ApolloClient({
  // same url we are hitting for dev tools
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

//...
// wrap app in provider
```

- for example usage, see `client/src/index.tsx`

### operations

- operations => queries defined in codebase for fetching/mutating data, stuff your api consumer is performing
- example in `client/src/App.tsx`
- to make a query, import:

```ts
import { gql } from '@apollo/client'; // here used to define queries
import { useGetCurrentUserQuery } from './generated/graphql'; // part of code that will be generated for us - function that defines what we need to pass in, and what we can expect to get back for a particular query
```

- after defining query, run `yarn codegen` -> libs `@graphql-codegen/..` + `codegen.yml` config files
- on the UI `codegen` is not just about generating types, but also about making sure the query hook `useGetCurrentUserQuery` is building the graphql query properly , so any time you add sth to an operation or query, rerun `yarn codegen`

### client-side mutations

- https://www.typescript-training.com/course/full-stack-typescript/11-nested-data%20copy/#compose-panel
- https://www.typescript-training.com/course/full-stack-typescript/12-favorites/#ui
- `client/src/ComposePanel.tsx`, `client/src/App.tsx`
