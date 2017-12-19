import configs from "../../../configs/ui.js"

class Periodicity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeOption: this.getCurrentOption(this.props.ciq.layout)
		};
	}
	onOptionClick(period, interval, index) {
		if (!this.ciq) { return; }
		Actions.showLoader();
		this.ciq.setPeriodicityV2(period, interval);
		this.setState({
			activeOption: configs.periodicity.options[index]
		});
		var that = this;
		window.setTimeout(function () {
			that.props.hideLoader();
		}, 1000);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			return this.setState({
				ciq: nextProps.ciq,
				activeOption: this.getCurrentOption(this.ciq.layout),
				showLoader: nextProps.showLoader,
				hideLoader: nextProps.hideLoader
			});
		}
	}
	getCurrentOption(layout) {
		for (var i = 0; i < configs.periodicity.options.length; i++) {
			var option = configs.periodicity.options[i];
			if (layout.interval === option.interval && layout.period === option.periodicity) {
				return option;
			}
		}
	}
	render() {
		var self = this;

		var options = configs.periodicity.options.map(function (item, index) {
			return <menu-option key={"period" + index} className="option" onClick={function () {
				self.onOptionClick(item.period, item.interval, index);
			}}>{item.label}</menu-option>;
		});

		return (
			<span>
				<menu-select id="periodicitySelect">
					<span className="title">{this.state.activeOption ? this.state.activeOption.label : null}</span>
					<menu-select-options className="menu-hover">
						{options}
					</menu-select-options>
				</menu-select>
			</span>
		);
	}
}

module.exports = Periodicity;