import PropTypes from 'prop-types';

class StudyLegend extends React.Component{
    constructor(props){
        super(props);
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.clearStudies = this.clearStudies.bind(this);
        this.removeStudy = this.removeStudy.bind(this);
        this.editStudy = this.editStudy.bind(this);
    }
    clearStudies(){

    }
    removeStudy(){

    }
    editStudy(){

    }
    render(){
        let studies = Object.keys(this.props.legendItems).map((key, i) => {
            let study = this.props.legendItems[key];
            return (
                <span key={i} className='cq-item'>
                    <span className='cq-label' onClick={this.editStudy.bind(this, study)}>{key}</span>
                    <div className='cq-close' onClick={this.removeStudy.bind(this, study)} />
                </span>
            );
        });
        return (
            <div className='cq-study-legend'>
                <span className='cq-heading'>Current Studies</span>
                <div className='legend-content'>
                    {studies}
                </div>
                <div className='cq-placeholder'>
                    <button className='ciq-btn' onClick={this.clearStudies}><span className='legend-clear-all'>Clear All</span></button>
                </div>
            </div>
        );
    }
}

export default StudyLegend;