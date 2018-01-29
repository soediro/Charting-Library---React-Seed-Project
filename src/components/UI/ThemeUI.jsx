//components
import ThemeModal from '../Modals/ThemeModal';

class ThemeUI extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			menuOpen: false
		};
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	componentDidMount(){
		this.props.setThemeHelper(this.props.ciq)
	}
	openMenu(){
		this.setState({
			menuOpen: true
		});
	}
	closeMenu(){
		this.setState({
			menuOpen: false
		});
	}
	render(){
		let options = this.props.themeList.map((theme, i) => {
			return (<menu-option key={'theme'+i} className='option' onClick={this.props.changeTheme.bind(this, theme)}>{theme.name}</menu-option>)
		});

		let menuDisplay = {
			display: this.state.menuOpen ? 'block' : 'none'
		};

		return (
			<span>
				<ThemeModal {...this.props} />
				<menu-select id='themeSelect' onClick={this.closeMenu} onMouseOver={this.openMenu} onMouseOut={this.closeMenu}>
					<span className='title'>Select Theme</span>
					<menu-select-options style={menuDisplay}>
						{options}
					</menu-select-options>
				</menu-select>
			</span>
		)
	}
}

export default ThemeUI