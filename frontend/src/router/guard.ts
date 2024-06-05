// Progress bar
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Router } from "vue-router"
NProgress.configure({ showSpinner: false })

export const createRouterGuard = (router: Router) => {
  // beforeEach is called before each navigation
  router.beforeEach(async (to, from) => {
    // console.log("Navigating to", to.path, "from", from.path)
    NProgress.start()
    return true
  })

  // afterEach is called after each navigation
  router.afterEach((to) => {
    // console.log("Navigated to", to.path)
    document.title = to.meta.title || "Vue3 Admin Template"
    NProgress.done()
  })
}
