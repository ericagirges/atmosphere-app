import { useEffect, useState } from "react"

export function useZafClient() {
  const [client, setClient] = useState(null)
  useEffect(() => {
    if (!client && typeof window.ZAFClient !== 'undefined') {
      setClient(window.ZAFClient.init())
    }
  }, [client])

  return client
}