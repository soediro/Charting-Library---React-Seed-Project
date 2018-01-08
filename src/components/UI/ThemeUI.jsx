//components
import ThemeModal from '../Modals/ThemeModal';

const ThemeUI = (props) => {
	let options = props.themeList.map((theme, i) => {
		return (<menu-option key={'theme'+i} className="option" onClick={props.changeTheme.bind(this, theme)}>{theme.name}</menu-option>)
	})

	return (
		<span>
			<ThemeModal {...props} />
			<menu-select id='themeSelect'>
				<span className='title'>Select Theme</span>
				<menu-select-options>
					{options}
				</menu-select-options>
			</menu-select>
		</span>
	)
}

export default ThemeUI