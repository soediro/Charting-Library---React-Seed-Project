class FontFamily extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.fontFamilyOptions=["Helvetica", "Courier", "Garamond", "Palatino", "Times New Roman"];
    this.state={
      fontFamily:this.props.family
    };
  }
	onClick(newFamily) {
    var self=this;
    return function(){
      self.setState({
        fontFamily:newFamily
      });
      self.props.updateFontFamily(newFamily);
    }
	}
	render() {
		if(!this.props.fontOptions) return <span></span>;
		var self=this;
    var fontFamilies = this.fontFamilyOptions.map(function(option, index) {
      return <menu-option key={"family" + index} onClick={self.onClick(option)}><span>{option}</span></menu-option>
    });
		return(
			<span>
        <menu-select id="fontFamilySelect">
				<span className="title">{this.state.fontFamily}</span>
				<menu-select-options class="menu-hover">
          {fontFamilies}
				</menu-select-options>
			</menu-select>
      </span>
		)
	}
}

module.exports = FontFamily;