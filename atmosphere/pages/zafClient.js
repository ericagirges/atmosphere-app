import { useEffect, useState } from "react"

export function useZafClient() {
  const [client, setClient] = useState(null)
  useEffect(() => {
    // check to make sure we are not already using ZAF client OR that the client is not undefined
    if (!client && typeof window.ZAFClient !== 'undefined') {
      setClient(window.ZAFClient.init())
    }
  }, [client])

  return client
}