//action types
import Types from '../actions/themeActions'
import themeActions from '../actions/themeActions';

//create the default theme
let night = {
	"name": "Night",
	"className":"ciq-night"
}

let defaultSettings = [{
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
			class: "borderUp",
			color: "",
			chartType: "Candle/Bar",
			item: "borderUp"
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
    themeList: [night, { "name": "+ New Theme" }],
    currentThemeSettings: defaultSettings,
    currentThemeName: 'Default',
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
			if (action.theme.name.indexOf('+ New Theme') > -1) {
				return Object.assign({}, state, {
					showEditModal: true
				})
			} else {
				if (action.theme.settings) {
					state.themeHelper.settings = CIQ.clone(action.theme.settings);
					state.themeHelper.update();
				} else if (action.theme.className){
					$$$('body').className = action.theme.className
					var stx=state.themeHelper.params.stx;
					stx.styles={};
					stx.chart.container.style.backgroundColor="";
					if(stx.displayInitialized){
						stx.headsUpHR();
						stx.clearPixelCache();
						stx.updateListeners("theme");
						stx.draw();
					}
				}

			}
			return state
        case Types.UPDATE_THEME:
            newThemeSettings = updateThemeSettings(state.themeHelper, state.currentThemeSettings, {
                color: action.color,
                swatch: action.swatch
            })

            return Object.assign({}, state, {
                currentThemeSettings: newThemeSettings
            })
        case Types.SAVE_THEME:
            let item = {
                name: action.name,
                settings: action.theme
            },
            endIndex = state.themeList.length-1,
			newThemeList = state.themeList.slice(),
			existsIndex = -1;

			newThemeList.map((theme, i) => {
				if (theme.name === action.name){
					existsIndex = i;
				}
			});

			if (existsIndex > -1) { newThemeList.splice(existsIndex, 1, item); }
            else { newThemeList.splice(endIndex, 0, item); }

            state.themeHelper.settings = CIQ.clone(action.theme)
            state.themeHelper.update()

            return Object.assign({}, state, {
                currentThemeName: action.name,
                themeList: newThemeList,
                showEditModal: false
            })
        case Types.TOGGLE_THEME_EDITOR:
            return Object.assign({}, state, {
                showEditModal: !state.showEditModal
			})
		case Types.DELETE_THEME:
			let themeIndex = -1, themeName = action.theme.name;
			newThemeList = state.themeList.slice();

			newThemeList.map((theme, i) => {
				if (theme.name === action.theme.name){
					themeIndex = i;
				}
			})
            newThemeList.splice(themeIndex, 1)

			return Object.assign({}, state, {
				themeList: newThemeList,
				currentThemeName: themeName,
				showEditModal: false,
			})
        default:
            return state
    }
}

export default ThemeUI

function updateThemeSettings(themeHelper, currentSettings, newParams){
    let settings = currentSettings.slice(),
    rgbaColor = (newParams && newParams.color) ? CIQ.hexToRgba('#'+newParams.color) : null

    let newSettings = settings.map((setting) => {
        let newSetting = {
            section: setting.section,
            class: setting.class
        }, swatches = setting.swatches.map((swatch) => {
            let newSwatch = {
                class: swatch.class,
                item: swatch.item
            }, swatchNeedsNewColor = false

            if(newParams && newParams.swatch && newParams.swatch === swatch.class){
                swatchNeedsNewColor = true
            }

            if(swatch.hasOwnProperty('chart')){
                newSwatch.chart = swatch.chart
                if(rgbaColor && swatchNeedsNewColor) themeHelper.settings.chart[swatch.chart].color = rgbaColor
                newSwatch.color = themeHelper.settings.chart[swatch.chart].color
            }else if(swatch.hasOwnProperty('chartType')){
                newSwatch.chartType = swatch.chartType

                if(swatch.class.indexOf('Up')>-1 || swatch.class.indexOf('Down')>-1){
                    let capitalLetter = swatch.item.search(/(?=[A-Z])/),
                    direction = swatch.item.substring(capitalLetter).toLowerCase(),
                    item = swatch.item.substring(0, capitalLetter)

                    if (item !== 'candle'){
                        if(rgbaColor && swatchNeedsNewColor) themeHelper.settings.chartTypes[swatch.chartType][direction][item] = rgbaColor
                        newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType][direction][item] || undefined
                    }else{
                        if(rgbaColor && swatchNeedsNewColor) themeHelper.settings.chartTypes[swatch.chartType][direction].color = rgbaColor
                        newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType][direction].color || undefined
                    }
                }else{
                    if(rgbaColor && swatchNeedsNewColor) themeHelper.settings.chartTypes[swatch.chartType].color = rgbaColor
                    newSwatch.color = themeHelper.settings.chartTypes[swatch.chartType].color || undefined
                }
            }else{
                newSwatch.color = undefined
            }
            return newSwatch
        })
        newSetting.swatches = swatches
        return newSetting
    })

    return newSettings
}
