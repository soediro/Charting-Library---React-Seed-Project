var TimeZone = React.createClass({
  getInitialState: function() {
    var zones = [];
    for (var zone in CIQ.timeZoneMap) {
      zones.push(<span key={"zone"  + zone} className="timeZoneOption" style={ { "display": "inline-block" } }>
                                    { CIQ.timeZoneMap[zone] }
                                  </span>)
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
        <div className="content" style={ { "max-height": "500px","overflow":"scroll" } }>
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
