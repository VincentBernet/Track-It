import { useState } from "react";
import { DoubleSortSvg } from "./Icon";
import { sortOptionType } from "./TrackCardList";

type SortDropdownProps = {
    handleSort: (sort: string) => void;
    sortByOption: sortOptionType;
}

const labelSortByOptionMap: { [key: string]: string } = {
    date_added: 'Date added',
    name: 'Title',
    artist: 'Artist',
    album: 'Album',
    duration: 'Duration'
}

const findLabel = (sortByOption: sortOptionType) => {
    if (sortByOption.date_added !== undefined) {
        return labelSortByOptionMap.date_added;
    }
    if (sortByOption.name !== undefined) {
        return labelSortByOptionMap.name;
    }
    if (sortByOption.artist !== undefined) {
        return labelSortByOptionMap.artist;
    }
    if (sortByOption.album !== undefined) {
        return labelSortByOptionMap.album;
    }
    if (sortByOption.duration !== undefined) {
        return labelSortByOptionMap.duration;
    }
}

const isAscending = (sortByOption: sortOptionType) => {
    if (sortByOption.date_added === true) {
        return true;
    }
    if (sortByOption.date_added === false) {
        return false;
    }
    if (sortByOption.name === true) {
        return true;
    }
    if (sortByOption.name === false) {
        return false;
    }
    if (sortByOption.artist === true) {
        return true;
    }
    if (sortByOption.artist === false) {
        return false;
    }
    if (sortByOption.album === true) {
        return true;
    }
    if (sortByOption.album === false) {
        return false;
    }
    if (sortByOption.duration === true) {
        return true;
    }
    if (sortByOption.duration === false) {
        return false;
    }
    return false;
}


const SortDropdown = ({ sortByOption, handleSort }: SortDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
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
                {findLabel(sortByOption)}
                <DoubleSortSvg
                    fillTop={isAscending(sortByOption)}
                    fillBottom={!isAscending(sortByOption)}
                />
            </button>
        </>
    );
}

export default SortDropdown;