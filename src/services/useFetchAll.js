import { useState, useEffect, useRef } from "react"

export default function useFetchAll(urls) {
	const prevUrls = useRef([])
	const [data, SetData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (areEqual(prevUrls.current, urls)) {
			setLoading(false)
			return
		}
		prevUrls.current = urls

		const promises = urls.map((url) =>
			fetch(process.env.REACT_APP_API_BASE_URL + url).then((resp) => {
				if (resp.ok) return resp.json()
				throw resp
			})
		)
		Promise.all(promises)
			.then((json) => SetData(json))
			.catch((e) => {
				console.error(e)
				setError(e)
			})
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

function areEqual(arr1, arr2) {
	return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
}
