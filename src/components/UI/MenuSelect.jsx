class MenuSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu(open){
        this.setState({ menuOpen: open })
    }
    render(){
        let options = this.props.options.map((option, i) => {
            let onSelect = this.props.needsCiq ? this.props.handleOptionSelect.bind(this, this.props.ciq, option) : this.props.handleOptionSelect.bind(this, option),
            optionLabel = this.props.name ? option[this.props.name] : option
            return (
                <menu-option key={'menuSelectOption' + this.props.keyName + i} className='option' onClick={onSelect}>{optionLabel}</menu-option>
            );
        });

        let menuDisplay = {
            display: this.state.menuOpen ? 'block' : 'none'
        };

        return (
            <menu-select id={this.props.menuId} onMouseOver={this.toggleMenu.bind(this, true)} onMouseOut={this.toggleMenu.bind(this, false)} onClick={this.toggleMenu.bind(this, false)}>
                <span className='title'>{this.props.title}</span>
                <menu-select-options className='ps-container' style={menuDisplay}>
                    {options}
                </menu-select-options>
            </menu-select>
        );
    }
}

export default MenuSelect