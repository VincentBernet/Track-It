export enum columnNames {
	date_added = "date_added",
	name = "name",
	artist = "artist",
	album = "album",
	duration = "duration",
}

type columnOption = {
	isAscending: boolean | undefined;
	label: string;
	isDisplayed: boolean;
};

export type tableOptionsType = Record<columnNames, columnOption>;

export const initialSortByOptionValue: tableOptionsType = {
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
