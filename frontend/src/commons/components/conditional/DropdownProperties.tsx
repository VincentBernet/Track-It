import styled from "styled-components";
import { tableOptionsType } from "../table/TrackCardList";
import Dropdown from "./Dropdown";

type DropdownPropertiesType = {
    isOpen: boolean;
    tableOptions: tableOptionsType;
    handleDisplay: (columnName: string) => void;
    handleClosing: () => void;
    dropdownButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const DropdownProperties = ({ isOpen, tableOptions, dropdownButtonRef, handleDisplay, handleClosing }: DropdownPropertiesType) => {
    return (
        <Dropdown
            isOpen={isOpen}
            handleClosing={handleClosing}
            dropdownButtonRef={dropdownButtonRef}
            isPropertiesDropdown
        >
            <StyledProperties>
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
        align-items: middle;
        gap: 10px;
    }
`;