import { StyledSwitchButton } from "../styles";


type SwitchButton = {
    onChange: () => void;
}

// FIX le switch a une value donnée
const SwitchButton = ({ onChange }: SwitchButton) => {
    return (
        <StyledSwitchButton onClick={onChange}>
            <label className="switch btn-color-mode-switch">
                <input type="checkbox" name="color_mode" id="color_mode" value="1" />
                <label data-on="Consultation" data-off="Edition" className="btn-color-mode-switch-inner"></label>
            </label>
        </StyledSwitchButton>
    );
}

export default SwitchButton;