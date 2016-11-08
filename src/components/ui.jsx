import ThemeModal from "./themeModal"
import StudyModal from "./studyModal"

var UI = React.createClass({
    getInitialState: function() {
        return {
        }
    },
    render: function() {
        return (

            <div className="">
              <StudyUI/>
             <ThemeUI ciq={this.props.ciq ? this.props.ciq : null} />
              <button>Select Timezone</button>
            </div>

        )


    }
});

var StudyUI = React.createClass({
    getInitialState: function() {
        return {
            ciq: null,
            studyHelper: null
        }
    },
    addStudy(study) {
        var studyHelper = CIQ.Studies.DialogHelper({
            name: study,
            stx: this.state.ciq
        });

        ciq.callbacks.studyOverlayEdit = this.ctrl.openModal;
        ciq.callbacks.studyPanelEdit = this.openModal;
        CIQ.Studies.addStudy(this.state.ciq,
            ctrl.studyHelper.name,
            ctrl.studyHelper.libraryEntry.inputs,
            ctrl.studyHelper.libraryEntry.outputs,
            ctrl.studyHelper.libraryEntry.parameters);
        this.setState({
            studyHelper: studyHelper
        })

    },
    openModal() {
        this.refs.studyModal.open();
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
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

            <div id="studySelect">
             <StudyModal ref="studyModal"/>
                <span>Add Study</span>
                <div className="menu-hover">
               {studies}
                </div>
              </div>

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

//ng-repeat="theme in cqNgUi.themes" ng-click="cqNgUi.handleThemeSelect(theme)"
//ng-repeat="study in cqNgUi.studies.list | orderBy:study" ng-click="cqNgUi.launchStudyDialog(study)"
//ng-click="cqNgUi.launchTimezoneDialog()"
module.exports = UI;
