import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import Button from '@material-ui/core/Button';
import axiosInstance from "../../axios";

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


function submit_remove(url, data){
		console.log(data);
		axiosInstance.delete(url, data);
		window.location.reload();
}

function submit_pay(url, data){
		console.log(data);
		axiosInstance.post(url, data);
		window.location.reload();
}

const CartItems = (props) => {
	const { items } = props;
	const classes = useStyles();
	if (!items || items.length === 0) return <h2 align="center">Cart is empty</h2>;
	return (
		<React.Fragment>
			<h1 align="center">Cart</h1>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Id</TableCell>
									<TableCell align="center">Item</TableCell>
									<TableCell align="center">Action</TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="right">Price</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item) => {
									return (
										<TableRow>

											<TableCell component="th" scope="row" align="left">
												{item.item_code}
											</TableCell>

											<TableCell align="center">
												<Link
													color="textPrimary"
													href={'/items/' + item.item_code}
													className={classes.link}
												>
													{item.title}
												</Link>
											</TableCell>

											<TableCell align="center">
												<Button
													color="secondary"
													variant="outlined"
													onClick={() => submit_remove(`myitems/cart/remove/`
																					 + item.item_code + '/',
																				{item: item.item_code})}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
											</TableCell>

											<TableCell>
													{item.status}
											</TableCell>

											<TableCell align="right">
													{item.current_price} €
											</TableCell>

										</TableRow>
									);
								})}
								<TableRow>

									<TableCell colSpan={4} align="right">
												<Button
													color="secondary"
													variant="outlined"
													onClick={() => submit_remove(`myitems/cart/removeall/`)}
												>
													Remove all items
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
									</TableCell>

									<TableCell colSpan={5} align="right">
										Total: {items.reduce((accumulator, currentValue) => accumulator
															  + currentValue.current_price, 0)} €
									</TableCell>

								</TableRow>

								<TableRow>
									<TableCell colSpan={5}  align="right">
										<Button
											color="primary"
											variant="contained"
											onClick={() => submit_pay(`myitems/cart/pay/`,
																	 {pay_confirm: 'pay'})}
										>
											PROCEED TO PAY
											<PaymentIcon></PaymentIcon>
										</Button>
									</TableCell>
								</TableRow>

							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default CartItems;
