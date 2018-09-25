import rp from 'request-promise'

import { remoteURL } from '../../utils/config'

export default async () => {
  const request = await rp({ uri: remoteURL })

  return JSON.parse(request)
}
