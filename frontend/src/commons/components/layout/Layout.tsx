import type React from "react";
import styled from "styled-components";
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
			<StyledHeader>
				{extraHeader}
				<HelpButton />
				<LogoutButton logout={logout} bodyColor={bodyColor} />
			</StyledHeader>
			<main style={{ padding: fixedMainPadding }}>{children}</main>
		</>
	);
};

const StyledHeader = styled.header`
    min-height: 65px;
`;

export default Layout;
