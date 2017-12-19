//components
import TimeZone from '../TimezoneModal';

class TimeZoneButton extends React.Component {
	constructor(props) {
        super(props);
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.onClick = this.onClick.bind(this);
    }
	onClick() {
		this.refs.modal.toggle();
	}
	render() {
		return (
			<span><TimeZone ref="modal" ciq={this.props.ciq} /><button className="timezone-btn"
				onClick={this.onClick}></button></span>
		);
	}
}

module.exports = TimeZoneButton;