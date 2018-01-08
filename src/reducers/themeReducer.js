//action types
import Types from '../actions/themeActions'

//create the default theme
let defaultTheme = {
    "name": "Default",
    "settings": {
        "chart": {
            "Axis Text": { "color": "rgba(197,199,201,1)" },
            "Background": { "color": "rgba(28,42,53,1)" },
            "Grid Dividers": { "color": "rgba(37,55,70,1)" },
            "Grid Lines": { "color": "rgba(33,50,63,1)" }
        },
        "chartTypes": {
            "Candle/Bar": {
                "down": { 
                    "border": "rgba(227,70,33,1)",
                    "color": "rgba(184,44,12,1)",
                    "wick": "rgba(0,0,0,1)" 
                },
                "up": {
                    "border": "rgba(184,222,168,1)",
                    "color": "rgba(140,193,118,1)",
                    "wick": "rgba(0,0,0,1)"
                },
                "Line": { "color": "rgba(0,0,0,1)" },
                "Mountain": { "color":"rgba(102,202,196,0.498039)" }
            }
        }
    }
}

let defaultSettings = [
	{
		section: "Candle Color",
		class: "color",
		swatches: [{
			class: "colorDown",
			color: "",
			chartType: "Candle/Bar",
			item: "candleDown"
		}, {
			class: "colorUp",
			color: "",
			chartType: "Candle/Bar",
			item: "candleUp"
		}]
	},
	{
		section: "Candle Wick",
		class: "wick",
		swatches: [{
			class: "wickDown",
			color: "",
			chartType: "Candle/Bar",
			item: "wickDown"
		}, {
			class: "wickUp",
			color: "",
			chartType: "Candle/Bar",
			item: "wickUp"
		}]
	},
	{
		section: "Candle Border",
		class: "border",
		swatches: [{
			class: "borderDown",
			color: "",
			chartType: "Candle/Bar",
			item: "borderDown"
		}, {
			class: "borderDown",
			color: "",
			chartType: "Candle/Bar",
			item: "borderDown"
		}]
	},
	{
		section: "Line/Bar Chart",
		class: "lineBarChart",
		swatches: [{
			class: "lineBar",
			color: "",
			chartType: "Line",
			item: "lineBar"
		}]
	},
	{
		section: "Mountain Color",
		class: "mountainChart",
		swatches: [{
			class: "mountain",
			color: "",
			chartType: "Mountain",
			item: "mountain"
		}]
	},
	{
		section: "Background",
		class: "background",
		swatches: [{
			class: "chartBackground",
			color: "",
			chart: "Background",
			item: "chartBackground"
		}]
	},
	{
		section: "Grid Lines",
		class: "gridLines",
		swatches: [{
			class: "lines",
			color: "",
			chart: "Grid Lines",
			item: "lines"
		}]
	},
	{
		section: "Date Dividers",
		class: "dateDividers",
		swatches: [{
			class: "dividers",
			color: "",
			chart: "Grid Dividers",

			item: "dividers"
		}]
	},
	{
		section: "Axis Text",
		class: "axisText",
		swatches: [{
			class: "axis",
			color: "",
			chart: "Axis Text",
			item: "axis"
		}]
	}
]

const initialState = {
    themeList: [defaultTheme, { "name": "+ New Theme" }],
    currentThemeSettings: defaultSettings,
    showEditModal: false,
    themeHelper: null
}

let newThemeSettings
const ThemeUI = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_HELPER:
            if(!action.ciq) return state
            let themeHelper = new CIQ.ThemeHelper({
                'stx': action.ciq
            })
            newThemeSettings = updateThemeSettings(themeHelper, state.currentThemeSettings)
            return Object.assign({}, state, {
                themeHelper: themeHelper,
                currentThemeSettings: newThemeSettings
            })
        case Types.CHANGE_THEME:
            if(action.theme.name.indexOf('+ New Theme')>-1){
                return Object.assign({}, state, {
                    showEditModal: true
                })
            } else {
                state.themeHelper.settings = CIQ.clone(action.theme)
                state.themeHelper.update()
            }
            return state
        case Types.UPDATE_THEME:
            newThemeSettings = updateThemeSettings(state.themeHelper, state.currentThemeSettings)
            return Object.assign({}, state, {
                currentThemeSettings: newThemeSettings
            })
        case Types.SAVE_THEME:
            let item = {
                name: action.name,
                settings: action.theme
            },
            endIndex = state.themeList.length-1,
            newThemeList = state.themeList.splice(endIndex, 0, item)

            return Object.assign({}, state, {
                themeList: newThemeList
            })
        case Types.TOGGLE_THEME_EDITOR:
            return Object.assign({}, state, {
                showEditModal: !state.showEditModal
            })
        default:
            return state
    }
}

export default ThemeUI

function updateThemeSettings(themeHelper, currentSettings, newParams){
    let settings = currentSettings.slice(),
    rgbaColor = newParams ? newParams.color : null

    console.log("oldSettings: ", settings, ' and rgbaColor: ', rgbaColor, ' and themeHelper: ', themeHelper)
    let newSettings = settings.map((setting) => {
        let newSetting = {
            section: setting.section,
            class: setting.class
        }, swatches = setting.swatches.map((swatch) => {
            let newSwatch = {
                class: swatch.class,
                item: swatch.item
            }

            if(swatch.hasOwnProperty('chart')){
                newSwatch.chart = swatch.chart
                if(rgbaColor) themeHelper.settings.chart[swatch.chart].color = rgbaColor
                newSwatch.color = themeHelper.settings.chart[swatch.chart].color
            }else if(swatch.hasOwnProperty('chartType')){
                newSwatch.chartType = swatch.chartType

                if(swatch.class.indexOf('Up')>-1 || swatch.class.indexOf('Down')>-1){
                    let capitalLetter = swatch.item.search(/(?=[A-Z])/),
                    direction = swatch.item.substring(capitalLetter).toLowerCase(),
                    item = swatch.item.substring(0, capitalLetter)
                    
                    if (item !== 'candle'){
                        if(rgbaColor) themeHelper.settings.chartTypes[swatch.chartType][direction][item] = rgbaColor
                        newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType][direction][item]
                    }else{
                        if(rgbaColor) themeHelper.settings.chartTypes[swatch.chartType][direction].color = rgbaColor
                        newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType][direction].color
                    }
                }else{
                    if(rgbaColor) themeHelper.settings.chartTypes[swatch.chartType].color = rgbaColor
                    newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType].color
                }
            }else{
                newSwatch.color = undefined
            }
            return newSwatch
        })
        newSetting.swatches = swatches
        return newSetting
    })

    console.log("newSettings: ", newSettings)
    return newSettings
}