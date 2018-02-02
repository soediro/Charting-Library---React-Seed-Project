//modules
import { connect } from 'react-redux'

//actions
import { setThemeHelper,
         changeTheme,
         updateTheme,
         saveTheme,
         toggleThemeEditor,
         deleteTheme } from '../actions/themeActions'

//components
import ThemeUI from '../components/UI/ThemeUI'

const mapStateToProps = (state, props) => {
    return {
        themeHelper: state.theme.themeHelper,
        themeList: state.theme.themeList,
        showEditModal: state.theme.showEditModal,
        currentThemeSettings: state.theme.currentThemeSettings
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
        toggleThemeEditor: () => {
            dispatch(toggleThemeEditor())
        },
        deleteTheme: (theme) => {
            dispatch(deleteTheme(theme))
        }
    }
}

const ThemeUIContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ThemeUI)

export default ThemeUIContainer
