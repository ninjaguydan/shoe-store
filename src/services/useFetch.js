import { useState, useEffect } from "react"

const baseUrl = process.env.REACT_APP_API_BASE_URL

const useFetch = (url) => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function init() {
			try {
				const resp = await fetch(baseUrl + url)
				if (resp.ok) {
					const json = await resp.json()
					setData(json)
				} else {
					throw resp
				}
			} catch (e) {
				setError(e)
			} finally {
				setLoading(false)
			}
		}
		init()
	}, [url])

	return { data, error, loading }
}

export default useFetch
