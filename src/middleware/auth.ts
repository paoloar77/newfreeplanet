import { toolsext } from '@store/Modules/toolsext'
import { tools } from '@store/Modules/tools'

export default function auth({ next, router }: { next: any, router: any }) {
  const tok = tools.getItemLS(toolsext.localStorage.token)
  if (!tok) {
    return router.push({ name: 'login' })
  }

  return next()
}
