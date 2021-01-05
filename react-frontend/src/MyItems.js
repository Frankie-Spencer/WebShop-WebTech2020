import React, { useEffect, useState } from 'react';
import './App.css';
import SaleItems from './components/myitems/saleitems';
import SoldItems from './components/myitems/solditems';
import BoughtItems from './components/myitems/boughtitems';
import ItemLoadingComponent from './components/items/itemLoading';
import axiosInstance from './axios';
import Button from "@material-ui/core/Button";


function MyItems() {
	const SaleItemLoading = ItemLoadingComponent(SaleItems);
	const SoldItemLoading = ItemLoadingComponent(SoldItems);
	const BoughtItemLoading = ItemLoadingComponent(BoughtItems);

	function GetMyItems(URL) {
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

	const mysaleitems = GetMyItems('myitems/available/')
	const mysolditems = GetMyItems('myitems/sold/')
	const myboughtitems = GetMyItems('myitems/bought/')

	return (
		<div className="App">

			<br></br>

			<SaleItemLoading isLoading={mysaleitems.loading} items={mysaleitems.items}/>


			<br></br>

			<Button
				href={'/myitems/add'}
				variant="contained"
				color="primary"
			>
				Add Item
			</Button>

			<br></br>
			<br></br>

			<SoldItemLoading isLoading={mysolditems.loading} items={mysolditems.items}/>

			<br></br>

			<BoughtItemLoading isLoading={myboughtitems.loading} items={myboughtitems.items}/>
		</div>
	);
}

export default MyItems;
