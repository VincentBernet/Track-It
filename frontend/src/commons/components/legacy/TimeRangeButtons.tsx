import { StyledRangeButtons } from "../../styles";

type TimeRangeButtonsProps = {
	timeRange: string;
	handleClick: (timeRange: string) => void;
};

const TimeRangeButtons = ({ timeRange, handleClick }: TimeRangeButtonsProps) => {
	return (
		<StyledRangeButtons>
			<li>
				<button
					type="button"
					className={timeRange === "short_term" ? "active" : ""}
					onClick={() => handleClick("short_term")}
				>
					This Month
				</button>
			</li>
			<li>
				<button
					type="button"
					className={timeRange === "medium_term" ? "active" : ""}
					onClick={() => handleClick("medium_term")}
				>
					Last 6 Months
				</button>
			</li>
			<li>
				<button
					type="button"
					className={timeRange === "long_term" ? "active" : ""}
					onClick={() => handleClick("long_term")}
				>
					All Time
				</button>
			</li>
		</StyledRangeButtons>
	);
};

export default TimeRangeButtons;
