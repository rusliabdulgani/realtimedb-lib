import { ReturnData } from "../interfaces/global.type"

//def == default data
const data = (params: ReturnData): ReturnData => {
  let { description, data, isError } = params
  let defDesc = 'success'
  let defIsError = false
  let defData = {}
  return {
    data: data ? data : defData,
    description: description ? description : defDesc,
    isError: isError ? isError : defIsError
  }
}

export default data