import UI from "./components/ui"

var ChartWrapper = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            feed:"Demo"
        }
    },
    componentDidMount() {
        var ciq = new CIQ.ChartEngine({
            container: $$$("#chartContainer")
        });
        this.setState({
            ciq: ciq
        }, function() {
            this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed[this.state.feed]());
            ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");

        })
    },
    componentWillMount: function() {},
    componentWillUpdate: function(nextProp, nextState) {
        /// Catch new props here
    },
    setPeriodicity: function(period, interval) {
        this.state.ciq.setPeriodicityV2(period, interval);
    },
    setChartType: function(type) {
        if ((type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi') {
            this.state.ciq.setChartType('candle');
            this.state.ciq.setAggregationType(type.type);
        } else {
            this.state.ciq.setChartType(type.type);
            this.state.ciq.setAggregationType('ohlc');
        }
    },
    toggleCrosshairs: function() {
        var state = this.state.ciq.layout.crosshair;
        this.state.ciq.layout.crosshair = !state;

    },
    changeSymbol: function(symbol) {
        this.state.ciq.newChart(symbol);
    },
    addComparison: function(symbolComparison) {
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        this.state.ciq.addSeries(symbolComparison, {
            isComparison: true,
            color: getRandomColor(),
            data: {
                useDefaultQuoteFeed: true
            }
        });


    },
    attachFeed: function(feed) {

        this.state.ciq.attachQuoteFeed(feed);
    },
    render: function() {
        return <div>
                 <UI ciq={this.state.ciq ? this.state.ciq : null}/>
                 <div id="chartContainer" style={ {
                width: "800px",
                height: "500px",
                position: "relative"
            }}>
                 </div>
               </div>

    }
});

ReactDOM.render(
    <ChartWrapper/>
    , document.getElementById('chartHere'));