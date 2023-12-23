type SortArrowSvgProps = {
    orientation: 'ascending' | 'descending',
    strokeColor: 'white' | 'none'
}


/* https://www.svgrepo.com/svg/533608/arrow-narrow-top-alignment | https://www.svgrepo.com/svg/533603/arrow-narrow-down-move */
const SortArrowSvg = ({ orientation, strokeColor }: SortArrowSvgProps) => {
    if (orientation === 'ascending') {
        return (
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L12 8M12 8L16 12M12 8V20M4 4H20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );

    }
    if (orientation === 'descending') {
        return (
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16L12 20M12 20L16 16M12 20V8M4 4H20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
};

export default SortArrowSvg;