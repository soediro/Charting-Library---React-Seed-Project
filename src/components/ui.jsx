
var UI = React.createClass({
    getInitialState: function() {
        return {
        }
    },
    render: function() {
        return (

            <div className="">
              <div id="studySelect">
                <span>Add Study</span>
                <div className="menu-hover">
                  <div className="option"><span></span></div>
                </div>
              </div>
              <div id="themeSelect">
                <span>Select Theme</span>
                <div className="menu-hover">
                  <div className="option"><span></span></div>
                </div>
              </div>
              <button>Select Timezone</button>
            </div>

        )


    }
});
//ng-repeat="theme in cqNgUi.themes" ng-click="cqNgUi.handleThemeSelect(theme)"
//ng-repeat="study in cqNgUi.studies.list | orderBy:study" ng-click="cqNgUi.launchStudyDialog(study)"
//ng-click="cqNgUi.launchTimezoneDialog()"
module.exports = UI;
