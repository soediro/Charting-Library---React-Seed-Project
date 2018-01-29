import configs from "../../../configs/ui.js"

class Periodicity extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			menuOpen: false
		};
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	openMenu(){
		this.setState({
			menuOpen: true
		});
	}
	closeMenu(){
		this.setState({
			menuOpen: false
		});
	}
	render(){
		let options = configs.periodicity.options.map((item, i) => {
			let periodicity = { period: item.period, interval: item.interval, timeUnit: item.timeUnit }
			return <menu-option key={"period" + i} className="option" onClick={this.props.setPeriodicityWithLoader.bind(this, periodicity)}>{item.label}</menu-option>
		});
	
		let label = getOptionLabel(this.props.ciq.layout);

		let menuDisplay = {
			display: this.state.menuOpen ? 'block' : 'none'
		};
	
		return (
			<span>
				<menu-select id="periodicitySelect" onMouseOver={this.openMenu} onMouseOut={this.closeMenu} onClick={this.closeMenu}>
					<span className="title">{label ? label : null}</span>
					<menu-select-options className="menu-hover" style={menuDisplay}>
						{options}
					</menu-select-options>
				</menu-select>
			</span>
		)
	}
}

//private
function getOptionLabel(layout) {

	var text = "";
	var periodicity = layout.periodicity, interval = layout.interval, timeUnit = layout.timeUnit;
	if (isNaN(interval)) {
		timeUnit = interval;
		interval = 1;
	}
	periodicity *= interval;
	text = periodicity;
	if (timeUnit == "day") {
		text += "D";
	} else if (timeUnit == "week") {
		text += "W";
	} else if (timeUnit == "month") {
		text += "M";
	} else if (timeUnit == "tick") {
		text += "T";
	} else if (timeUnit == "second") {
		text += "s";
	} else if (timeUnit == "millisecond") {
		text += "ms";
	} else if (periodicity >= 60 && periodicity % 15 === 0) {
		text = periodicity / 60 + "H";
	} else {
		text += "m";
	}
	return(text);

}

export default Periodicity
