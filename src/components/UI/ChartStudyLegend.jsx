import PropTypes from 'prop-types';

class ChartStudyLegend extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.removeStudy = this.removeStudy.bind(this);
        this.editStudy = this.editStudy.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount(){
        if (this.props.ciq !== null){
            this.props.ciq.append('panelClose', this.props.syncStudies);
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.ciq !== null){
            
            this.setState({
                open: false
            });
        }
    }
    editStudy(study){
        this.props.ciq.callbacks.studyPanelEdit({stx: this.props.ciq, sd: study, inputs: study.inputs, outputs: study.outputs, parameters: study.parameters});
        this.setState({
            open: false
        });
    }
    removeStudy(study){
        this.props.ciq.remove('panelClose');
        this.props.removeStudy({ stx: this.props.ciq, sd: study, inputs: study.inputs, outputs: study.outputs, parameters: study.parameters });
    }
    open(delay) {
        if (delay) {
            setTimeout(() => {
                this.setState({
                    open: true
                });
            }, 500);
        } else {
            this.setState({
                open: true
            });
        }
    }
    close(delay) {
        if (delay) {
            setTimeout(() => {
                this.setState({
                    open: false
                });
            }, 500);
        } else {
            this.setState({
                open: false
            });
        }
    }
    render(){
        if (this.props.ciq === null || (this.props.ciq.hasOwnProperty('overlays') && Object.keys(this.props.ciq.overlays).length === 0)) { return (<div></div>); }
        let studies = Object.keys(this.props.ciq.overlays).map((key, i) => {
            let study = this.props.ciq.overlays[key];
            return (
                <span key={i} className='cq-item'>
                    <span className='cq-label'>{key}</span>
                    <span className='ciq-edit' onClick={this.editStudy.bind(this, study)}></span>
                    <div className='cq-legend-close cq-overlays' onClick={this.removeStudy.bind(this, study)} />
                </span>
            );
        });

        let display = { display: 'none' };
        if (this.state.open) { display.display = 'inline-block'; }
        
        return (
            <div className='cq-study-legend cq-overlays'>
                <span className='study-overlays-legend cq-night' onMouseOver={this.open.bind(this, true)}>Overlays<span className={this.state.open ? 'cq-overlay-icon open' : 'cq-overlay-icon'}></span></span>
                <div className='legend-content' onMouseOver={this.open} onMouseOut={this.close} style={display}>
                    {studies}                    
                </div>
            </div>
        );
    }
}

export default ChartStudyLegend;