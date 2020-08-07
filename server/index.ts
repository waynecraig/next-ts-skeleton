import Koa from 'koa'
import next from 'next'
import router from './router'
import { parse } from 'url'
import config from 'config'

const main = async () => {
  const app = new Koa()
  const nextApp = next({ dev: process.env.NODE_ENV === 'development' })
  const nextHandler = nextApp.getRequestHandler()

  await nextApp.prepare()

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use((ctx) => {
    ctx.respond = false
      ; (ctx.req as any).state = ctx.state
    nextHandler(ctx.req, ctx.res, parse(ctx.req.url || '/', true))
  })

  app.on('error', (err, ctx) => {
    console.log('error event', err)
  })

  app.listen(config.get('port'), () => {
    console.log('Server running on port ' + config.get('port'))
  })
}

main()
