import React from "react";
import { LogoutButton, HelpButton } from "../index";
import { logout } from "../../spotify/auth";
import styled from "styled-components";

type LayoutProps = {
    children: React.ReactNode;
    extraHeader?: React.ReactNode;
    bodyColor?: string;
    fixedMainMargin?: string;
};

const Layout = ({ children, extraHeader, bodyColor, fixedMainMargin = "64px 64px 64px 64px" }: LayoutProps) => {
    return (
        <>
            <StyledHeader>
                {extraHeader}
                <HelpButton />
                <LogoutButton logout={logout} bodyColor={bodyColor} />
            </StyledHeader>
            <main style={{ padding: fixedMainMargin }}>
                {children}
            </main>
        </>
    );
};

const StyledHeader = styled.header`
    min-height: 65px;
`;

export default Layout;