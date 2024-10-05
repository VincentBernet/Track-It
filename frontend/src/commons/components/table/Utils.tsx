export enum ColumnNames {
	DATE_ADDED = "date_added",
	NAME = "name",
	ARTIST = "artist",
	ALBUM = "album",
	DURATION = "duration",
}

type ColumnOption = {
	isAscending: boolean | undefined;
	label: string;
	isDisplayed: boolean;
};

export type TableOptions = Record<ColumnNames, ColumnOption>;

export const initialSortByOptionValue: TableOptions = {
	date_added: {
		isAscending: true,
		label: "Date added",
		isDisplayed: true,
	},
	name: {
		isAscending: undefined,
		label: "Name",
		isDisplayed: true,
	},
	artist: {
		isAscending: undefined,
		label: "Artist",
		isDisplayed: true,
	},
	album: {
		isAscending: undefined,
		label: "Album",
		isDisplayed: true,
	},
	duration: {
		isAscending: undefined,
		label: "Duration",
		isDisplayed: true,
	},
};
