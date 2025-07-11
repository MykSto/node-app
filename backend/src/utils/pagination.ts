import config from 'config'

const DEFAULT_PAGE = config.get('pagination.page') as number
const DEFAULT_LIMIT = config.get('pagination.limit') as number

export const pagination = (query: Record<string, string>) => {

  const { limit: qLimit, page: qPage } = query

  const limit = Math.abs(Number(qLimit)) || DEFAULT_LIMIT
  const page = Math.abs(Number(qPage)) || DEFAULT_PAGE
  const skip = (page - 1) * limit

  return {
    limit,
    skip
  }
}
