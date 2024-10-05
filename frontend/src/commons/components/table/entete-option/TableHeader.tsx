import { ColumnNames, type TableOptions } from "../Utils";
import ColumnHeader from "./ColumnHeader";

type TableHeaderProps = {
	tableOptions: TableOptions;
	displayMode: "list" | "compact";
	handleSort: (columnName: ColumnNames) => void;
};

const TableHeader = ({ tableOptions, displayMode, handleSort }: TableHeaderProps) => {
	return (
		<thead>
			<tr>
				<th title="Index">
					<div className="button-text center">#</div>
				</th>
				{displayMode === "list" && (
					<ColumnHeader
						isDisplayed={tableOptions[ColumnNames.NAME].isDisplayed || tableOptions[ColumnNames.ARTIST].isDisplayed}
						isAscending={tableOptions[ColumnNames.NAME].isAscending}
						onClick={() => handleSort(ColumnNames.NAME)}
						title="Track"
					/>
				)}
				{displayMode === "compact" && (
					<ColumnHeader
						isDisplayed={tableOptions[ColumnNames.NAME].isDisplayed}
						isAscending={tableOptions[ColumnNames.NAME].isAscending}
						onClick={() => handleSort(ColumnNames.NAME)}
						title="Name"
					/>
				)}
				{displayMode === "compact" && (
					<ColumnHeader
						isDisplayed={tableOptions[ColumnNames.ARTIST].isDisplayed}
						isAscending={tableOptions[ColumnNames.ARTIST].isAscending}
						onClick={() => handleSort(ColumnNames.ARTIST)}
						title="Artist"
					/>
				)}
				<ColumnHeader
					isDisplayed={tableOptions[ColumnNames.ALBUM].isDisplayed}
					isAscending={tableOptions[ColumnNames.ALBUM].isAscending}
					onClick={() => handleSort(ColumnNames.ALBUM)}
					title="Album"
				/>
				<th />
				<ColumnHeader
					isDisplayed={tableOptions[ColumnNames.DATE_ADDED].isDisplayed}
					isAscending={tableOptions[ColumnNames.DATE_ADDED].isAscending}
					onClick={() => handleSort(ColumnNames.DATE_ADDED)}
					title="Date added"
				/>
				<ColumnHeader
					isDisplayed={tableOptions[ColumnNames.DURATION].isDisplayed}
					isAscending={tableOptions[ColumnNames.DURATION].isAscending}
					onClick={() => handleSort(ColumnNames.DURATION)}
					title="Dur."
				/>
			</tr>
		</thead>
	);
};

export default TableHeader;
