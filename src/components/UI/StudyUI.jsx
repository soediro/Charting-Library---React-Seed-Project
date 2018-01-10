//components
import OverlayMenu from './OverlayMenu';
import StudyModal from '../Modals/StudyModal';

class StudyUI extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            showStudyDialog: false,
			showOverlayDialog: false,
			currentStudyParams: null,
			overlayTop: '',
			overlayLeft: '',
			studies: CIQ.Studies.studyLibrary
		};
		this.props.ciq.callbacks.studyOverlayEdit = this.toggleOverlayModal.bind(this)
		this.props.ciq.callbacks.studyPanelEdit = this.toggleStudyModal.bind(this)
        this.bindCorrectContext();
    }
    bindCorrectContext(){
		this.toggleStudyModal = this.toggleStudyModal.bind(this)
		this.toggleOverlayModal = this.toggleOverlayModal.bind(this)
		this.removeStudy = this.removeStudy.bind(this)
	}
	toggleStudyModal(){
		this.setState({
			showStudyDialog: !this.state.showStudyDialog,
			showOverlayDialog: !this.state.showStudyDialog
		})
	}
	toggleOverlayModal(params){
		let flipOverlay = !this.state.showOverlayDialog;
		this.setState({
			showOverlayDialog: flipOverlay,
			overlayTop: flipOverlay ? this.props.ciq.cy + 'px' : '',
			overlayLeft: flipOverlay ? this.props.ciq.cx + 'px' : '',
			currentStudyParams: flipOverlay ? params : null
		})
	}
	addStudy(study) {
		var studyLookup = {};
		for (var libraryEntry in this.state.studies) {
			studyLookup[this.state.studies[libraryEntry].name] = libraryEntry;
		}
		this.props.addStudy(studyLookup[study])
	}
	removeStudy(params) {
		CIQ.Studies.removeStudy(this.state.currentStudyParams.stx, this.state.currentStudyParams.sd);
		this.setState({
			currentStudyParams: null,
			showOverlayDialog: false
		})
	}
	getStudyList() {
		var tempStudies = [];
		for (var study in this.state.studies) {
			if (this.state.studies.hasOwnProperty(study)) {
				tempStudies.push(this.state.studies[study].name);
			}
		}
		return tempStudies.sort();
	}
	render() {
		let studies = this.getStudyList().map((study, index) => {
			return (<menu-option key={"study" + index} onClick={this.addStudy.bind(this, study)}><span>{study}</span></menu-option>);
		})

		return (
			<span>
				<OverlayMenu open={this.state.showOverlayDialog} 
							 top={this.state.overlayTop}
							 left={this.state.overlayLeft} 
							 edit={this.toggleStudyModal}
							 delete={this.removeStudy} />

				<StudyModal open={this.state.showStudyDialog}
							closeModal={this.toggleStudyModal} 
							params={this.state.currentStudyParams} />
							
				<menu-select id="studySelect">
					<span className="title">Studies</span>
					<menu-select-options className="ps-container">
						{studies}
					</menu-select-options>
				</menu-select>
			</span>
		)
	}
}

export default StudyUI