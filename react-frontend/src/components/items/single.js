import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import {NavLink, useHistory, useParams} from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Item() {
	const history = useHistory();
	const { id } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({
		item: [],
	});

	useEffect(() => {
		axiosInstance.get('items/' + id).then((res) => {
			setData({
				item: res.data,
			});
			console.log(res.data);
		});
	}, [setData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);

		if (localStorage.getItem('access_token'))
		axiosInstance.post(`myitems/cart/add/`, {
			item: data.item.id

		});
		else if (!localStorage.getItem('access_token'))
			history.push('/login');

	};
	if (!data.item.id) return (
		<div>
		<p></p>
		<h2 align="center">This item is not available
		</h2>
		</div>

	);
	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}> </div>{' '}
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
					<Typography
						component="h1"
						variant="h4"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.item.title}{' '}
					</Typography>{' '}
					<Typography
						variant="h6"
						align="center"
						color="textPrimary"
						paragraph
					>
						{data.item.description}{' '}
					</Typography>{' '}

					<Typography
						variant="h6"
						align="center"
						color="textSecondary"
						paragraph
					>
						Date added: {moment(data.item.published).format('DD.MM.YYYY')}{' '}
					</Typography>{' '}

					<Typography
						variant="h6"
						align="center"
						color="primary"
						paragraph
					>
						{data.item.price}{' '} €
					</Typography>{' '}

					</CardContent>
					<Typography align="center">
					<Button
						type="submit"
						color="primary"
						variant="contained"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={data.item.status === 'sold'}
					>
						Add to cart
					</Button>
					</Typography>{' '}
					<br></br>
					</Card>
				</Container>{' '}
			</div>{' '}
		</Container>
	);
}
