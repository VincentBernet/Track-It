type SwitchButton = {
	checked: boolean;
	onChange: () => void;
};

// FIX le switch a une value donnée
const SwitchButton = ({ onChange, checked }: SwitchButton) => {
	return (
		<button type="button" onClick={onChange}>
			<label className="switch btn-color-mode-switch">
				<input type="checkbox" name="color_mode" id="color_mode" value="1" defaultChecked={checked} />
				{/* biome-ignore lint/a11y/noLabelWithoutControl: TODO : accessibility issue*/}
				<label data-on="Consultation" data-off="Edition" htmlFor="color_mode" className="btn-color-mode-switch-inner" />
			</label>
		</button>
	);
};

export default SwitchButton;
