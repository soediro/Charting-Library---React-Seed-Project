import configs from "../../configs/ui.js"
import TimeZone from "./timezoneModal"
import ThemeModal from "./themeModal"
import StudyModal from "./studyModal"

var UI = React.createClass({
    getInitialState: function() {
        return {
            ciq: null
        }
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function() {
        return (
            <div>
               <div className="">
              <StudyUI ciq={this.state.ciq}/>
             <ThemeUI ciq={this.state.ciq} />
               <TimeZoneButton ciq={this.state.ciq}/>
              </div>
              <ChartSymbol ciq={this.state.ciq}/>
              <Periodicity  ciq={this.state.ciq}/>
              <ChartTypes ciq={ this.state.ciq } />
              <Crosshairs  ciq={this.state.ciq}/>
              <Comparison  ciq={this.state.ciq}/>
            </div>



        )


    }
});

var StudyUI = React.createClass({
    getInitialState: function() {
        return {
            ciq: null
        }
    },
    componentWillMount(){

    },
    addStudy(study) {
       CIQ.Studies.addStudy(this.state.ciq,
           study);

    },
    openModal(params) {
        this.refs.studyModal.open(params);
    },
    componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.ciq) {
              function closure(fc){
            return function(){
                fc.apply(self, arguments);
            };
        }
         nextProps.ciq.callbacks.studyOverlayEdit = closure(self.openModal);
        nextProps.ciq.callbacks.studyPanelEdit = closure(self.openModal);
            this.setState({
                ciq: nextProps.ciq
            })
        }

    },
    render: function() {
        var self = this;
        var studies = Object.keys(CIQ.Studies.studyLibrary).map(function(study, index) {
            return <div key={"study" + index} className="option" onClick={function() {
                    self.addStudy(study);
                }}><span>{study}</span></div>

        })
        return (

            <span >
             <StudyModal ref="studyModal"/>
             <span id="studySelect"> 
                <span>Add Study</span>
                <div  className="menu-hover">
               {studies}
                </div>
                </span>
              </span>
        )
    }
});

var TimeZoneButton = React.createClass({
    getInitialState: function() {
        return {
            ciq: null
        }
    },
    onClick() {
        this.refs.modal.toggle();

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function() {
        var self = this;
        return (
            <span style={{
                display: "inline-block"
            }}><TimeZone ref ="modal" ciq={this.state.ciq}/> <button onClick={this.onClick}>Select Timezone</button></span>
        )
    }
});

var ChartSymbol = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            symbol: "AAPL"
        }
    },
    onOptionClick() {
        if (!this.state.ciq || !this.state.symbol) return;
        this.state.ciq.newChart(this.state.symbol);

    },
    onChange(event) {
        this.setState({
            symbol: event.target.value
        })
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function() {
        var self = this;
        return (

            <span> <input id="symbolInput" type="text" defaultValue= {this.state.symbol} onChange={ function(event) {
                self.onChange(event.nativeEvent);
            }} ></input><button onClick={this.onOptionClick}>Set Symbol</button></span>


        )
    }
});

var Periodicity = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            activeOption: null
        }
    },
    onOptionClick(period, interval, index) {
        if (!this.state.ciq) return;
        this.state.ciq.setPeriodicityV2(period, interval);
        this.setState({
            activeOption: configs.periodicity.options[index]
        })

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout)
            });
        }
    },
    getCurrentOption(layout) {
        for (var i = 0; i < configs.periodicity.options.length; i++) {
            var option = configs.periodicity.options[i];
            if (layout.interval === option.interval && layout.period === option.periodicity) {
                return option;
            }
        }
    },
    render: function() {
        var self = this;

        var options = configs.periodicity.options.map(function(item, index) {
            return <div key={"period" + index} className="option" onClick={ function() {
                    self.onOptionClick(item.period, item.interval, index);
                }}><span>{ item.label }</span></div>
        })

        return (

            <div id="periodicitySelect">
              <span>{ this.state.activeOption ? this.state.activeOption.label : null}</span>
              <div className="menu-hover">
                { options }
              </div>
            </div>
        )
    }
});

var ChartTypes = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            activeOption: null
        }
    },
    onOptionClick(type, index) {
        if (!this.state.ciq) return;
        if ((type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type) || type.type == 'heikinashi') {
            this.state.ciq.setChartType('candle');
            this.state.ciq.setAggregationType(type.type);
        } else {
            this.state.ciq.setChartType(type.type);
        }
        this.setState({
            activeOption: configs.chartTypes.types[index]
        })

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout)
            });
        }
    },
    getCurrentOption(layout) {
        for (var i = 0; i < configs.chartTypes.types.length; i++) {
            var option = configs.chartTypes.types[i];
            if (layout.chartType === option.type) {
                return option;
            }
        }
        return configs.chartTypes.types[0];
    },
    render: function() {
        var self = this;
        var options = configs.chartTypes.types.map(function(item, index) {
            return <div key={"type" + index} className="option" onClick={ function() {
                    self.onOptionClick(item, index);
                }}><span>{ item.label }</span></div>
        })

        return (

            <div id="chartTypeSelect">
              <span>{ this.state.activeOption ? this.state.activeOption.label : this.state.activeOption }</span>
              <div className="menu-hover">
                { options }
              </div>
            </div>


        )
    }
});
var Comparison = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            symbol: null
        }
    },
    compareChange(event) {
        this.setState({
            symbol: event.target.value
        })
    },
    onOptionClick() {
        if (!this.state.ciq) return;
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        this.state.ciq.addSeries(this.state.symbol, {
            isComparison: true,
            color: getRandomColor(),
            data: {
                useDefaultQuoteFeed: true
            }
        });


    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function() {
        var self = this;


        return (

            <span> <input onChange={ function(event) {
                self.compareChange(event.nativeEvent);
            }} id="symbolCompareInput" type="text" ></input><button >Add Comparison</button></span>


        )
    }
});

var Crosshairs = React.createClass({
    getInitialState: function() {
        return {
            ciq: null
        }
    },
    onClick() {
        if (!this.state.ciq) return;
        this.state.ciq.layout.crosshair = !this.state.ciq.layout.crosshair;

    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },
    render: function() {
        var self = this;
        return (
            <span> <button onClick={ this.onClick }>Crosshairs</button></span>
        )
    }
});

var ThemeUI = React.createClass({
    getInitialState: function() {
        return {
            themeList: [{
                "name": "+ New Theme"
            }],
            themeHelper: null
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
        });
    },
    themeSelect(theme) {
        if (theme.name === "+ New Theme") {
            return this.openThemeModal();
        }
        this.updateTheme(theme.settings);
    },
    openThemeModal() {
        this.refs.themeModal.openDialog(this.addTheme);
    },
    addTheme(theme, themeName) {
        this.state.themeList.push({
            name: themeName,
            settings: theme
        })
        this.setState({
            themeList: this.state.themeList
        })
        this.updateTheme(theme);
    },
    updateTheme(theme) {
        var c = CIQ.clone(theme);
        this.state.themeHelper.settings = c;
        this.state.themeHelper.update();
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            this.setThemeHelper(nextProps.ciq);
        }

    },
    render: function() {
        var self = this;
        var options = this.state.themeList.map(function(theme, index) {
            return <div key={"theme" + index} className="option" onClick={function() {
                    self.themeSelect(theme)
                }} ><span>{theme.name}</span></div>
        })
        return (
            <div id="themeSelect">
              <ThemeModal  ref="themeModal" themeHelper={this.state.themeHelper ? this.state.themeHelper : null}/>

                <span>Select Theme</span>
                <div className="menu-hover">
                  {options}
                </div>
              </div>


        )


    }
});


module.exports = UI;
