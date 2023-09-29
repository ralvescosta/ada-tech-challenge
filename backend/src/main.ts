import Container from './container'

void (async (): Promise<void> => {
  const { httpServer, router } = await Container()

  httpServer.route(router)

  httpServer.listening()
})()
