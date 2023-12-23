import styled from "styled-components";
import { SortArrowSvg } from "../icons";
import { tableOptionsType } from "../table/TrackCardList";
import Dropdown from "./Dropdown";

type DropdownSortingType = {
    isOpen: boolean;
    tableOptions: tableOptionsType;
    handleSorting: (columnName: string) => void;
    handleClosing: () => void;
    dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const DropdownSorting = ({ isOpen, dropdownButtonRef, tableOptions, handleSorting, handleClosing, }: DropdownSortingType) => {
    return (
        <Dropdown
            isOpen={isOpen}
            handleClosing={handleClosing}
            dropdownButtonRef={dropdownButtonRef}
        >
            <StyledSort>
                <div className='secondary-text'>
                    Sort by
                </div>
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <button className={"sortButton"} onClick={() => handleSorting(option[0])} key={option[1].label}>
                            <div>{option[1].label}</div>
                            <SortArrowSvg
                                orientation={option[1].isAscending ? 'descending' : 'ascending'}
                                strokeColor={option[1].isAscending !== undefined ? 'white' : 'none'}
                            />
                        </button>
                    );
                })}
            </StyledSort>
        </Dropdown>
    );
}

export default DropdownSorting;

const StyledSort = styled.div`
    display: flex;
    flex-direction: column;

    .sortButton {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        gap: 5px;
    }
`;