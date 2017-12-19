class DrawingToolbarButton extends React.Component {
	onClick() {
		Actions.toggleDrawingToolbar();
	}
	render() {
		return (
			<span><button className="drawing-toolbar-btn" onClick={this.onClick}></button></span>
		);
	}
}

module.exports = DrawingToolbarButton;