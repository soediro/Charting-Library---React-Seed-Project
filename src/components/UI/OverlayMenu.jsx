class OverlayMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            params: {},
            top: '',
            left: ''
        };
        this.bindCorrectContext();
    }
    bindCorrectContext(){
        this.clickHandler = this.clickHandler.bind(this);
    }
    toggleOverlay(params){
        var isOpen = !this.state.open;

        this.setState({
            open: isOpen,
            params: {},
            top: isOpen ? params.stx.cy + 'px' : '',
            left: isOpen ? params.stx.cx + 'px' : ''
        });
    }
    clickHandler(event){
        if(typeof this.props.onClick === 'function') {
            this.props.onClick(event, this.state.params);
        }
    }
    render() {
        if (!this.state.open) { return <span></span>; }
        var style = {
            top: this.state.top,
            left: this.state.left
        };
        return (
            <span className="overlayMenu" style={style}>
                <div className="edit" onClick={this.clickHandler('edit')}>
                    Edit settings...
                </div>
                <div className="delete" onClick={this.clickHandler('delete')}>
                    Delete study
                </div>
            </span>
        );
    }
}

module.exports = OverlayMenu;