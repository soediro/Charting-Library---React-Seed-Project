var TimeZone = React.createClass({
  getInitialState: function() {
    var zones = [];
    var self = this;
    function addZone(zone){
      zones.push(<span key={"zone"  + zone} 
        onClick={function(){self.setTimeZone(zone)}} 
        className="timeZoneOption" style={ { "display": "inline-block" } }>
            { zone }
        </span>)
    }
    for (var zone in CIQ.timeZoneMap) {
      addZone(CIQ.timeZoneMap[zone]);
    }
    return {
      ciq: null,
      open: false,
      timeZones: zones,
    }
  },
  toggle() {
    this.setState({
      open: !this.state.open
    });
  },
  setTimeZone(zone){
    this.state.ciq.setTimeZone(this.state.ciq.dataZone, "America/Costa_Rica");
    if(this.state.ciq.chart.symbol) this.state.ciq.draw();
    this.toggle();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.ciq) {
      return this.setState({
        ciq: nextProps.ciq
      });
    }
  },
  render: function() {
    var self = this;
    if (!this.state.open) return <div></div>
    return (

      <div id="timezoneDialog">
        <div className="content" style={ { "maxHeight": "300px","overflow":"scroll" } }>
              <h2 className="center">Time Zones</h2>
          <div>
            { this.state.timeZones }
          </div>
          <div className="center"><button onClick={ this.toggle }>Done</button></div>
        </div>
      </div>


    )
  }
});


module.exports = TimeZone;
