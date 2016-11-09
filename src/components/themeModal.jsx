
import ColorPicker from "./colorPicker"

var ThemeModal = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            themeHelper: null,
            themeName: null
        }
    },
    setThemeHelper(ciq) {

        if (!ciq) return;
        var themeHelper = new CIQ.ThemeHelper({
            'stx': ciq
        });
        var self = this;
        this.setState({
            ciq: ciq,
            themeHelper: themeHelper,
        }, function() {
            self.loadDefaultColors();
            self.forceUpdate();
        });
    },
    loadDefaultColors() {
        var self = this;
        options.map(function(section, index) {
            var swatches = section.swatches.map(function(swatch, index) {
                self.updateTheme(null, swatch.item, swatch);
            })
        })
    },
    openDialog: function(callback) {
        this.setState({
            open: true,
            callback: callback
        });
    },
    closeDialog: function() {
        this.setState({
            open: false
        });
    },
    componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.themeHelper) {
            this.setState({
                themeHelper: nextProps.themeHelper
            }, function() {
                self.loadDefaultColors();
                self.forceUpdate();
            });
        }

    },
    openColorPicker: function(swatch, target) {
        var self = this;
        var targetBounds = target.getBoundingClientRect();
        this.refs.colorPicker.openDialog(targetBounds.top, targetBounds.left, function(color) {
            self.updateTheme(color, swatch.item, swatch)
            self.forceUpdate();
        })

    },
    saveSettings() {
        if (!this.state.themeName) return;
        this.closeDialog();
        if (this.state.callback) this.state.callback(this.state.themeHelper.settings, this.state.themeName)
    },
    updateTheme(color, item, swatch) {
        switch (item) {
        case 'candleUp':

            if (color) {
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.color = CIQ.hexToRgba('#' + color);
            }
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.color;
            break;
        case 'candleDown':
            if (color)
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.color ;
            break;
        case 'wickUp':
            if (color)
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.wick = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.wick ;
            break;
        case 'wickDown':
            if (color)
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.wick = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.wick;
            break;
        case 'borderUp':
            if (color)
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.border = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.border;
            break;
        case 'borderDown':
            if (color)
                this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.border = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.border;
            break;
        case 'lineBar':
            if (color)
                this.state.themeHelper.settings.chartTypes["Line"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Line"].color;
            break;
        case 'mountain':
            if (color)
                this.state.themeHelper.settings.chartTypes["Mountain"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chartTypes["Mountain"].color;
            break;
        case 'chartBackground':
            if (color)
                this.state.themeHelper.settings.chart["Background"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chart["Background"].color;
            break;
        case 'dividers':
            if (color)
                this.state.themeHelper.settings.chart["Grid Dividers"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chart["Grid Dividers"].color;
            break;
        case 'lines':
            if (color)
                this.state.themeHelper.settings.chart["Grid Lines"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chart["Grid Lines"].color;
            break;
        case 'axis': if (color)
                this.state.themeHelper.settings.chart["Axis Text"].color = CIQ.hexToRgba('#' + color);
            swatch.color = this.state.themeHelper.settings.chart["Axis Text"].color ;
            break;
        }
    },
    updateThemeName(event) {
        this.setState({
            themeName: event.target.value
        });
    },
    render: function() {
        var self = this;
        if (!this.state.open) return <div></div>
        var sections = options.map(function(section, sectionindex) {

            var swatches = section.swatches.map(function(swatch, index) {
                return <div key={"swatch" + index}style={ {
                        backgroundColor: swatch.color
                    }} className={"color-picker-swatch " + swatch.class} onClick={ function(event) {
                        self.openColorPicker(swatch, event.target)
                    }}></div>
            })

            return <div key={"section" + sectionindex} className={ section.class }>
                     <div className="theme-field-name">
                       { section.section }
                     </div>
                     { swatches }
                   </div>
        })
        return (
            <div id="themeDialog">
            <ColorPicker ref="colorPicker"/>
              <div className="content">
                <div className="heading">Custom Theme</div>
                { sections }
                <div className="theme-save">
                  <input ref ="themeName" type="text" onChange={this.updateThemeName}></input>
                  <button className="largeBtn" onClick={this.saveSettings}>Save</button>
                  <button className="largeBtn" onClick={this.closeDialog}>Close</button>
                </div>
              </div>
            </div>
        )

    }
})


var options = [
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

module.exports = ThemeModal;



