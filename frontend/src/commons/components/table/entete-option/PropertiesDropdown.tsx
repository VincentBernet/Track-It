import { useState } from "react";
import { PropertiesSvg } from "../../icon";
import { tableOptionsType } from "../TrackCardList";
import DropdownProperties from "../../conditional/DropdownProperties";

type PropertiesDropdownProps = {
    handleDisplay: (columnName: string) => void;
    tableOptions: tableOptionsType;
}


const PropertiesDropdown = ({ tableOptions, handleDisplay }: PropertiesDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                style={{
                    display: 'flex', alignItems: 'center', gap: '5px', zIndex: 2
                }}
                onClick={() => setIsOpen(!isOpen)}
                className="inversed"
                title="Personalize"
            >
                <PropertiesSvg />
            </button>
            <DropdownProperties isOpen={isOpen} handleDisplay={handleDisplay} tableOptions={tableOptions} />
        </>
    );
}

export default PropertiesDropdown;