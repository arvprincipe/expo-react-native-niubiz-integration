const BASE_URL = "http://localhost:3000"

const commonHeaders = {
  'Content-Type': 'application/json',
}
export function useNiubiz() {
  const getToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/nibuiz/token`)
      const json = await response.json()
      return json
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const getSession = async (body: any) => {
    try {
      const response = await fetch(`${BASE_URL}/nibuiz/session`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(body)
      })
      const json = await response.json()
      return json
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const getButton = async (bodyParams: any) => {
    try {
      const { session, ...rest } = bodyParams
      const body = {
        "order": {
          "merchantId": "456879852",
          "purchaseNumber": "1001",
          ...rest
        },
        "session": session
      }

      const response = await fetch(`${BASE_URL}/nibuiz/button`, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify(body)
      })
      const text = await response.text()
      return text
    } catch (error) {
      console.log('error: ', error);
    }
  }

  return { getToken, getSession, getButton };
}