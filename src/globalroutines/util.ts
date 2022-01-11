import { toolsext } from '@src/store/Modules/toolsext'
import { tools } from '@src/store/Modules/tools'
import messages from '../statics/i18n'

function translate(params: any) {
  const msg = params.split('.')
  const lang = toolsext.getLocale()

  // @ts-ignore
  const stringa = messages[lang]

  let ris = stringa
  try {
    if (ris) {
      msg.forEach((param: any) => {
        ris = ris[param]
      })
    } else {
      console.log('ERRORE IN TRANSLATE! ', params, ' NON ESISTE!')
      return params
    }
  }catch (e) {
    return params
  }

  return ris
}

export default translate
