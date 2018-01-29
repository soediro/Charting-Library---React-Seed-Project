import configs from "../../../configs/ui.js"

class ChartTypes extends React.Component{
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
		let options = configs.chartTypes.types.map((item, i) => {
			return (
				<menu-option key={"type" + i} className="option" onClick={this.props.setChartType.bind(this, item)}>{item.label}</menu-option>
			);
		});
	
		let label = getOptionLabel(this.props.ciq.layout);

		let menuDisplay = {
			display: this.state.menuOpen ? 'block' : 'none'
		};
	
		return (
			<menu-select id="chartTypeSelect" onMouseOver={this.openMenu} onMouseOut={this.closeMenu} onClick={this.closeMenu}>
				<span className="title">{label ? label : null}</span>
				<menu-select-options className="menu-hover" style={menuDisplay}>
					{options}
				</menu-select-options>
			</menu-select>
		)
	}
}

//private
function getOptionLabel(layout){
	for (var i = 0; i < configs.chartTypes.types.length; i++){
		let option = configs.chartTypes.types[i];
		if(layout.chartType === option.type){
			return option.label
		}
	}
	return configs.chartTypes.types[0].label
}

export default ChartTypes