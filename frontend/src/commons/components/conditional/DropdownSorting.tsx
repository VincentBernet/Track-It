import { StyledDropdown } from "../../styles";
import { SortArrowSvg } from "../icons";
import { tableOptionsType } from "../table/TrackCardList";

type DropdownSortingType = {
    isOpen: boolean;
    tableOptions: tableOptionsType;
    handleSorting: (columnName: string) => void;
};

const DropdownSorting = ({ isOpen, tableOptions, handleSorting }: DropdownSortingType) => {
    if (!isOpen) return null;
    return (
        <StyledDropdown>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <button onClick={() => handleSorting(option[0])} key={option[1].label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px' }} >
                                <div>{option[1].label}</div>
                                <SortArrowSvg
                                    orientation={option[1].isAscending ? 'descending' : 'ascending'}
                                    strokeColor={option[1].isAscending !== undefined ? 'white' : 'none'}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </StyledDropdown>
    );
}

export default DropdownSorting;