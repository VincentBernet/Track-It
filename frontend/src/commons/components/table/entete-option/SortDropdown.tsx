import { useRef, useState } from "react";
import DropdownSorting from "../../conditional/DropdownSorting";
import { DoubleSortSvg } from "../../icons";
import type { TableOptions } from "../Utils";
import type { ColumnNames } from "../Utils";

type SortDropdownProps = {
	handleSort: (sort: ColumnNames) => void;
	tableOptions: TableOptions;
};

const SortDropdown = ({ tableOptions, handleSort }: SortDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClosing = () => setIsOpen(false);
	const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

	const selectedColumn = Object.entries(tableOptions).find((object) => object[1].isAscending !== undefined) || [
		"date_added",
		{ label: "Date added", isAscending: true, isDisplayed: true },
	];
	const label = selectedColumn[1].label;
	const isAscending = selectedColumn[1].isAscending;
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
				title="Sort by"
				ref={dropdownButtonRef}
			>
				{label}
				<DoubleSortSvg fillTop={isAscending} fillBottom={!isAscending} />
			</button>
			<DropdownSorting
				isOpen={isOpen}
				dropdownButtonRef={dropdownButtonRef}
				handleClosing={handleClosing}
				handleSorting={handleSort}
				tableOptions={tableOptions}
			/>
		</>
	);
};

export default SortDropdown;
