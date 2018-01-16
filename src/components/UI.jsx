import ChartSymbol from './UI/ChartSymbol'
import Comparison from './UI/Comparison'
import Periodicity from './UI/Periodicity'
import ChartTypes from './UI/ChartTypes'
import StudyUI from '../containers/studyContainer'
import ThemeUI from './UI/ThemeUI'
import Crosshairs from './UI/Crosshairs'
import TimeZoneButton from './UI/TimeZoneButton'
import DrawingToolbarButton from './UI/DrawingToolbarButton'
import { Actions } from "../stores/ChartStores"

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
						<StudyUI ciq={props.ciq} {...props} />
						<ThemeUI {...props} />
						<Crosshairs {...props} />
						<TimeZoneButton {...props} />
						<DrawingToolbarButton {...props} />
					</div>
				</nav>
					:
				<div></div>
			}
		</ciq-UI-Wrapper>
	)
}

export default UI
