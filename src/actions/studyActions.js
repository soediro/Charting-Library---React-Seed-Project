import createTypes from 'redux-create-action-types'

/*
 * action types
 */
const Types = createTypes(
    'SET_STUDY_HELPER',
    'TOGGLE_STUDY_MODAL',
    'TOGGLE_STUDY_OVERLAY',
    'ADD_STUDY',
    'REMOVE_STUDY'
)

export default Types

/*
 * action creators
 */

export function setStudyHelper(helper){
    return { type: 'SET_STUDY_HELPER', helper: helper }
}

export function toggleOverlay(params){
    return { type: 'TOGGLE_STUDY_OVERLAY', params: params }
}

export function toggleStudyModal(params){
    return { type: 'TOGGLE_STUDY_MODAL', params: params }
}

export function addStudy(ciq, study){
    return { type: 'ADD_STUDY', ciq: ciq, study: study }
}

export function removeStudy(study){
    return { type: 'REMOVE_STUDY', study: study }
}