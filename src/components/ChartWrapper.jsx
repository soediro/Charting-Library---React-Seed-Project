import UI from "./UI";
//This just loads the feed into the CIQ engine
import FeedService from "../feeds/template";
import { ChartStore, Actions } from "../stores/ChartStore";
export default class ChartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciq: null,
      feed: "Demo",
      service: null,
      chartSeries: []

    };
  }
  componentDidMount() {
    var self = this;
    var ciq = new CIQ.ChartEngine({
      container: $$$("#chartContainer")
    });
    //You can add an event listener to the window,however, older browsers don't support this.
    window.addEventListener("resize", function () {
      self.updateChartContainerSize()
    });

    this.setState({
      ciq: ciq,
      service: new FeedService()
    }, function () {
      this.state.ciq.setPeriodicityV2(1, 5);
      this.state.service.attachQuoteFeed(this.state.ciq);
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
  changeSymbol(symbol) {
    this.state.ciq.newChart(symbol);
  };
  addComparison(symbolComparison) {

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    var newSeries = this.state.ciq.addSeries(symbolComparison, {
      isComparison: false,
      color: getRandomColor(),
      data: {
        useDefaultQuoteFeed: true
      }
    });
    console.log("set state")
    this.setState({ chartSeries: this.state.chartSeries.push(newSeries) })
  }
  attachFeed(feed) {
    this.state.ciq.attachQuoteFeed(feed, {
      refreshInterval: 1
    });
  }
  render() {
    var windowSize = this.getWindowSize();
    console.log("this.state.chartSeries", this.state.chartSeries)
    return (<div>
      <UI ciq={this.state.ciq ? this.state.ciq : null} />
      <div className="ciq-chart-area">
        <Legend ciq={this.state.ciq} />
        <div id="chartContainer" className="chartContainer" />
      </div>
      <div className="ciq-footer">
        <BottomUI ciq={this.state.ciq ? this.state.ciq : null} />
      </div>
    </div>
    );
  }
}


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
  },
  removeSeries: function (comparison) {
    console.log("click here");
    Actions.removeComparisonSeries(comparison);
    this.props.ciq.removeSeries(comparison.display, this.props.ciq.ciq);
  },
  render: function () {
    var self = this;
    console.log("this.state.comparisons ", this.state.comparisons)
    if (!this.state.comparisons || this.state.comparisons.length === 0) return <span></span>

    var comparisons = this.state.comparisons.map(function (comparison, i) {
      return (
        <div className="comparisonItem" key={"comp" + i}>
          <div className="chartSeriesColor" style={{ "backgroundColor": comparison.parameters.color }} ></div>
          <div className="chartSeries">{comparison.display}</div>
          <div className="deleteSeries" onClick={function () {
            self.removeSeries(comparison)
          }} > x</div >
        </div>
      )
    })


    return <div className="comparisons">

      <div className="comparisonWrapper" >
        {comparisons}
      </div>
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
        ciq: nextProps.ciq
      });
    }
  },
  setSpan(span, multiplier) {
    if (this.state.ciq) this.state.ciq.setSpan({ span: span, multiplier: multiplier });
  },
  render() {
    var self = this;
    var ranges = rangeConfig.map(function (range, i) {
      return (<ciq-button class="quick-link" key={i} onClick={function () {
        self.setSpan(range.span, range.multiplier);
      }}>{range.display}</ciq-button>);


    });
    return (<ciq-UI-Wrapper>
      <div className="right">
        {ranges}
      </div>
    </ciq-UI-Wrapper>
    );
  }
});

