import authRotues from "./authRoutes"
import commonRoutes from "./commonRoutes"
import fileRoutes from "./fileRoutes"

const MainRoutes = [
  ...authRotues,
  ...fileRoutes,
  ...commonRoutes
]

const defaultRoute = '/'

export { defaultRoute, MainRoutes }