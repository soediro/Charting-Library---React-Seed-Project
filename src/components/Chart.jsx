import UI from "./UI";
import RangeSelector from "./RangeSelector";
import Legend from './Legend';
import DrawingContainer from '../containers/drawingContainer'

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setChartContainer($$$('#chartContainer'))
	}
	render() {
		return (
			<div>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingContainer {...this.props} />
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


