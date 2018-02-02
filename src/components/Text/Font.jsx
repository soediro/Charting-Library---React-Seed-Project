import MenuSelect from '../Menus/MenuSelect'

const families = ["Helvetica", "Courier", "Garamond", "Palatino", "Times New Roman"];
const sizes = [8, 10, 12, 13, 14, 16, 20, 28, 36, 48, 64];

const Font = (props) => {
    if (!props.fontOptions) { return (<span></span>) }
    return (
        <span>
            <MenuSelect options={sizes} keyName='family' handleOptionSelect={props.onSizeClick} menuId='fontSizeSelect' title={props.fontSize} />

            <MenuSelect options={families} keyName='size' handleOptionSelect={props.onFamilyClick} menuId='fontFamilySelect' title={props.fontFamily} />
        </span>
    );
}

export default Font
