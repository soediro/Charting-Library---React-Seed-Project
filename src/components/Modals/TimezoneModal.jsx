class TimeZone extends React.Component {
	constructor(props) {
		super(props);
	}


	getTimeZoneLi() {
		return Object.values(CIQ.timeZoneMap).
			sort().
			map((zone, i) => {
				return (
					<li key={"zone" + zone} onClick={() => {console.log(this.props); this.props.setTimeZone(zone)} } className="dialog-item">{zone}</li>
					)
			})
	}

		// function addZone(zone) {
		// 		zones.push(<li key={"zone" + zone}
		// 			onClick={function () { self.setTimeZone(zone) }}
		// 			className="dialog-item">
		// 			{zone}
		// 		</li>);
		// 	}

		// for (var zone in CIQ.timeZoneMap) {
		// 	addZone(CIQ.timeZoneMap[zone]);
		// }
		// zones.sort(function (a, b) {
		// 	var A = a.key; // sort by the keys (effectively the names of the zones)
		// 	var B = b.key;
		// 	if (A < B) {
		// 		return -1;
		// 	}
		// 	if (A > B) {
		// 		return 1;
		// 	}
		// 	// must be equal
		// 	return 0;
		// });
		// this.state = {
		// 	ciq: null,
		// 	open: false,
		// 	timeZones: zones,
		// 	myZone: myZone
		// }

		// this.toggle = this.toggle.bind(this);
		// this.myTimeZone = this.myTimeZone.bind(this);


		setTimeZone(zone) {
			this.props.ciq.setTimeZone(this.props.ciq.dataZone, "America/Costa_Rica");
			this.getMyZoneObj();
			if (this.props.ciq.chart.symbol) this.props.ciq.draw();
			this.toggle();
		}

		myTimeZone() {
			this.props.ciq.defaultDisplayTimeZone = null;
			for (var i = 0; i < CIQ.ChartEngine.registeredContainers.length; i++) {
				var stx = CIQ.ChartEngine.registeredContainers[i].stx;
				stx.displayZone = null;
				stx.setTimeZone();

				if (stx.displayInitialized) stx.draw();
			}
			this.getMyZoneObj();
			if (this.props.ciq.chart.symbol) this.props.ciq.draw();
			this.toggle();
		}

		getMyZoneObj() {
				return this.props.ciq.displayZone ?
				(<button className="current-location-btn" onClick={()=>this.myTimeZone()}>Use my current location</button>)
				:
				(<div className="current-location-message">Your timezone is your current location</div>);
			}

		render() {
			if (!this.props.showTimezoneModal) return <span></span>
			return (
				<div className="ciq dialog-overlay">
					<div className="ciq dialog timezone">
						<div className="cq-close" onClick={()=>this.props.toggleTimezoneModal()}></div>
						<h3 className="center">Select Timezone</h3>
							{this.getMyZoneObj()}
						<ul className="timezoneList">
							{this.getTimeZoneLi()}
						</ul>
						<div className="instruct">(Scroll for more options)</div>
					</div>
				</div>
			)
		}
	}

module.exports = TimeZone;
