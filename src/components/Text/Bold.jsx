class Bold extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state={
      bold:false
    };
  }
	onClick() {
    var self=this;
    return function(){
      self.setState({
        bold:!self.state.bold
      }, () => {
        self.props.toggleBold(self.state.bold);
      });
    }
	}
	render() {
		if(!this.props.fontOptions) return <span></span>;
		return(
			<span><div className="boldBtn" onClick={this.onClick()}>B</div></span>
		)
	}
}

module.exports = Bold;