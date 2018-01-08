import ColorPicker from "../Drawing/ColorPicker"
import ColorSwatch from '../Drawing/ColorSwatch'

class ThemeModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			placeholder: 'Name Your Theme'
		}
		this.bindCorrectContext()
	}
	componentWillReceiveProps(nextProps){
		if(this.props.themeHelper === null){
			this.props.setThemeHelper(this.props.ciq)
		}
	}
	bindCorrectContext(){
		this.saveSettings = this.saveSettings.bind(this)
		this.updateThemeName = this.updateThemeName.bind(this)
		this.updateTheme = this.updateTheme.bind(this)
	}
	saveSettings() {
		// if (!this.state.themeName) return;
		// this.props.toggle(this.props.themeHelper.settings, this.state.name);
	}
	updateTheme(color, item, swatch) {
		console.log("color: ", color)
		console.log("item: ", item)
		this.props.updateTheme(item, color);
	}
	updateThemeName(event) {
		this.setState({
			name: event.target.value
		});
	}
	render() {
		let sections = this.props.currentThemeSettings.map((option, i) => {
			let swatches = option.swatches.map((swatch, j) => {
				return (<ColorSwatch key={'swatch'+j} setColor={this.updateTheme} type={swatch.class} color={swatch.color} />)
			})

			return (
				<div key={'section'+i} className={'dialog-item ' + option.class}>
					<span>
						{option.section}
					</span>
					{swatches}
				</div>
			)
		})

		if(this.props.showEditModal){
			return (
				<span className="ciq dialog-overlay">
					<div className="ciq dialog">
						<div className="cq-close" onClick={ this.props.toggleThemeEditor }></div>
						<div className="heading">Custom Theme</div>
						{ sections }
						<div className="dialog-item theme-save">
							<input className="ciq" type="text" placeholder={this.state.placeholder} onChange={this.updateThemeName}></input>
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
