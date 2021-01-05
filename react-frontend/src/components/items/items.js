import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import {NavLink, useHistory} from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../axios";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	itemTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	itemText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Items = (props) => {
	const history = useHistory();
	const { items } = props;
	const classes = useStyles();

	function addToCart(data){
		console.log(data);

		if (localStorage.getItem('access_token'))
		axiosInstance.post(`myitems/cart/add/`, data
		);
		else if (!localStorage.getItem('access_token'))
			history.push('/login');
	}

	if (!items || items.length === 0) return <h2 align="center">No items available</h2>;
	return (
		<React.Fragment>
			<h1 align="center">Items</h1>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{items.map((item) => {
						return (
							<Grid item key={item.id} xs={12} md={4}>
								<Card className={classes.card}>
									<Link style={{ textDecoration: 'none' }}
										color="textPrimary"
										href={'/items/' + item.id}
										className={classes.link}
									>
										<CardMedia
											className={classes.cardMedia}
											image="https://source.unsplash.com/random"
											title="Image title"
										/>
									<CardContent className={classes.cardContent}>

										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.itemTitle}
										>
											Name/Title: {item.title.substr(0, 50)}...
										</Typography>

										<div className={classes.itemText}>
											<Typography color="textSecondary">
												Description: {item.description.substr(0, 50)}...
											</Typography>
										</div>

										<div className={classes.postText}>
											<Typography color="textSecondary"
														align="left">
												Date added: {moment(item.published).format('DD.MM.YYYY')}{' '}
											</Typography>
										</div>

										<br></br>

										<Typography color="Primary"
													align="center"
											>
												{item.price} €
										</Typography>

									</CardContent>
										</Link>
									<Typography align="center">
										<Button
											color="primary"
											variant="contained"
											onClick={() => addToCart({item: item.id})}
										>
											<AddShoppingCartIcon></AddShoppingCartIcon>
										</Button>
									</Typography>{' '}
									<br></br>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Items;
