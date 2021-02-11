import { parseCookies } from '~/utils/parseCookies'

export const getStandardHeadersByCtx = (ctx) => {
  const headers = {}
  let cookies = {}

  if (!!ctx?.req?.headers?.cookie) headers['cookie'] = ctx.req.headers.cookie

  cookies = parseCookies(ctx?.req || null)

  if (!!cookies['token']) {
    headers.token = cookies['token']
  }

  return headers
}
