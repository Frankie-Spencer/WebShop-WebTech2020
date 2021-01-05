import React, { useEffect, useState } from 'react';
import './App.css';
import CartItems from './components/myitems/cartitems';
import ItemLoadingComponent from './components/items/itemLoading';
import axiosInstance from './axios';


function MyItems() {
	const CartItemLoading = ItemLoadingComponent(CartItems);

	function GetMyCartItems(URL) {
		const [appState, setAppState] = useState({
			loading: true,
			items: null,
		});

		useEffect(() => {
			axiosInstance.get(URL).then((res) => {
				const allitems = res.data;
				setAppState({loading: false, items: allitems});
				console.log(res.data);
			});
		}, [setAppState]);
		return appState
	}

	const cart = GetMyCartItems('myitems/cart/')

	return (
		<div className="App">
			<CartItemLoading isLoading={cart.loading} items={cart.items}/>
		</div>
	);
}
export default MyItems;
