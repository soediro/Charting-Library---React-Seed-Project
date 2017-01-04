var TimeZone = React.createClass({
  getInitialState: function() {
    var zones = [];
    var self = this;
    function addZone(zone){
      zones.push(<li key={"zone"  + zone} 
        onClick={function(){self.setTimeZone(zone)}} 
        className="dialog-item" >
            { zone }
        </li>);
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
    if (!this.state.open) return <span></span>
    return (

      <div className="ciq dialog-overlay">
        <div className="ciq dialog">
              <h3 className="center">Select Time Zone</h3>
          <ul>
            { this.state.timeZones }
          </ul>
          <div className="center"><button onClick={ this.toggle }>Done</button></div>
        </div>
      </div>


    )
  }
});


module.exports = TimeZone;
