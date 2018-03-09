import UI from "./UI";
import RangeSelector from "./RangeSelector";
import ShareButton from "./ShareButton";
import Legend from './Legend';
import StudyContainer from '../containers/studyContainer'
import DrawingContainer from '../containers/drawingContainer'

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setChartContainer($$$('#chartContainer'))
	}
	render() {
		console.log('this.props: ', this.props);
		return (
			<div>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingContainer {...this.props} />
					<div id='chartContainer' className='chartContainer'>
						<div className={this.props.isLoadingPeriodicity ? 'loader' : ''}></div>
						<Legend {...this.props} />
						<StudyContainer uiType='legend_chart' {...this.props} />
					</div>
				</div>
				<div className="ciq-footer">
          			<ShareButton {...this.props} />
					<RangeSelector {...this.props} />
				</div>
			</div>
		)
	}
}

export default Chart


