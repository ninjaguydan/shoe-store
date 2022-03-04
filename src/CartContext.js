import React, { useReducer, useEffect, useContext } from "react"
import CartReducer from "./CartReducer"

const CartContext = React.createContext(null)

let initialCart
try {
	initialCart = JSON.parse(localStorage.getItem("cart")) ?? []
} catch {
	console.error("The cart could not be parsed into JSON")
	initialCart = []
}

export function CartProvider(props) {
	const [cart, dispatch] = useReducer(CartReducer, initialCart)
	//any time the cart changes, store it in LocalStorage. Use "cart" as the key
	useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])

	const contextValue = {
		cart,
		dispatch,
	}
	return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}

export function useCart() {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error(
			"useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error"
		)
	}
	return context
}
