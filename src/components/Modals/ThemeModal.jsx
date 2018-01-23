import ColorPicker from "../Drawing/ColorPicker"
import ColorSwatch from '../Drawing/ColorSwatch'

class ThemeModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			placeholder: 'Name Your Theme'
		}
		this.bindCorrectContext()
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.themeHelper === null){
			this.props.setThemeHelper(this.props.ciq)
		}
	}
	bindCorrectContext(){
		this.saveSettings = this.saveSettings.bind(this)
		this.updateThemeName = this.updateThemeName.bind(this)
	}
	saveSettings() {
		if (!this.state.name || this.state.name==='') return;
		this.props.saveTheme(this.state.name, this.props.themeHelper.settings);
	}
	updateThemeName(event) {
		this.setState({
			name: event.target.value
		});
	}
	render() {
		let sections = this.props.currentThemeSettings.map((option, i) => {
			let swatches = option.swatches.map((swatch, j) => {
				return (<ColorSwatch isModal={true} key={'swatch'+j} setColor={this.props.updateTheme} type={swatch.class} color={swatch.color} />)
			})

			return (
				<div key={'section'+i} className={'dialog-item ' + option.class}>
					{option.section}
					{swatches}
				</div>
			)
		})

		if(this.props.showEditModal){
			return (
				<span className="ciq dialog-overlay">
					<div className="ciq dialog theme-dialog" style={{cursor: 'default'}}>
						<div className="cq-close" onClick={this.props.toggleThemeEditor} />
						<div className="dialog-heading">Create Custom Theme</div>
						{ sections }
						<div className="dialog-item theme-save">
							<input className="ciq" type="text" placeholder={this.state.placeholder} onChange={this.updateThemeName} value={this.state.name} />
							<button className="pull-right ciq" onClick={this.saveSettings}>Save</button>
						</div>
					</div>
				</span>
			);
		}else{
			return (
				<span></span>
			)
		}
	}
}

module.exports = ThemeModal;
