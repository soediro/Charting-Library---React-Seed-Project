import UI from "./UI";
//This just loads the feed into the CIQ engine
import FeedService from "../feeds/template";
import DrawingToolbar from "./DrawingToolbar"
import { ChartStore, Actions } from "../stores/ChartStore";
export default class ChartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciq: null,
      feed: "Demo",
      service: null,
      chartSeries: [],
	  loader:false
    };
  }
  componentDidMount() {
    var self = this;
    var ciq = new CIQ.ChartEngine({
      container: $$$("#chartContainer")
    });
    ciq.xaxisHeight=30;
    //You can add an event listener to the window,however, older browsers don't support this.
    window.addEventListener("resize", function () {
      self.updateChartContainerSize()
    });

    this.setState({
      ciq: ciq,
      service: new FeedService().makeFeed()
    }, function () {
      this.state.ciq.setPeriodicityV2(1, 5);
      this.attachFeed(this.state.service);
      ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
    });
  };
  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
  updateChartContainerSize() {
    var windowSize = this.getWindowSize();
    document.getElementById("chartContainer").style.width = (windowSize.width) + "px";
    document.getElementById("chartContainer").style.height = (windowSize.height * .85) + "px";
    this.state.ciq.resizeChart();
  };
  setPeriodicity(period, interval) {
    this.state.ciq.setPeriodicityV2(period, interval);
  };
  setChartType(type) {
    if ((type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi') {
      this.state.ciq.setChartType('candle');
      this.state.ciq.setAggregationType(type.type);
    } else {
      this.state.ciq.setChartType(type.type);
      this.state.ciq.setAggregationType('ohlc');
    }
  };
  toggleCrosshairs() {
    var state = this.state.ciq.layout.crosshair;
    this.state.ciq.layout.crosshair = !state;

  };
  attachFeed(feed) {
    this.state.ciq.attachQuoteFeed(feed, {
      refreshInterval: 1
    });
  }
  showLoader(){
  	this.setState({
  		loader:true
    });
  }
  hideLoader(){
	  this.setState({
		  loader:false
	  });
  }
  render() {
    return (<div>
      <UI showLoader={this.showLoader.bind(this)} hideLoader={this.hideLoader.bind(this)} ciq={this.state.ciq ? this.state.ciq : null} />
      <div className="ciq-chart-area">
        <DrawingToolbarWrapper ciq={this.state.ciq} />
        <div id="chartContainer" className="chartContainer">
	        <div className={this.state.loader ? 'loader' : ''}></div>
	        <Legend ciq={this.state.ciq} />
        </div>
      </div>
      <div className="ciq-footer">
        <BottomUI showLoader={this.showLoader.bind(this)} hideLoader={this.hideLoader.bind(this)} ciq={this.state.ciq ? this.state.ciq : null} />
      </div>
    </div>);
  }
}

var DrawingToolbarWrapper = React.createClass({
  getInitialState: function () {
    return {
      ciq: null,
      active: ChartStore.getToolbarStatus()
    }
  },
  onStoreChange: function () {
    this.setState({ active: ChartStore.getToolbarStatus() });
    var elem = document.getElementById("chartContainer");
    if(ChartStore.getToolbarStatus()){
      //resize the chart based on if the toolbar is now open or closed
      elem.className += " toolbarOn";
    }
    else{
      elem.classList.remove("toolbarOn");
      this.props.ciq.changeVectorType('');
    }
    this.state.ciq.draw();
  },
  componentWillMount() {
    ChartStore.addListener(["drawingToolbarChange"], this.onStoreChange);
  },
  componentWillUnmount() {
    ChartStore.removeListener(["drawingToolbarChange"], this.onStoreChange);
    // This will remove the quoteDriver, styles and
    // eventListeners for this ChartEngine instance.
    this.state.ciq.destroy();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.ciq) {
      return this.setState({
        ciq: nextProps.ciq
      });
    }
  },
  render: function () {
    if(!this.state.active) return <span></span>;
    return (
      <span><DrawingToolbar ciq={this.state.ciq} /></span>
    )
  }
});

var Legend = React.createClass({
	getInitialState: function () {
		return {
		  comparisons: ChartStore.getComparisons()
		}
	},
	onStoreChange: function () {
		this.setState({ comparisons: ChartStore.getComparisons() });
	},
	componentWillMount() {
		ChartStore.addListener(["comparisonsChange"], this.onStoreChange);
	},
	componentWillUnmount() {
		ChartStore.removeListener(["comparisonsChange"], this.onStoreChange);
		// This will remove the quoteDriver, styles and
		// eventListeners for this ChartEngine instance.
		this.state.ciq.destroy();
	},
	removeSeries(comparison) {
		Actions.removeComparisonSeries(comparison);
		this.props.ciq.removeSeries(comparison.display, this.props.ciq.ciq);
	},
	render: function () {
		var self = this;
		if (!this.state.comparisons || this.state.comparisons.length === 0) return <span></span>

		var comparisons = this.state.comparisons.map(function (comparison, i) {
		  return (
		    <div className="comparisonWrapper" key={"comp" + i}>
		      <div className="chartSeriesColor" style={{ "backgroundColor": comparison.parameters.color }} ></div>
		      <div className="chartSeries">{comparison.display}</div>
		      <div className="deleteSeries" onClick={function () {
		        self.removeSeries(comparison);
		      }} ></div >
		    </div>
		  )
	});

	return <div className="comparisons">
	    {comparisons}
	</div>
	}
});


var rangeConfig = [
  {
    display: "All",
    span: "all",
    "multiplier": 1
  }, {
    display: "5y",
    span: "year",
    "multiplier": 5
  }, {
    display: "1y",
    span: "year",
    "multiplier": 1
  }, {
    display: "YTD",
    span: "YTD",
    "multiplier": 1
  }, {
    "display": "3m",
    span: "month",
    "multiplier": 3
  }, {
    display: "1m",
    span: "month",
    "multiplier": 1
  }, {
    display: "5d",
    span: "day",
    "multiplier": 5
  }, {
    display: "1d",
    span: "day",
    "multiplier": 1
  }];


var BottomUI = React.createClass({
  getInitialState() {
    return {
      ciq: null
    };
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.ciq) {
      return this.setState({
          ciq: nextProps.ciq,
	      showLoader: nextProps.showLoader,
	      hideLoader: nextProps.hideLoader
      });
    }
  },
  setSpan(span, multiplier) {
    if (this.state.ciq) {
	    this.props.showLoader();
	    this.state.ciq.setSpan({span: span, multiplier: multiplier});
	    var that=this;
	    window.setTimeout(function() {
		    that.props.hideLoader();
	    }, 1000);
    }
  },
  render() {
    var self = this;
    var ranges = rangeConfig.map(function (range, i) {
      return (<div className="quick-link" key={i} onClick={function () {
        self.setSpan(range.span, range.multiplier);
      }}>{range.display}</div>);


    });
    return (
      <div>
        {ranges}
      </div>
    );
  }
});

