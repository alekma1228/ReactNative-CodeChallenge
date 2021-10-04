// api.ts
// Rest API module

const API_URL = 'https://dcom-native-interview.s3.amazonaws.com/'

export const fetchMerchants = async (address: string, zipcode: string) => {
  const addressParam = address.replaceAll(' ', '_').toLocaleLowerCase()
  try {
    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    const response = await fetch(`${API_URL}api/merchant/query/${addressParam}_${zipcode}`, {
      method: 'GET',
      headers: requestHeaders,
    })

    const responseJson = await response.json()
    return { result: responseJson, isSuccess: true }
  } catch (error) {
    console.log('---- get users API error', error)
    return { result: null, isSuccess: false, message: error }
  }
}
