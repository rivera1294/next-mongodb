import cookie from 'cookie'

export const parseCookies = (req) => cookie.parse(req ? req?.headers?.cookie || '' : document.cookie)
