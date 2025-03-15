import React, { useEffect, useState } from "react";
import { QuestionMarkCircleSvg } from "../icons";
import { ModalTutorial } from "../index";

const HelpButton = React.memo(() => {
	/* Modal state : For displaying tutorial modal on first render */
	const [isModalTutorialOpen, setIsModalTutorialOpen] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.getItem("tutorial") !== "true") {
			setIsModalTutorialOpen(true);
			localStorage.setItem("tutorial", "true");
		}
	}, []);

	return (
		<>
			<button
				type="button"
				onClick={() => {
					setIsModalTutorialOpen(true);
				}}
				aria-label={"Need help ? Open tutorial"}
				title={"help"}
			>
				<QuestionMarkCircleSvg />
			</button>
			{isModalTutorialOpen && <ModalTutorial onClose={() => setIsModalTutorialOpen(false)} />}
		</>
	);
});

export default HelpButton;
