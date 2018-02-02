class MenuSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }
    toggleMenu(open){
        this.setState({ menuOpen: open })
    }
    selectOption(ciq, option){
        this.setState({
            menuOpen: false
        }, () => {
            if (Object.keys(ciq).length > 0){
                this.props.handleOptionSelect(ciq, option);
            } else {
                this.props.handleOptionSelect(option);
            }
            
        })
    }
    render(){
        let options = this.props.options.map((option, i) => {
            let onSelect = this.props.needsCiq ? this.selectOption.bind(this, this.props.ciq, option) : this.selectOption.bind(this, {}, option),
            optionLabel = this.props.name ? option[this.props.name] : option
            return (
                <menu-option key={'menuSelectOption' + this.props.keyName + i} className='option' onClick={onSelect}>{optionLabel}</menu-option>
            );
        });

        let menuDisplay = {
            display: this.state.menuOpen ? 'block' : 'none'
        };

        return (
            <menu-select id={this.props.menuId} onMouseLeave={this.toggleMenu.bind(this, false)} onClick={this.toggleMenu.bind(this, !this.state.menuOpen)}>
                <span className='title'>{this.props.title}</span>
                <menu-select-options className='ps-container' style={menuDisplay}>
                    {options}
                </menu-select-options>
            </menu-select>
        );
    }
}

export default MenuSelect