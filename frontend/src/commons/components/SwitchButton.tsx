import { StyledSwitchButton } from "../styles";


type SwitchButton = {
    checked: boolean;
    onChange: () => void;
}

// FIX le switch a une value donnée
const SwitchButton = ({ onChange, checked }: SwitchButton) => {
    return (
        <StyledSwitchButton onClick={onChange}>
            <label className="switch btn-color-mode-switch">
                <input type="checkbox" name="color_mode" id="color_mode" value="1" checked={checked} />
                <label data-on="Consultation" data-off="Edition" className="btn-color-mode-switch-inner"></label>
            </label>
        </StyledSwitchButton>
    );
}

export default SwitchButton;