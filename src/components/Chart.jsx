import UI from "./UI";
//This just loads the feed into the CIQ engine
import FeedService from "../feeds/template";
import { ChartStore, Actions } from "../stores/ChartStores";
import RangeSelector from "./RangeSelector";
import Legend from './Legend';
import DrawingToolbar from './DrawingToolbar';

class Chart extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	isLoading: false
		// }
	}
	componentDidMount() {
		// this.setState({
		// 	isLoading: true
		// }, function() {
		// 	this.props.setChartContainer($$$('#chartContainer'))
		// })
		this.props.setChartContainer($$$('#chartContainer'))
	}
	// componentWillReceiveProps(nextProps){
	// 	//
	// 	if(nextProps.ciq !== null && this.state.isLoading){
	// 		this.setState({
	// 			isLoading: false
	// 		})
	// 	}
	// }
	bindCorrectContext() {
		this.setCurrentVectorParams = this.setCurrentVectorParams.bind(this);
	}
	setChartType(type) {
		Actions.setChartType(type);
	}
	setCurrentVectorParams(style) {
		var ciq = this.props.ciq;

		ciq.currentVectorParameters.annotation.font.size = style.size;
		ciq.currentVectorParameters.annotation.font.family = style.family;
		ciq.currentVectorParameters.annotation.font.style = style.style;
		ciq.currentVectorParameters.annotation.font.weight = style.weight;

		this.setState({
			ciq: ciq
		}, ciq.changeVectorType(style.tool));
	}
	render() {
		return (
			<div>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingToolbar {...this.props} />
					<div id='chartContainer' className='chartContainer'>
						<div className={this.props.isLoadingPeriodicity ? 'loader' : ''}></div>
						<Legend {...this.props} />
					</div>
				</div>
				<div className="ciq-footer">
					<RangeSelector {...this.props} />
				</div>
			</div>
		)
	}
}

export default Chart


