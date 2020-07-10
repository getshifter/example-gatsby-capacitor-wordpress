import {useEffect} from 'react'

export const useLoadPWAElements = () => {
  const windowGlobal = typeof window !== 'undefined' && window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@ionic/pwa-elements/loader')
        .then((module) => {
          module.defineCustomElements(windowGlobal)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }, [windowGlobal])
}
