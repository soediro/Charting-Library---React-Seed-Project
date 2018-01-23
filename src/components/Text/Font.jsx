const families = ["Helvetica", "Courier", "Garamond", "Palatino", "Times New Roman"]
const sizes = [8, 10, 12, 13, 14, 16, 20, 28, 36, 48, 64]

const Font = (props) => {
    if (!props.fontOptions) return (<span></span>)

    let familyOptions = families.map((family, i) => {
        return (<menu-option key={'family' + i} onClick={props.onFamilyClick.bind(this, family)}><span>{family}</span></menu-option>)
    })

    let sizeOptions = sizes.map((size, i) => {
        return (<menu-option key={'size' + i} onClick={props.onSizeClick.bind(this, size)}><span>{size}</span></menu-option>)
    })

    return (
        <span>
            <menu-select id='fontSizeSelect'>
                <span className="title">{props.fontSize}</span>
                <menu-select-options className="menu-hover">
                    {sizeOptions}
                </menu-select-options>
            </menu-select>

            <menu-select id='fontFamilySelect'>
                <span className="title">{props.fontFamily}</span>
                <menu-select-options className="menu-hover">
                    {familyOptions}
                </menu-select-options>
            </menu-select>
        </span>
    )
}

export default Font
