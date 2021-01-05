import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

function ItemLoading(Component) {
	return function ItemLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<div>
				<br></br>
				<CircularProgress/>
			</div>
		);
	};
}
export default ItemLoading;
