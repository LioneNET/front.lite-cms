import { lazy } from "react";

const categoryRoutes = [
  {
    path: 'category',
    component: lazy(() => import('../../Layouts/Category'))
  }
]

export default categoryRoutes