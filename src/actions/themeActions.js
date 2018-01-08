import createTypes from 'redux-create-action-types'

/*
 * action types
 */
const Types = createTypes(
    'SET_HELPER',
    'CHANGE_THEME',
    'SAVE_THEME',
    'UPDATE_THEME',
    'TOGGLE_THEME_EDITOR'
)

export default Types

/*
 * action creators
 */

export function setThemeHelper(ciq){
    return { type: 'SET_HELPER', ciq: ciq }
}

export function changeTheme(theme){
    return { type: 'CHANGE_THEME', theme: theme }
}

export function updateTheme(swatch, color){
    return { type: 'UPDATE_THEME', swatch: swatch, color: color }
}

export function saveTheme(name, theme){
    return { type: 'SAVE_THEME', name: name, theme: theme }
}

export function toggleThemeEditor(){
    return { type: 'TOGGLE_THEME_EDITOR' }
}