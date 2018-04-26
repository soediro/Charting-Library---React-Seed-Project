import React from 'react'
import UI from "./UI";
import RangeSelector from "./RangeSelector";
import ShareButton from "./ShareButton";
import Legend from './Legend';
import DrawingContainer from '../containers/drawingContainer'

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setChartContainer($$$('#chartContainer'), {
			studyOverlayEdit: this.props.toggleStudyOverlay,
			studyPanelEdit: this.props.openStudyModal
		})
		this.resizeScreenFn = this.resizeScreen.bind(this)
		window.addEventListener("resize", this.resizeScreenFn);
		this.resizeScreenFn();
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.ciq !== nextProps.ciq) {
			nextProps.ciq.callbacks.layout = this.props.saveLayout;
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeScreenFn);
	}
	resizeScreen(){
		if(window.innerWidth > 800){
			this.parentDiv.className="break-lg"
		}
		else if(window.innerWidth > 584){
			this.parentDiv.className="break-md"
		}
		else {
			this.parentDiv.className="break-sm"
		}
	}
	render() {
		return (
			<div ref={el => this.parentDiv = el}>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingContainer {...this.props} />
					<div id='chartContainer' className='chartContainer chartContainerMain'>
						<div className={this.props.isLoadingPeriodicity ? 'loader' : ''}></div>
						<Legend {...this.props} />
					</div>
				</div>
				<div className="ciq-footer">
					<ShareButton {...this.props} />
					<RangeSelector {...this.props} />
				</div>
			</div>
		);
	}
}

export default Chart
