import configs from "../../../configs/ui.js"

class ChartTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOption: this.getCurrentOption(this.props.ciq.layout)
		};
	}
	onOptionClick(type, index) {
		if (!this.ciq) { return; }
		if ((type.aggregationEdit && this.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi') {
			this.ciq.setChartType('candle');
			this.ciq.setAggregationType(type.type);
		} else {
			this.ciq.setAggregationType(null);
			this.ciq.setChartType(type.type);
		}
		this.setState({
			activeOption: configs.chartTypes.types[index]
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			return this.setState({
				ciq: nextProps.ciq,
				activeOption: this.getCurrentOption(nextProps.ciq.layout)
			});
		}
	}
	getCurrentOption(layout) {
		for (var i = 0; i < configs.chartTypes.types.length; i++) {
			var option = configs.chartTypes.types[i];
			if (layout.chartType === option.type) {
				return option;
			}
		}
		return configs.chartTypes.types[0];
	}
	render() {
		var self = this;
		var options = configs.chartTypes.types.map(function (item, index) {
			return <menu-option key={"type" + index} className="option" onClick={function () {
				self.onOptionClick(item, index);
			}}>{item.label}</menu-option>;
		});

		return (
			<menu-select id="chartTypeSelect">
				<span className="title">{this.state.activeOption ? this.state.activeOption.label : this.state.activeOption}</span>
				<menu-select-options className="menu-hover">
					{options}
				</menu-select-options>
			</menu-select>
		);
	}
}

module.exports = ChartTypes;