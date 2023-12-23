import { tableOptionsType } from "../TrackCardList";
import ColumnHeader from "./ColumnHeader";

type TableHeaderProps = {
    tableOptions: tableOptionsType;
    displayMode: 'list' | 'compact';
    handleSort: (columnName: string) => void;
};

const TableHeader = ({ tableOptions, displayMode, handleSort }: TableHeaderProps) => {
    return (
        <thead>
            <tr>
                <th title='Index'>
                    <div className='button-text center'>
                        #
                    </div>
                </th>
                {displayMode === 'list' && (
                    <ColumnHeader
                        isDisplayed={(tableOptions['name'].isDisplayed || tableOptions['artist'].isDisplayed)}
                        isAscending={tableOptions['name'].isAscending}
                        onClick={() => handleSort('name')}
                        title="Track"
                    />
                )}
                {displayMode === 'compact' && (
                    <ColumnHeader
                        isDisplayed={tableOptions['name'].isDisplayed}
                        isAscending={tableOptions['name'].isAscending}
                        onClick={() => handleSort('name')}
                        title="Name"
                    />
                )}
                {displayMode === 'compact' && (
                    <ColumnHeader
                        isDisplayed={tableOptions['artist'].isDisplayed}
                        isAscending={tableOptions['artist'].isAscending}
                        onClick={() => handleSort('artist')}
                        title="Artist"
                    />
                )}
                <ColumnHeader
                    isDisplayed={tableOptions['album'].isDisplayed}
                    isAscending={tableOptions['album'].isAscending}
                    onClick={() => handleSort('album')}
                    title="Album"
                />
                <ColumnHeader
                    isDisplayed={tableOptions['date_added'].isDisplayed}
                    isAscending={tableOptions['date_added'].isAscending}
                    onClick={() => handleSort('date_added')}
                    title="Date added"
                />
                <ColumnHeader
                    isDisplayed={tableOptions['duration'].isDisplayed}
                    isAscending={tableOptions['duration'].isAscending}
                    onClick={() => handleSort('duration')}
                    title="Dur."
                />
            </tr>
        </thead>
    );
};

export default TableHeader;