import Container from './container'

void (async (): Promise<void> => {
  const { httpServer, cardsRoutes, loginRoutes, router } = await Container()

  loginRoutes.install()
  cardsRoutes.install()

  httpServer.route(router)

  httpServer.listening()
})()
