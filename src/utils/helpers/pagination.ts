export const paginate = <T = any>(list: Array<T>, limit: number, offset: number, total: number) => {
  let result = list
  if (!offset) {
    result = result.slice(0, limit)
  } else if (((offset + 1) * limit) >= total) {
    result = result.slice((offset * limit), total)
  } else if (((offset + 1) * limit) < result.length) {
    result = result.slice((offset * limit), ((offset + 1) * limit))
  } else {
    result = []
  }

  return result
}
