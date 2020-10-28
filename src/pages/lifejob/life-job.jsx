import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LifeList from './pages/life-list';
import AddEditLife from './pages/add-edit-life';
import NotFound from '../notFound/not-found';

export default class LifeJob extends React.Component {
	render() {
		return (
			<Switch>
				<Route path={'/lifejob/add-edit'} component={AddEditLife} />
				<Route path={'/lifejob'} component={LifeList} />
				<Route component={NotFound} />
			</Switch>
		);
	}
}
