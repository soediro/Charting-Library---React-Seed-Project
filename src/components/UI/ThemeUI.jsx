//components
import ThemeModal from '../Modals/ThemeModal';

class ThemeUI extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.setThemeHelper(this.props.ciq)
	}
	render(){
		let options = this.props.themeList.map((theme, i) => {
			return (<menu-option key={'theme'+i} className='option' onClick={this.props.changeTheme.bind(this, theme)}>{theme.name}</menu-option>)
		})

		return (
			<span>
				<ThemeModal {...this.props} />
				<menu-select id='themeSelect'>
					<span className='title'>Select Theme</span>
					<menu-select-options>
						{options}
					</menu-select-options>
				</menu-select>
			</span>
		)
	}
}

export default ThemeUI