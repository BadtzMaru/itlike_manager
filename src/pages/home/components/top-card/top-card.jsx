import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './top-card.css';

class TopCard extends React.Component {
	static propTypes = {
		pathLink: PropTypes.string.isRequired,
		iconClassName: PropTypes.string.isRequired,
		cardMainTitle: PropTypes.string.isRequired,
		cardSubTitle: PropTypes.string.isRequired,
		bgColor: PropTypes.string.isRequired,
	};

	render() {
		const {
			pathLink,
			iconClassName,
			cardMainTitle,
			cardSubTitle,
			bgColor,
		} = this.props;
		return (
			<div className='cell' style={{ backgroundColor: bgColor }}>
				<Link to={pathLink} className='cell-content'>
					<i className={iconClassName} />
					<h4>{cardMainTitle}</h4>
					<h5>{cardSubTitle}</h5>
				</Link>
			</div>
		);
	}
}

export default withRouter(TopCard);
