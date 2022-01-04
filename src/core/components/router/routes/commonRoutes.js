import { lazy } from "react"

const commonRoutes = [
  {
    path: 'error',
    component: lazy(()=>import('../../Layouts/misc/NotFound')),
    meta: {
      publicRoute: true
    }
  }
]

export default commonRoutes