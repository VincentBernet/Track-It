import { ListCompactSvg, ListSvg } from "../icons";
import type { ColumnNames, TableOptions } from "../table/Utils";
import Dropdown from "./Dropdown";

type DropdownPropertiesType = {
	isOpen: boolean;
	tableOptions: TableOptions;
	displayMode: "list" | "compact";
	dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
	handleDisplay: (columnName: ColumnNames) => void;
	handleDisplayMode: (mode: "list" | "compact") => void;
	handleClosing: () => void;
};

const DropdownProperties = ({
	isOpen,
	tableOptions,
	displayMode,
	dropdownButtonRef,
	handleDisplay,
	handleDisplayMode,
	handleClosing,
}: DropdownPropertiesType) => {
	return (
		<Dropdown
			isOpen={isOpen}
			handleClosing={handleClosing}
			dropdownButtonRef={dropdownButtonRef}
			isPropertiesDropdown={true}
		>
			<div>
				<div className="secondary-text">Display Columns</div>
				{Object.entries(tableOptions).map((option) => {
					return (
						<button
							type="button"
							className={"propertyButton"}
							key={option[1].label}
							onClick={() => handleDisplay(option[0] as ColumnNames)}
						>
							<input
								type="checkbox"
								id={option[1].label}
								name={option[1].label}
								checked={option[1].isDisplayed}
								onChange={() => handleDisplay(option[0] as ColumnNames)}
								value={option[1].label}
							/>
							<div className="button-text">{option[1].label}</div>
						</button>
					);
				})}
				<div className="secondary-text marginTop">View as</div>
				<button
					type="button"
					className={`propertyButton ${displayMode === "list" && "green"}`}
					onClick={() => handleDisplayMode("list")}
				>
					<ListSvg />
					List
				</button>
				<button
					type="button"
					className={`propertyButton ${displayMode === "compact" && "green"}`}
					onClick={() => handleDisplayMode("compact")}
				>
					<ListCompactSvg />
					Compact
				</button>
			</div>
		</Dropdown>
	);
};

export default DropdownProperties;
