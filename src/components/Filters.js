import React from 'react';

class Filters extends React.Component {
  filterTab = (text) => (
  	<button 
  		className="filterTab" 
  		onClick={(e) => this.handleClick(e, text)}
  	>
  		{text}
  	</button>
  )
  handleClick(e, filterName) {
  	this.props.onFilter(filterName.toLowerCase());
  }
	render() {
		return (
			<div className="filters">
				{this.filterTab("Hot")}
				{this.filterTab("New")}
				{this.filterTab("Rising")}
				{this.filterTab("Controversial")}
			</div>
		)
	}
}
export default Filters;