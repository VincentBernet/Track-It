import { useRef, useState } from "react";
import { PropertiesSvg } from "../../icons";
import { tableOptionsType } from "../TrackCardList";
import DropdownProperties from "../../conditional/DropdownProperties";

type PropertiesDropdownProps = {
    tableOptions: tableOptionsType;
    displayMode: 'list' | 'compact';
    handleDisplay: (columnName: string) => void;
    handleDisplayMode: (mode: 'list' | 'compact') => void;
}


const PropertiesDropdown = ({ tableOptions, displayMode, handleDisplay, handleDisplayMode }: PropertiesDropdownProps) => {
    const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClosing = () => setIsOpen(false);
    return (
        <>
            <button
                style={{
                    display: 'flex', alignItems: 'center', gap: '5px', zIndex: 2
                }}
                onClick={() => setIsOpen(!isOpen)}
                className="inversed"
                title="Personalize"
                ref={dropdownButtonRef}
            >
                <PropertiesSvg />
            </button>
            <DropdownProperties
                isOpen={isOpen}
                tableOptions={tableOptions}
                displayMode={displayMode}
                dropdownButtonRef={dropdownButtonRef}
                handleClosing={handleClosing}
                handleDisplay={handleDisplay}
                handleDisplayMode={handleDisplayMode}
            />
        </>
    );
}

export default PropertiesDropdown;