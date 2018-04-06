//modules
import { connect } from 'react-redux'

//actions
import { setThemeHelper,
         changeTheme,
         updateTheme,
         saveTheme,
         toggleThemeEditor,
         deleteTheme,
         restoreThemes } from '../actions/themeActions'

//components
import ThemeUI from '../components/UI/ThemeUI'

const mapStateToProps = (state) => {
    return {
        themeHelper: state.theme.themeHelper,
        themeList: state.theme.themeList,
        showEditModal: state.theme.showEditModal,
				currentThemeSettings: state.theme.currentThemeSettings,
				currentThemeName: state.theme.currentThemeName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setThemeHelper: (ciq) => {
            dispatch(setThemeHelper(ciq))
        },
        changeTheme: (theme) => {
            dispatch(changeTheme(theme))
        },
        updateTheme: (color, swatch) => {
            dispatch(updateTheme(color, swatch))
        },
        saveTheme: (name, theme) => {
            dispatch(saveTheme(name, theme))
        },
        toggleThemeEditor: (theme) => {
            dispatch(toggleThemeEditor(theme))
        },
        deleteTheme: (theme) => {
            dispatch(deleteTheme(theme))
        },
        restoreThemes: () => {
            dispatch(restoreThemes())
        }
    }
}

const ThemeUIContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemeUI)

export default ThemeUIContainer
