import { StyledSwitchButton } from "../styles";


type SwitchButton = {
    onChange: () => void;
}

const SwitchButton = ({ onChange }: SwitchButton) => {
    return (
        <StyledSwitchButton onClick={onChange}>
            <label className="switch btn-color-mode-switch">
                <input type="checkbox" name="color_mode" id="color_mode" value="1" />
                <label data-on="Edition" data-off="Consultation" className="btn-color-mode-switch-inner"></label>
            </label>
        </StyledSwitchButton>
    );
}

export default SwitchButton;