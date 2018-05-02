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
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.ciq !== nextProps.ciq) {
			nextProps.ciq.callbacks.layout = this.props.saveLayout;

			let actions = [];
			Object.keys(nextProps).map((key) => {
				let prop = nextProps[key];

				if (typeof prop === 'function'){
					actions.push(prop);
				}
			});

			window.actions = actions;
			window.stxx = nextProps.ciq;
		}
	}
	render() {
		return (
			<div>
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