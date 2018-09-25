import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import { makeExecutableSchema } from 'graphql-tools'
import graphqlHTTP from 'koa-graphql'

import typeDefs from './utils/schema.graphql'
import resolvers from './resolvers'
import { endpointURL, isDevelopment } from './utils/config'

const schema = makeExecutableSchema({ typeDefs, resolvers })
const app = new Koa()
const router = new Router()

app
  .use(helmet())
  .use(cors())
  .use(koaBody({ extendTypes: { graphql: ['application/graphql'] } }))

router.all(
  endpointURL,
  graphqlHTTP({
    schema,
    graphiql: isDevelopment
  })
)

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
