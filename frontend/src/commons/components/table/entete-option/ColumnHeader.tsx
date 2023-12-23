import { SortArrowSvg } from "../../icons";

type ColumnProps = {
    isDisplayed: boolean;
    isAscending: boolean | undefined;
    onClick: () => void;
    title: string;
}

const ColumnHeader = ({ isDisplayed, isAscending, title, onClick }: ColumnProps) => {
    if (!isDisplayed) {
        return null;
    }
    return (
        <th onClick={onClick} title='Sort by music title'>
            <div className='button-text flex'>
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