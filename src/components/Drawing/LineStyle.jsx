class LineStyle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLineClass:"ciq-"+this.props.pattern+"-"+this.props.width,
		};
		this.onClick = this.onClick.bind(this);
	}
	onClick(newClass, newWeight, newPattern) {
		var self=this;
		return function(){
			self.setState({
				selectedLineClass:newClass,
			});
			self.props.updateLineParams(newWeight, newPattern);
		}
	}
	render() {
		if(!this.props.width && !this.props.pattern) return <span></span>;
		return(
			<span>
				<menu-select id="lineSelect">
				<span className={"title " + this.state.selectedLineClass}></span>
				<menu-select-options class="menu-hover">
					<menu-option class="option" onClick={this.onClick('ciq-solid-1', 1, 'solid')}><span className="ciq-line-style-option ciq-solid-1"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-solid-3', 3, 'solid')}><span className="ciq-line-style-option ciq-solid-3"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-solid-5', 5, 'solid')}><span className="ciq-line-style-option ciq-solid-5"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dotted-1', 1, 'dotted')}><span className="ciq-line-style-option ciq-dotted-1"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dotted-3', 3, 'dotted')}><span className="ciq-line-style-option ciq-dotted-3"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dotted-5', 5, 'dotted')}><span className="ciq-line-style-option ciq-dotted-5"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dashed-1', 1, 'dashed')}><span className="ciq-line-style-option ciq-dashed-1"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dashed-3', 3, 'dashed')}><span className="ciq-line-style-option ciq-dashed-3"></span></menu-option>
					<menu-option class="option" onClick={this.onClick('ciq-dashed-5', 5, 'dashed')}><span className="ciq-line-style-option ciq-dashed-5"></span></menu-option>
				</menu-select-options>
			</menu-select>
			</span>
		)
	}
}

module.exports = LineStyle;