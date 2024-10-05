import type React from "react";
import { logout } from "../../spotify/auth";
import { HelpButton, LogoutButton } from "../index";

type LayoutProps = {
	children: React.ReactNode;
	extraHeader?: React.ReactNode;
	bodyColor?: string;
	fixedMainPadding?: string;
};

const Layout = ({ children, extraHeader, bodyColor, fixedMainPadding = "64px 64px 64px 64px" }: LayoutProps) => {
	return (
		<>
			<div>
				{extraHeader}
				<HelpButton />
				<LogoutButton logout={logout} bodyColor={bodyColor} />
			</div>
			<main style={{ padding: fixedMainPadding }}>{children}</main>
		</>
	);
};

export default Layout;
