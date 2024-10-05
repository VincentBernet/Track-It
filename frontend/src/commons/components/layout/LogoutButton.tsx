import React from "react";

type LogoutButtonProps = {
	logout: () => void;
	bodyColor?: string;
};

const LogoutButton = React.memo(({ logout, bodyColor = "#121212" }: LogoutButtonProps) => {
	document.body.style.backgroundColor = bodyColor;
	return (
		<button type="button" onClick={logout}>
			Log Out
		</button>
	);
});

export default LogoutButton;
