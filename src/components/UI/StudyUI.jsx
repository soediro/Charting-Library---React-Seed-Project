//components
import OverlayMenu from './OverlayMenu';
import StudyModal from '../StudyModal';

class StudyUI extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            studyDialogOpen: false,
            overlayDialogOpen: false,
            studies: CIQ.Studies.studyLibrary
        };
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.clickHandler = this.clickHandler.bind(this);
    }
	addStudy(study) {
		var studyLookup = {};
		for (var libraryEntry in this.state.studies) {
			studyLookup[studies[libraryEntry].name] = libraryEntry;
		}
		CIQ.Studies.addStudy(this.props.ciq, studyLookup[study]);
	}
	removeStudy(params) {
		CIQ.Studies.removeStudy(params.stx, params.sd);
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
	openModal(params) {
		this.refs.studyModal.open(params);
	}
	openDialog(params) {
		this.refs.overlayMenu.open(params);
	}

	clickHandler(event, params) {
		if (event === 'edit') {
			this.openModal(params);
		} else if (event === 'delete') {
			this.removeStudy(params);
		}
		this.refs.overlayMenu.close();
	}
	render() {
		var self = this;
		var studies = this.getStudyList().map(function (study, index) {
			return (<menu-option key={"study" + index} onClick={function () {
                    this.addStudy(study);
                }}><span>{study}</span></menu-option>
            );
		});
		return (
			<span>
				<OverlayMenu ref="overlayMenu" onClick={this.clickHandler} />
				<StudyModal ref="studyModal" />
				<menu-select id="studySelect">
					<span className="title">Studies</span>
					<menu-select-options className="ps-container">
						{studies}
					</menu-select-options>
				</menu-select>
			</span>
		);
	}
}

module.exports = StudyUI;