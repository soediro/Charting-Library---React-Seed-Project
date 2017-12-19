//components
import ThemeModal from '../ThemeModal';

class ThemeUI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themeList: [{
				"name": "Default",
				"settings": // the default theme settings
				{
					"chart": {
						"Axis Text": { "color": "rgba(197,199,201,1)" },
						"Background": { "color": "rgba(28,42,53,1)" },
						"Grid Dividers": { "color": "rgba(37,55,70,1)" },
						"Grid Lines": { "color": "rgba(33,50,63,1)" }
					},
					"chartTypes": {
						"Candle/Bar": {
							"down": { "border": "rgba(227,70,33,1)", "color": "rgba(184,44,12,1)", "wick": "rgba(0,0,0,1)" },
							"up": { "border": "rgba(184,222,168,1)", "color": "rgba(140,193,118,1)", "wick": "rgba(0,0,0,1)" }
						},
						"Line": { "color": "rgba(0,0,0,1)" },
						"Mountain": { "color": "rgba(102,202,196,0.498039)" }
					}
				}
			}, {
				"name": "+ New Theme"
			}],
			themeHelper: null
		};
		this.addTheme = this.addTheme.bind(this);
	}
	setThemeHelper(ciq) {
		if (!ciq) { return; }
		var themeHelper = new CIQ.ThemeHelper({
			'stx': ciq
		});
		this.setState({
			ciq: ciq,
			themeHelper: themeHelper,
		});
	}
	themeSelect(theme) {
		if (theme.name === "+ New Theme") {
			return this.openThemeModal();
		}
		this.updateTheme(theme.settings);
	}
	openThemeModal() {
		this.refs.themeModal.openDialog(this.addTheme);
	}
	addTheme(theme, themeName) {
		var item = {
			name: themeName,
			settings: theme
		};
		this.state.themeList.splice((this.state.themeList.length - 1), 0, item);
		this.setState({
			themeList: this.state.themeList
		});
		this.updateTheme(theme);
	}
	updateTheme(theme) {
		var c = CIQ.clone(theme);
		this.state.themeHelper.settings = c;
		this.state.themeHelper.update();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.ciq) {
			this.setThemeHelper(nextProps.ciq);
		}
	}
	render() {
		var self = this;
		var options = this.state.themeList.map(function (theme, index) {
			return (<menu-option key={"theme" + index} className="option" onClick={function () {
				self.themeSelect(theme);
			}}>{theme.name}</menu-option>);
		});
		return (
			<span>
				<ThemeModal ref="themeModal" themeHelper={this.state.themeHelper ? this.state.themeHelper : null} />
				<menu-select id="themeSelect">
					<span className="title">Select Theme</span>
					<menu-select-options>
						{options}
					</menu-select-options>
				</menu-select>
			</span>
		);
	}
}

module.exports = ThemeUI;