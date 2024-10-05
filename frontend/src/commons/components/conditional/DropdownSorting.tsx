import { SortArrowSvg } from "../icons";
import type { ColumnNames, TableOptions } from "../table/Utils";
import Dropdown from "./Dropdown";

type DropdownSortingType = {
	isOpen: boolean;
	tableOptions: TableOptions;
	handleSorting: (columnName: ColumnNames) => void;
	handleClosing: () => void;
	dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const DropdownSorting = ({
	isOpen,
	dropdownButtonRef,
	tableOptions,
	handleSorting,
	handleClosing,
}: DropdownSortingType) => {
	return (
		<Dropdown isOpen={isOpen} handleClosing={handleClosing} dropdownButtonRef={dropdownButtonRef}>
			<div>
				<div className="secondary-text">Sort by</div>
				{Object.entries(tableOptions).map((option) => {
					return (
						<button
							type="button"
							className={"sortButton"}
							onClick={() => handleSorting(option[0] as ColumnNames)}
							key={option[1].label}
						>
							<div>{option[1].label}</div>
							<SortArrowSvg
								orientation={option[1].isAscending ? "descending" : "ascending"}
								strokeColor={option[1].isAscending !== undefined ? "white" : "none"}
							/>
						</button>
					);
				})}
			</div>
		</Dropdown>
	);
};

export default DropdownSorting;
