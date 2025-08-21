import helloWorldRoute from './server-routes/hello-world.routes.mjs'

export default async (instance) => {
  instance.register(helloWorldRoute)
}
