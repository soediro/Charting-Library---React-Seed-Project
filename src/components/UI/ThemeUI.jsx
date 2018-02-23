import React from 'react'
import ThemeModal from '../Modals/ThemeModal';
import MenuSelect from '../shared/MenuSelect';

const ThemeUI = (props) => {
	return (
		<span>
			<ThemeModal {...props} />

			<MenuSelect hasButtons={true}
						options={props.themeList}
						keyName='theme'
						name='name'
						handleOptionSelect={props.changeTheme}
						menuId='themeSelect'
						title='Select Theme'
						noButtons={['Night', '+ New Theme']}
						editItem={props.toggleThemeEditor}
						deleteItem={props.deleteTheme} />
		</span>
	);
}

export default ThemeUI
