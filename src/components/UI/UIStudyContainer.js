import PropTypes from 'prop-types';

//components
import StudyUI from './StudyUI';
import ChartStudyLegend from './ChartStudyLegend';
import StudyLegend from './StudyLegend';

const UIStudyContainer = (props) => {
    switch (props.uiType){
        case 'menu':
            return (
                <StudyUI ciq={props.ciq} {...props} />
            );
        case 'legend_chart':
            return (
                <ChartStudyLegend {...props} />
            );
        case 'legend':
            return (
                <StudyLegend {...props} />
            );
        default:
            return (
                <div></div>
            );
    }
}

UIStudyContainer.defaultProps = {
    uiType: 'menu',
    ciq: {}
};

UIStudyContainer.propTypes = {
    uiType: PropTypes.string.isRequired,
    ciq: PropTypes.object
};

export default UIStudyContainer;