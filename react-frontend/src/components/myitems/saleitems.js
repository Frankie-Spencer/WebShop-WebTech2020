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
import Button from '@material-ui/core/Button';


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

const SaleItems = (props) => {
	const { items } = props;
	const classes = useStyles();
	if (!items || items.length === 0) return <h2 align="center">No sale items</h2>;
	return (
		<React.Fragment>
			<h1 align="center">My Items Sale</h1>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Id</TableCell>
									<TableCell align="center">Item</TableCell>
									<TableCell align="center">Action</TableCell>
									<TableCell align="right">Price</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item) => {
									return (
										<TableRow>

											<TableCell component="th" scope="row" align="left">
												{item.id}
											</TableCell>


											<TableCell align="center">
												<Link
													color="Primary"
													href={'/items/' + item.id}
													className={classes.link}
												>
													{item.title}
												</Link>
											</TableCell>



											<TableCell align="center">
												<Link
													color="textPrimary"
													href={'/myitems/edit/' + item.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="secondary"
													href={'/myitems/delete/' + item.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>

											<TableCell align="right">
												{item.price} €
											</TableCell>

										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default SaleItems;
