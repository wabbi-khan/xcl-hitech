import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => state.user);
	return (
		<Route
			{...rest}
			render={() => {
				return user.username ? children : <Redirect to='/' />;
			}}
		/>
	);
};

export default PrivateRoute;
