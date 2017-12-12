class FillColor extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		this.props.openColorPicker(e.target);
	}
	render() {
		if(!this.props.color) return <span></span>;
		var activeColor={background: this.props.color};
		return(
			<span><div style={activeColor} className="color-picker-swatch fill" onClick={this.onClick}></div></span>
		)
	}
}

module.exports = FillColor;