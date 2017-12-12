class LineColor extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		this.props.openColorPicker(e.target);
	}
	render() {
		if(!this.props.color) return <span></span>;
		var activeColor=null;
		if(this.props.color=="auto") activeColor={background:"white"};
		else activeColor={background: this.props.color};
		return(
			<span><div style={activeColor} className="color-picker-swatch line" onClick={this.onClick}></div></span>
		)
	}
}

module.exports = LineColor;