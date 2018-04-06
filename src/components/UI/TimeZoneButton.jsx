import React from 'react'
import TimeZone from '../Modals/TimezoneModal';

const TimeZoneButton = (props) => {
	return (
		<span><TimeZone {...props} /><button className="timezone-btn" onClick={props.toggleTimezoneModal} /></span>
	)
}

export default TimeZoneButton
