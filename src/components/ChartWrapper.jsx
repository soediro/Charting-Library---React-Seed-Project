import UI from "./UI";
//This just loads the feed into the CIQ engine
import DemoFeed from "../feeds/demoFeed";
export default class ChartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciq: null,
      feed: "Demo"
    }
  };
  componentDidMount() {
    var self = this;
    var ciq = new CIQ.ChartEngine({
      container: $$$("#chartContainer")
    });
    //You can add an event listener to the window,however, older browsers don't support this.
    window.addEventListener("resize", function() {
      self.updateChartContainerSize()
    });

    this.setState({
      ciq: ciq
    }, function() {
      this.state.ciq.setPeriodicityV2(1, 5);
      this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed[this.state.feed]());
      ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
    })
  };
  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
  updateChartContainerSize() {

    var windowSize = this.getWindowSize();
    document.getElementById("chartContainer").style.width = (windowSize.width) + "px";
    document.getElementById("chartContainer").style.height = (windowSize.height * .90) + "px";
    this.state.ciq.resizeChart();
  };
  componentWillMount() {}
  componentWillUpdate(nextProp, nextState) {
    /// Catch new props here
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
    this.state.ciq.addSeries(symbolComparison, {
      isComparison: false,
      color: getRandomColor(),
      data: {
        useDefaultQuoteFeed: true
      }
    });
  };
  attachFeed(feed) {

    this.state.ciq.attachQuoteFeed(feed, {
      refreshInterval: 1
    });
  };
  render() {
    var windowSize = this.getWindowSize();

    return <div>
             <UI ciq={ this.state.ciq ? this.state.ciq : null } />
             <div id="chartContainer" className="chartContainer" style={ { width: (windowSize.width) + "px", height: (windowSize.height * .90) + "px", position: "relative" } }>
             </div>
           </div>
  };
}

