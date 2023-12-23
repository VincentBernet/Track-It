import styled from "styled-components";
import { tableOptionsType } from "../table/TrackCardList";
import Dropdown from "./Dropdown";
import { ListCompactSvg, ListSvg } from "../icons";

type DropdownPropertiesType = {
    isOpen: boolean;
    tableOptions: tableOptionsType;
    displayMode: 'list' | 'compact';
    dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
    handleDisplay: (columnName: string) => void;
    handleDisplayMode: (mode: 'list' | 'compact') => void;
    handleClosing: () => void;
};

const DropdownProperties = ({ isOpen, tableOptions, displayMode, dropdownButtonRef, handleDisplay, handleDisplayMode, handleClosing }: DropdownPropertiesType) => {
    return (
        <Dropdown
            isOpen={isOpen}
            handleClosing={handleClosing}
            dropdownButtonRef={dropdownButtonRef}
            isPropertiesDropdown
        >
            <StyledProperties>
                <div className='secondary-text'>
                    Display Columns
                </div>
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <button className={"propertyButton"} key={option[1].label} onClick={() => handleDisplay(option[0])}>
                            <input
                                type="checkbox"
                                id={option[1].label}
                                name={option[1].label}
                                checked={option[1].isDisplayed}
                                onChange={() => handleDisplay(option[0])}
                                value={option[1].label}
                            />
                            <div className="button-text">
                                {option[1].label}
                            </div>
                        </button>
                    );
                })}
                <div className='secondary-text marginTop'>
                    View as
                </div>
                <button className={`propertyButton ${displayMode === 'list' && 'green'}`} onClick={() => handleDisplayMode('list')}>
                    <ListSvg />
                    List
                </button>
                <button className={`propertyButton ${displayMode === 'compact' && 'green'}`} onClick={() => handleDisplayMode('compact')}>
                    <ListCompactSvg />
                    Compact
                </button>
            </StyledProperties>
        </Dropdown >
    );
}

export default DropdownProperties;

const StyledProperties = styled.div`
    display: flex;
    flex-direction: column;

    .propertyButton {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .marginTop {
        margin-top: 10px;
    }

    .green {
        color: var(--green);
    }
`;