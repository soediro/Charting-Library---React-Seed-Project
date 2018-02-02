//components
import ThemeModal from '../Modals/ThemeModal';
import MenuSelect from '../Menus/MenuSelectWithButtons';

const ThemeUI = (props) => {
	return (
		<span>
			<ThemeModal {...props} />

			<MenuSelect options={props.themeList} keyName='theme' name='name' handleOptionSelect={props.changeTheme} menuId='themeSelect' title='Select Theme' /> 
		</span>
	);
}

export default ThemeUI