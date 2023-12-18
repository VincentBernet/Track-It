import { SortArrowSvg } from "../../icon";

type ColumnProps = {
    isAscending: boolean | undefined;
    onClick: () => void;
    title: string;
}

const ColumnHeader = ({ isAscending, title, onClick }: ColumnProps) => {
    return (
        <th onClick={onClick} title='Sort by music title'>
            <div className='flex'>
                {title}
                <SortArrowSvg
                    orientation={isAscending ? 'descending' : 'ascending'}
                    strokeColor={isAscending !== undefined ? 'white' : 'none'}
                />
            </div>
        </th>
    );
};

export default ColumnHeader;