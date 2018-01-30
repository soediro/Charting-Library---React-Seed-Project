//components
import OverlayMenu from './OverlayMenu';
import StudyModal from '../Modals/StudyModal/StudyModal';

class StudyUI extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			menuOpen: false
		};
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}
	openMenu(){
		this.setState({
			menuOpen: true
		});
	}
	closeMenu(){
		this.setState({
			menuOpen: false
		})
	}
	render(){
		let tempStudies = [];
	
		Object.keys(this.props.studyList).map((key) => {
			if(this.props.studyList.hasOwnProperty(key)){
				tempStudies.push(this.props.studyList[key])
			}
		});

		tempStudies.sort((a, b) => {
			if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
			else if (b.name.toLowerCase() > a.name.toLowerCase()) { return -1; }
			else { return 0; }
		});

		let studies = tempStudies.map((study, i) => {
			return (<menu-option key={'study'+i} onClick={this.props.addStudy.bind(this, this.props.ciq, study)}><span>{study.name}</span></menu-option>);
		});

		this.props.ciq.callbacks.studyOverlayEdit = this.props.toggleOverlay;
		this.props.ciq.callbacks.studyPanelEdit = this.props.openStudyModal;

		let menuDisplay = {
			display: this.state.menuOpen ? 'block' : 'none'
		};

		return (
			<span>
				<OverlayMenu {...this.props} />
				<StudyModal {...this.props} />

				<menu-select id='studySelect' onMouseOver={this.openMenu} onMouseOut={this.closeMenu} onClick={this.closeMenu}>
					<span className='title'>Studies</span>
					<menu-select-options className="ps-container" style={menuDisplay}>
						{studies}
					</menu-select-options>
				</menu-select>
			</span>
		)
	}
}

export default StudyUI