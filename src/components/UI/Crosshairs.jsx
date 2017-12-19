class Crosshairs extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		if (!this.ciq) { return; }
		this.ciq.layout.crosshair = !this.ciq.layout.crosshair;
		this.forceUpdate();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			return this.setState({
				ciq: nextProps.ciq
			});
		}
	}
	render() {
		var cName = "crosshair-btn ";
		cName += this.ciq ? (this.ciq.layout.crosshair ? "active" : "") : "";
		return (
			<span> <button className={cName} onClick={this.onClick}></button></span>
		);
	}
}

module.exports = Crosshairs;