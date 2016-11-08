var StudyModal = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            studyHelper: {}
        }
    },
    open(studyHelper) {
        this.setState({
            open: true,
            studyHelper: studyHelper
        });
    },
    render: function() {
        if (!this.state.open) return <div></div>
        return (

            <div id="studyDialog">
            <div className="content">
                <div className="heading">{this.studyHelper ? this.studyHelper.Name : ""}</div>
                <div id="inputs">
                   
                </div>
                <div id="outputs">
                   
                </div>
                <div id="parameters">
                   
                </div>
                <button className="largeBtn">Save</button>
            </div>
        </div>

        )


    }
});



module.exports = StudyModal;