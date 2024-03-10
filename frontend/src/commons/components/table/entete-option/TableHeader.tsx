import { columnNames, type tableOptionsType } from "../Utils";
import ColumnHeader from "./ColumnHeader";

type TableHeaderProps = {
	tableOptions: tableOptionsType;
	displayMode: "list" | "compact";
	handleSort: (columnName: columnNames) => void;
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
						isDisplayed={tableOptions[columnNames.name].isDisplayed || tableOptions[columnNames.artist].isDisplayed}
						isAscending={tableOptions[columnNames.name].isAscending}
						onClick={() => handleSort(columnNames.name)}
						title="Track"
					/>
				)}
				{displayMode === "compact" && (
					<ColumnHeader
						isDisplayed={tableOptions[columnNames.name].isDisplayed}
						isAscending={tableOptions[columnNames.name].isAscending}
						onClick={() => handleSort(columnNames.name)}
						title="Name"
					/>
				)}
				{displayMode === "compact" && (
					<ColumnHeader
						isDisplayed={tableOptions[columnNames.artist].isDisplayed}
						isAscending={tableOptions[columnNames.artist].isAscending}
						onClick={() => handleSort(columnNames.artist)}
						title="Artist"
					/>
				)}
				<ColumnHeader
					isDisplayed={tableOptions[columnNames.album].isDisplayed}
					isAscending={tableOptions[columnNames.album].isAscending}
					onClick={() => handleSort(columnNames.album)}
					title="Album"
				/>
				<th />
				<ColumnHeader
					isDisplayed={tableOptions[columnNames.date_added].isDisplayed}
					isAscending={tableOptions[columnNames.date_added].isAscending}
					onClick={() => handleSort(columnNames.date_added)}
					title="Date added"
				/>
				<ColumnHeader
					isDisplayed={tableOptions[columnNames.duration].isDisplayed}
					isAscending={tableOptions[columnNames.duration].isAscending}
					onClick={() => handleSort(columnNames.duration)}
					title="Dur."
				/>
			</tr>
		</thead>
	);
};

export default TableHeader;
