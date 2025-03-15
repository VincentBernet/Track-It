import { useRef, useState } from "react";
import DropdownProperties from "../../conditional/DropdownProperties";
import { PropertiesSvg } from "../../icons";
import type { ColumnNames, TableOptions } from "../Utils";

type PropertiesDropdownProps = {
	tableOptions: TableOptions;
	displayMode: "list" | "compact";
	handleDisplay: (columnName: ColumnNames) => void;
	handleDisplayMode: (mode: "list" | "compact") => void;
};

const PropertiesDropdown = ({
	tableOptions,
	displayMode,
	handleDisplay,
	handleDisplayMode,
}: PropertiesDropdownProps) => {
	const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleClosing = () => setIsOpen(false);
	return (
		<>
			<button
				type="button"
				style={{
					display: "flex",
					alignItems: "center",
					gap: "5px",
					zIndex: 2,
				}}
				onClick={() => setIsOpen(!isOpen)}
				className="inversed"
				title="Personalize"
				ref={dropdownButtonRef}
			>
				<PropertiesSvg />
			</button>
			<DropdownProperties
				isOpen={isOpen}
				tableOptions={tableOptions}
				displayMode={displayMode}
				dropdownButtonRef={dropdownButtonRef}
				handleClosing={handleClosing}
				handleDisplay={handleDisplay}
				handleDisplayMode={handleDisplayMode}
			/>
		</>
	);
};

export default PropertiesDropdown;
