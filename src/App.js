import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/' component={Admin} />
				</Switch>
			</HashRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
