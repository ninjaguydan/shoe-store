import { useState, useEffect, useRef } from "react"

const baseUrl = process.env.REACT_APP_API_BASE_URL

const useFetch = (url) => {
	const isMounted = useRef(false)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		isMounted.current = true
		async function init() {
			try {
				const resp = await fetch(baseUrl + url)
				if (resp.ok) {
					const json = await resp.json()
					if (isMounted.current) setData(json)
				} else {
					throw resp
				}
			} catch (e) {
				if (isMounted.current) setError(e)
			} finally {
				if (isMounted.current) setLoading(false)
			}
		}
		init()

		return () => {
			isMounted.current = false
		}
	}, [url])

	return { data, error, loading }
}

export default useFetch
