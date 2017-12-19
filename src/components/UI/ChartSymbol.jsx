class ChartSymbol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			symbol: "AAPL"
        };
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
	onOptionClick() {
		if (!this.ciq || !this.state.symbol) { return; }
		Actions.setSymbol(this.state.symbol);
	}
	onChange(event) {
		this.setState({
			symbol: event.target.value
		});
	}
	handleKeyPress(key) {
		if (key == 'Enter') {
			this.onOptionClick();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			return this.setState({
                ciq: nextProps.ciq, 
                showLoader: nextProps.showLoader, 
                hideLoader: nextProps.hideLoader
			});
		}
	}
	render() {
		var self = this;
		return (
			<span className="symbol-frame">
				<input ref="symbolInput" id="symbolInput" type="text" placeholder="Enter Symbol"
					onChange={function (event) {
						self.onChange(event.nativeEvent);
					}}
					onKeyPress={function (event) {
						self.handleKeyPress(event.key);
					}}></input><div className="symbol-btn" onClick={this.onOptionClick}></div>
			</span>
		);
	}
}

module.exports = ChartSymbol;