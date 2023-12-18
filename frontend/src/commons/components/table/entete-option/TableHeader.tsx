import { tableOptionsType } from "../TrackCardList";
import ColumnHeader from "./ColumnHeader";

type TableHeaderProps = {
    tableOptions: tableOptionsType;
    handleSort: (columnName: string) => void;
};

const TableHeader = ({ tableOptions, handleSort }: TableHeaderProps) => {
    return (
        <thead>
            <tr>
                <th title='Index'>
                    <div className='center'>
                        #
                    </div>
                </th>
                <ColumnHeader
                    isAscending={tableOptions['name'].isAscending}
                    onClick={() => handleSort('name')}
                    title="Track"
                />
                <ColumnHeader
                    isAscending={tableOptions['album'].isAscending}
                    onClick={() => handleSort('album')}
                    title="Album"
                />
                <ColumnHeader
                    isAscending={tableOptions['date_added'].isAscending}
                    onClick={() => handleSort('date_added')}
                    title="Date added"
                />
                <ColumnHeader
                    isAscending={tableOptions['duration'].isAscending}
                    onClick={() => handleSort('duration')}
                    title="Dur."
                />
            </tr>
        </thead>
    );
};

export default TableHeader;