import { lazy } from "react";

const authRotues = [
  {
    path: 'login',
    component: lazy(() => import('../../Layouts/Login')),
    meta: {
      authRoute: true
    }
  }
]

export default authRotues