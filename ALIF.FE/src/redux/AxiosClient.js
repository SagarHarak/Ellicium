import axiosclient from '../config/apipath'
/*
 * Axios Api Call Component
 * @type : GET POST PATCH DELETE
 * @api : Api Path
 * @payload : Payload that need to be sent to server
 * @toolkit: dispatch, fulfillWithValue, rejectWithValue
 */

const AxiosClient = async (type, api, payload, toolkit) => {
  const AxiosType = {
    GET: axiosclient.get,
    POST: axiosclient.post,
    PATCH: axiosclient.patch,
    DELETE: axiosclient.delete,
  }
  return await AxiosType[type](api, payload)
    .then((response) => {
      return toolkit.fulfillWithValue(response.data)
    })
    .catch((error) => {
      return toolkit.rejectWithValue(error.response.data)
    })
}
export { AxiosClient }
