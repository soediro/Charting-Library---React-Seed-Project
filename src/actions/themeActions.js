import createTypes from 'redux-create-action-types'

/*
 * action types
 */
const Types = createTypes(
    'SET_HELPER',
    'CHANGE_THEME',
    'SAVE_THEME',
    'UPDATE_THEME',
    'TOGGLE_THEME_EDITOR',
    'DELETE_THEME',
    'RESTORE_THEMES'
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

export function updateTheme(color, swatch){
    return { type: 'UPDATE_THEME', color: color, swatch: swatch }
}

export function saveTheme(name, theme){
    return { type: 'SAVE_THEME', name: name, theme: theme }
}

export function toggleThemeEditor(){
    return { type: 'TOGGLE_THEME_EDITOR' }
}

export function deleteTheme(theme){
    return { type: 'DELETE_THEME', theme: theme }
}

export function restoreThemes(){
    return { type: 'RESTORE_THEMES' }
}