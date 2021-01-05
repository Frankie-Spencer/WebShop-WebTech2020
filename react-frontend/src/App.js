import React from 'react';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Shop from './Shop';
import Header from './components/header';
import Footer from './components/footer';
import SignUp from './components/auth/signup';
import ResetPassword from './components/auth/resetpassword';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/items/single';
import MyItems from './MyItems';
import Cart from './cart';
import Create from './components/myitems/add';
import Edit from './components/myitems/edit';
import Delete from './components/myitems/delete';


function AppRouter(){

	return (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route exact path="/" component={Shop} />
				<Route path="/items/:id" component={Single} />
				<Route exact path="/myitems" component={MyItems} />
				<Route exact path="/myitems/cart" component={Cart} />
				<Route exact path="/myitems/add" component={Create} />
				<Route exact path="/myitems/edit/:id" component={Edit} />
				<Route exact path="/myitems/delete/:id" component={Delete} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/account" component={ResetPassword} />
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
	);
}

export default AppRouter;
