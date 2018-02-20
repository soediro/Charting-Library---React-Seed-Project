import ChartSymbol from './UI/ChartSymbol'
import Comparison from './UI/Comparison'
import Periodicity from './UI/Periodicity'
import ChartTypes from './UI/ChartTypes'
import Crosshairs from './UI/Crosshairs'
import TimeZoneButton from './UI/TimeZoneButton'
import DrawingToolbarButton from './UI/DrawingToolbarButton'
import ShareChartModal from './Modals/ShareChartModal';

//redux components
import ThemeUIContainer from '../containers/themeUIContainer'
import StudyUIContainer from '../containers/studyContainer'

const UI = (props) => {
	return (
		<ciq-UI-Wrapper>
			{
				props.ciq!==null
					?
				<nav className="ciq-nav">
					<div className="left">
						<ChartSymbol {...props} />
						<Comparison {...props} />
					</div>
					<div className="right">
						<Periodicity {...props} />
						<ChartTypes {...props} />
						<StudyUIContainer ciq={props.ciq} {...props} />
						<ThemeUIContainer ciq={props.ciq} {...props} />
						<Crosshairs {...props} />
						<TimeZoneButton {...props} />
						<DrawingToolbarButton {...props} />
            			<ShareChartModal {...props} />
					</div>
				</nav>
					:
				<div></div>
			}
		</ciq-UI-Wrapper>
	)
}

export default UI
