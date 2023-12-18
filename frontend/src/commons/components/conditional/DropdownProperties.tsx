import { tableOptionsType } from "../table/TrackCardList";

type DropdownPropertiesType = {
    isOpen: boolean;
    tableOptions: tableOptionsType;
    handleDisplay: (columnName: string) => void;
};

const DropdownProperties = ({ isOpen, tableOptions, handleDisplay }: DropdownPropertiesType) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'absolute', marginTop: '200px', padding: '15px', borderRadius: '8px', zIndex: 2, backgroundColor: 'var(--true-black)',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {Object.entries(tableOptions).map((option) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
        </div >
    );
}

export default DropdownProperties;