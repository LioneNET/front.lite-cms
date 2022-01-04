import authRotues from "./authRoutes"
import commonRoutes from "./commonRoutes"
import fileRoutes from "./fileRoutes"
import categoryRoutes from './categoryRoutes';

const MainRoutes = [
  ...authRotues,
  ...fileRoutes,
  ...commonRoutes,
  ...categoryRoutes
]

const defaultRoute = '/'

export { defaultRoute, MainRoutes }