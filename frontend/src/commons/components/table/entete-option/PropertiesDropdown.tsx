import { useRef, useState } from "react";
import { PropertiesSvg } from "../../icons";
import { tableOptionsType } from "../TrackCardList";
import DropdownProperties from "../../conditional/DropdownProperties";

type PropertiesDropdownProps = {
    handleDisplay: (columnName: string) => void;
    tableOptions: tableOptionsType;
}


const PropertiesDropdown = ({ tableOptions, handleDisplay }: PropertiesDropdownProps) => {
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
                dropdownButtonRef={dropdownButtonRef}
                handleClosing={handleClosing}
                handleDisplay={handleDisplay}
                tableOptions={tableOptions} />
        </>
    );
}

export default PropertiesDropdown;