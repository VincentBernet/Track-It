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
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <button className={"sortButton"} onClick={() => handleSorting(option[0])} key={option[1].label}>
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
        align-items: center; 
        gap: 5px;
    }
`;