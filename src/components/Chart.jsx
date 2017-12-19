import UI from "./UI";
//This just loads the feed into the CIQ engine
import FeedService from "../feeds/template";
import { ChartStore, Actions } from "../stores/ChartStores";
import RangeSelector from "./RangeSelector";
import Legend from './Legend';
import DrawingToolbar from './DrawingToolbar';
export default class ChartWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feed: "Demo",
			service: null,
			chartSeries: [],
			loader: false,
			ciq: null
		};
	}
	componentDidMount() {
		var self = this;
		var ciq = new CIQ.ChartEngine({
			container: $$$('#chartContainer')
		});
		ciq.xaxisHeight = 30;

		//You can add an event listener to the window,however, older browsers don't support this.
		window.addEventListener("resize", function () {
			Actions.updateChartContainerSize();
		});

		ChartStore.setChart(ciq);
		this.setState({
			service: new FeedService().makeFeed(),
			ciq: ciq
		}, function () {
			this.attachFeed(this.state.service);
			let defaultSymbol = this.props.symbol ? this.props.symbol : "AAPL";
			Actions.setSymbol(defaultSymbol);
			this.bindCorrectContext();
			this.addStoreListeners();
		});
	}
	bindCorrectContext() {
		this.hideLoader = this.hideLoader.bind(this);
		this.showLoader = this.showLoader.bind(this);
		this.setCurrentVectorParams = this.setCurrentVectorParams.bind(this);
	}
	addStoreListeners() {
		ChartStore.addListener('showLoader', this.showLoader);
		ChartStore.addListener('hideLoader', this.hideLoader);
	}
	removeStoreListeners() {
		ChartStore.removeListener('showLoader', this.showLoader);
		ChartStore.removeListener('hideLoader', this.hideLoader);
	}
	setPeriodicity(period, interval) {
		Actions.setPeriodicity({ period, interval });
	}
	setChartType(type) {
		Actions.setChartType(type);
	}
	setCurrentVectorParams(style) {
		var ciq = this.state.ciq;

		ciq.currentVectorParameters.annotation.font.size = style.size;
		ciq.currentVectorParameters.annotation.font.family = style.family;
		ciq.currentVectorParameters.annotation.font.style = style.style;
		ciq.currentVectorParameters.annotation.font.weight = style.weight;

		this.setState({
			ciq: ciq
		}, ciq.changeVectorType(style.tool));
	}
	toggleCrosshairs() {
		var state = this.state.ciq.layout.crosshair;
		this.state.ciq.layout.crosshair = !state;
	}
	attachFeed(feed) {
		this.state.ciq.attachQuoteFeed(feed, {
			refreshInterval: 1
		});
	}
	showLoader() {
		this.setState({
			loader: true
		});
	}
	hideLoader() {
		this.setState({
			loader: false
		});
	}
	render() {
		//NOTE: `this.ciq &&` means "If this.ciq exists, render the component on the next line". This is set up so that the component always gets a valid chart; the chart doesn't exist on construction, only after we inject it into the container.
		return (<div>
			{this.state.ciq &&
				<UI ciq={this.state.ciq} />
			}
			<div className="ciq-chart-area">
				{this.state.ciq &&
					<DrawingToolbar ciq={this.state.ciq} setVectorParams={this.setCurrentVectorParams.bind(this)} />
				}
				<div id="chartContainer" className="chartContainer">
					<div className={this.state.loader ? 'loader' : ''}></div>
					{this.state.ciq &&
						<Legend ciq={this.state.ciq} />
					}
				</div>
			</div>
			<div className="ciq-footer">
				{this.state.ciq &&
					<RangeSelector ciq={this.state.ciq} />
				}
			</div>
		</div>);
	}
}


