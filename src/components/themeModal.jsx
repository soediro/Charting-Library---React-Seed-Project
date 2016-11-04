
import ColorPicker from "./colorPicker"

var options = [
    {
        section: "Candle Color",
        class: "color",
        swatches: [{
            class: "colorDown",
            color: "",
            item: "candleDown"
        }, {
            class: "colorUp",
            color: "",
            item: "candleUp"
        }]
    },
    {
        section: "Candle Wick",
        class: "wick",
        swatches: [{
            class: "wickDown",
            color: "",
            item: "wickDown"
        }, {
            class: "wickUp",
            color: "",
            item: "wickUp"
        }]
    },
    {
        section: "Candle Border",
        class: "border",
        swatches: [{
            class: "borderDown",
            color: "",
            item: "borderDown"
        }, {
            class: "borderDown",
            color: "",
            item: "borderDown"
        }]
    },
    {
        section: "Line/Bar Chart",
        class: "lineBarChart",
        swatches: [{
            class: "lineBar",
            color: "",
            item: "lineBar"
        }]
    },
    {
        section: "Mountain Color",
        class: "mountainChart",
        swatches: [{
            class: "mountain",
            color: "",
            item: "mountain"
        }]
    },
    {
        section: "Background",
        class: "background",
        swatches: [{
            class: "chartBackground",
            color: "",
            item: "chartBackground"
        }]
    },
    {
        section: "Grid Lines",
        class: "gridLines",
        swatches: [{
            class: "lines",
            color: "",
            item: "lines"
        }]
    },
    {
        section: "Date Dividers",
        class: "dateDividers",
        swatches: [{
            class: "dividers",
            color: "",
            item: "dividers"
        }]
    },
    {
        section: "Axis Text",
        class: "axisText",
        swatches: [{
            class: "axis",
            color: "",
            item: "axis"
        }]
    }
]


var ThemeModal = React.createClass({
    getInitialState: function() {
        return {
            caller: false,
            open: true
        }
    },
    setColor: function(color) {
        console.log("color", color);

    },
    openDialog: function() {
        this.setState({
            open: true
        });
    },
    closeDialog: function() {
        this.setState({
            open: false
        });
    },
    openColorPicker: function(item) {},

    render: function() {
        var self = this;
        if (!this.state.open) return <div></div>
        var sections = options.map(function(section, index) {

            var swatches = section.swatches.map(function(swatch, index) {
                return <div style={ { backgroundColor: swatch.color } } className={ "color-picker-swatch " + swatch.class } onClick={ function(){
                                                                                                                  			self.openColorPicker(swatch.item)} }></div>
            })

            return <div className={ section.class }>
                     <div className="theme-field-name">
                       { section.section }
                     </div>
                     { swatches }
                   </div>
        })
        return (
            <div id="themeDialog">
              <div className="content">
                <div className="heading">Custom Theme</div>
                { sections }
                <div className="theme-save">
                  <input type="text"></input>
                  <button className="largeBtn">Save</button>
                  <button className="largeBtn">Close</button>
                </div>
              </div>
            </div>
        )

    }
})


module.exports = ThemeModal;




