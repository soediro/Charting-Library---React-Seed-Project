//components
import ThemeModal from '../Modals/ThemeModal';
import MenuSelect from '../shared/MenuSelect';

class ThemeUI extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.restoreThemes();
	}
	render(){
		return (
			<span>
				<ThemeModal {...this.props} />
	
				<MenuSelect hasButtons={true}
							options={this.props.themeList}
							keyName='theme'
							name='name'
							handleOptionSelect={this.props.changeTheme}
							menuId='themeSelect'
							title='Select Theme'
							noButtons={['Night', '+ New Theme']}
							editItem={this.props.toggleThemeEditor}
							deleteItem={this.props.deleteTheme} />
			</span>
		);
	}
}

export default ThemeUI
