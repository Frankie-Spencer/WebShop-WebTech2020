import React, { useEffect, useState } from 'react';
import './App.css';
import Items from './components/items/items';
import ItemLoadingComponent from './components/items/itemLoading';
import axiosInstance from './axios';
import Button from "@material-ui/core/Button";
import { usePaginatedQuery } from 'react-query';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";


function Shop(){
	const ItemLoading = ItemLoadingComponent(Items);
	const getItems = async (key, page) => {
		const URL = `?page=${page}` + window.location.search.replace('?', '&')
		const res = await axiosInstance.get(URL);
		return (res);
	}

	const [ page, setPage ] = useState(1);
	const {
		resolvedData,
		latestData,
		status
	} = usePaginatedQuery(['items', page], getItems);

	return (
		<div>
		{ status === 'loading' && (
			<Typography
				align="center"
			>
				<br></br>
				<CircularProgress/>
			</Typography>
		)}

		{ (status === 'success' && resolvedData.data.count === 0) && (
			<Typography
				align="center"
				variant="h5"
			>
				<br></br>
				No items available
			</Typography>
		)}

		{ (status === 'success' && resolvedData.data.count !== 0) && (

			<div>
				<ItemLoading isLoading={resolvedData.data.loading} items={resolvedData.data.results}/>

					<br></br>
					<br></br>

				<Typography align="center">

					<Button
						color="primary"
						variant="outlined"
						onClick={() => setPage(old => Math.max(old -1, 1))}
						disabled={page === 1}
					>
						{ '< PAGE' }
					</Button>

				<Typography
						color="primary"
						component="span"
						variant="h5">{ ' ' }{ page }{ ' ' }
				</Typography>

					<Button
						color="primary"
						variant="outlined"
						onClick={() => setPage(old => (!latestData || !latestData.data.next ? old : old + 1))}
						disabled={!latestData || !latestData.data.next}
					>
						{ 'PAGE >' }
					</Button>

				</Typography>
			</div>
		)}
		</div>
	);
}

export default Shop;
