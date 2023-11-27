import { StyledRangeButtons } from "../styles";


interface TimeRangeButtonsProps {
    timeRange: string;
    handleClick: (timeRange: string) => void;
}

const TimeRangeButtons = ({ timeRange, handleClick }: TimeRangeButtonsProps) => {
    return (
        <StyledRangeButtons>
            <li>
                <button className={timeRange === 'short_term' ? 'activehehe' : ''} onClick={() => handleClick('short_term')}>This Month</button>
            </li>
            <li>
                <button className={timeRange === 'medium_term' ? 'activehehe' : ''} onClick={() => handleClick('medium_term')}>Last 6 Months</button>
            </li>
            <li>
                <button className={timeRange === 'long_term' ? 'activehehe' : ''} onClick={() => handleClick('long_term')}>All Time</button>
            </li>
        </StyledRangeButtons>
    );
};

export default TimeRangeButtons;