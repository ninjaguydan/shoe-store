import React, { useState } from "react"
import Spinner from "./Spinner"
import useFetch from "./services/useFetch"
import { useParams } from "react-router-dom"
import PageNotFound from "./PageNotFound"
import { Link } from "react-router-dom"

export default function Products() {
	const [size, setSize] = useState("")
	const { category } = useParams()

	const {
		data: products,
		error,
		loading,
	} = useFetch("products?category=" + category)

	//Promise-based call
	// useEffect(() => {
	// 	getProducts("shoes")
	// 		.then((resp) => setProducts(resp))
	// 		.catch((e) => setError(e))
	// 		.finally(() => setLoading(false))
	// }, [])

	//using async awaits
	// useEffect(() => {
	// 	async function init() {
	// 		try {
	// 			const resp = await getProducts("shoes")
	// 			setProducts(resp)
	// 		} catch (e) {
	// 			setError(e)
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}
	// 	init()
	// }, [])

	function renderProduct(p) {
		return (
			<div key={p.id} className="product">
				<Link to={`/${category}/${p.id}`}>
					<img src={`/images/${p.image}`} alt={p.name} />
					<h3>{p.name}</h3>
					<p>${p.price}</p>
				</Link>
			</div>
		)
	}

	const filteredProducts = size
		? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
		: products

	if (error) throw error
	if (!loading && products.length === 0) return <PageNotFound />

	return (
		<>
			<section id="filters">
				<label htmlFor="size">Filter by Size:</label>{" "}
				<select
					id="size"
					value={size}
					onChange={(e) => setSize(e.target.value)}
				>
					<option value="">All sizes</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
				</select>
				{size && <h2>Found {filteredProducts.length} Items</h2>}
			</section>
			<section id="products">
				{loading ? <Spinner /> : filteredProducts.map(renderProduct)}
			</section>
		</>
	)
}
