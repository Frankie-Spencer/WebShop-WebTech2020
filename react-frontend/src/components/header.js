import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

function Header() {
	const classes = useStyles();
	const history = useHistory();
	const [data, setData] = useState({ search: '' });

	const goSearch = (e) => {
		history.push({
			pathname: '/',
			search: 'search=' + data.search,
		});
		window.location.reload();
	};

	if (localStorage.getItem('access_token'))
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="sticky"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						nowrap={true}
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="Primary"
						>
							<ShopIcon></ShopIcon>
						</Link>
					</Typography>

					<pre>  </pre>

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
							  style={{
								  minWidth: '30%'
							  }}
						/>

					<nav>
						<Link
							color="Primary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/myitems"
						>
							<BusinessCenterIcon></BusinessCenterIcon>
						</Link>
					</nav>

					<nav>
						<Link
							color="Primary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/account"
						>
							<PersonIcon></PersonIcon>						</Link>
					</nav>

					<nav>
						<Link
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						<ExitToAppIcon></ExitToAppIcon>
						</Link>
					</nav>

					<nav>
						<Link
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/myitems/cart"
					>
						<ShoppingCartIcon></ShoppingCartIcon>
						</Link>
					</nav>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);

	else if (!localStorage.getItem('access_token'))
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="sticky"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="Primary"
						nowrap={true}
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="Primary"
						>
							<ShopIcon></ShopIcon>
						</Link>
					</Typography>

					<pre>  </pre>

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
						      style={{
 								minWidth: '30%'
							  }}
						/>

					<nav>
						<Link
							color="Primary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/signup"
						>
							<PersonIcon></PersonIcon>
						</Link>
					</nav>
					<nav>
						<Link
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						<VpnKeyIcon></VpnKeyIcon>
						</Link>
					</nav>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
