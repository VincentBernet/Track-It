import { useState } from "react";
import { DoubleSortSvg } from "../../icons";
import { tableOptionsType } from "../TrackCardList";
import DropdownSorting from "../../conditional/DropdownSorting";

type SortDropdownProps = {
    handleSort: (sort: string) => void;
    tableOptions: tableOptionsType;
}

const SortDropdown = ({ tableOptions, handleSort }: SortDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedColumn = Object.entries(tableOptions).find((object) => object[1].isAscending !== undefined) ||
        ['date_added', { label: 'Date added', isAscending: true, isDisplayed: true }];
    const label = selectedColumn[1].label;
    const isAscending = selectedColumn[1].isAscending;
    return (
        <>
            <button
                style={{
                    display: 'flex', alignItems: 'center', gap: '5px', zIndex: 2
                }}
                onClick={() => setIsOpen(!isOpen)}
                className="inversed"
                title="Sort by"
            >
                {label}
                <DoubleSortSvg
                    fillTop={isAscending}
                    fillBottom={!isAscending}
                />
            </button>
            <DropdownSorting isOpen={isOpen} handleSorting={handleSort} tableOptions={tableOptions} />
        </>
    );
}

export default SortDropdown;