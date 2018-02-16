class Legend extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			style: {}
		};
		this.moveLegend = this.moveLegend.bind(this);
		this.removeSeries = this.removeSeries.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.ciq === null && nextProps.ciq !== null){
			nextProps.ciq.callbacks.layout = this.moveLegend;
		}

		if (this.props.comparisons.length !== nextProps.comparisons.length){
			this.setState({
				style: {
					marginTop: nextProps.ciq.chart.top + 35 + 'px'
				}
			});
		}
	}
	moveLegend(){
		this.setState({
			style: {
				marginTop: this.props.ciq.chart.top + 35 + 'px'
			}
		});
	}
	removeSeries(id){
		this.props.ciq.removeSeries(id);
	}
	render(){

		let comparisons = this.props.comparisons.map((comparison, i) => {
			return (
				<div className='comparisonWrapper' key={'comparison'+i}>
					<div className='chartSeriesColor' style={{ 'backgroundColor': comparison.parameters.color }}></div>
					<div className='chartSeries'>{comparison.display}</div>
					<div className='deleteSeries' onClick={this.removeSeries.bind(this, comparison.id)}></div>
				</div>
			);
		});


		return (
			<div className='comparisons' style={this.state.style}>
				{comparisons}
			</div>
		);
	}
}

export default Legend;
