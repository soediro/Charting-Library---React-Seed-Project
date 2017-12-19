class Comparison extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			symbol: null
		};
		this.bindCorrectContext();
	}
	bindCorrectContext(){
		this.compareChange = this.compareChange.bind(this);
		this.onOptionClick = this.onOptionClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.updateComparisonSeries = this.updateComparisonSeries.bind(this);
	}
	compareChange(event) {
		this.setState({
			symbol: event.target.value
		});
	}
	onOptionClick() {
		if (!this.ciq) { return; }
		if (!this.ciq.callbacks.symbolChange) { this.ciq.callbacks.symbolChange = this.updateComparisonSeries; }
		function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
		var newSeries = this.ciq.addSeries(this.state.symbol, {
			isComparison: true,
			color: getRandomColor(),
			data: {
				useDefaultQuoteFeed: true
			}
		});
		this.setState({
			symbol: null
		});
		this.refs["compareInput"].value = "";
		Actions.addComparisonSeries(newSeries);
	}
	handleKeyPress(key) {
		if (key == 'Enter') {
			this.onOptionClick();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			return this.setState({
				ciq: nextProps.ciq
			});
		}
	}
	updateComparisonSeries() {
		if (arguments[0].action == 'remove-series') {
			Actions.removeComparisonSeries(arguments[0].stx.chart.series[arguments[0].symbol]);
			this.ciq.removeSeries(arguments[0].symbol, this.ciq.chart);
		}
	}
	render() {
		var self = this;
		return (
			<span className="symbol-frame">
				<input ref="compareInput" onChange={function (event) {
					self.compareChange(event.nativeEvent);
				}}
					onKeyPress={function (event) { self.handleKeyPress(event.key); }} id="symbolCompareInput" placeholder="Add Comparison" type="text" >
				</input>
				<div className="comparison-btn" onClick={this.onOptionClick}></div>
			</span>
		);
	}
}

module.exports = Comparison;