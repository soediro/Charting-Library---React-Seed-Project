//components
import OverlayMenu from './OverlayMenu';
import StudyModal from '../Modals/StudyModal/StudyModal';

const StudyUI = (props) => {
	let tempStudies = [];
	Object.keys(props.studyList).map((key, i) => {
		if(props.studyList.hasOwnProperty(key)){
			tempStudies.push(props.studyList[key])
		}
	})
	tempStudies.sort((a, b) => {
		if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
		else if (b.name.toLowerCase() > a.name.toLowerCase()) return -1
		return 0
	})

	let studies = tempStudies.map((study, i) => {
		return (<menu-option key={'study'+i} onClick={props.addStudy.bind(this, props.ciq, study)}><span>{study.name}</span></menu-option>)
	})

	props.ciq.callbacks.studyOverlayEdit = props.toggleOverlay
	props.ciq.callbacks.studyPanelEdit = props.openStudyModal

	return (
		<span>
			<OverlayMenu {...props} />
			<StudyModal {...props} />

			<menu-select id='studySelect'>
				<span className='title'>Studies</span>
				<menu-select-options className="ps-container">
					{studies}
				</menu-select-options>
			</menu-select>
		</span>
	)
}

export default StudyUI