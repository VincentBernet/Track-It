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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }} key={option[1].label}>
                            <input
                                type="checkbox"
                                id={option[1].label}
                                name={option[1].label}
                                checked={option[1].isDisplayed}
                                onChange={() => handleDisplay(option[0])}
                                value={option[1].label}
                            />
                            <label htmlFor={option[1].label}>{option[1].label}</label>
                        </div>
                    );
                })}
            </div>
        </Dropdown>
    );
}

export default DropdownProperties;