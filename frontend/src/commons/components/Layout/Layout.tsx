import React from "react";
import { LogoutButton } from "../index";
import { logout } from "../../spotify/auth";
import styled from "styled-components";

type LayoutProps = {
    children: React.ReactNode;
    blured?: boolean;
    extraHeader?: React.ReactNode;
    bodyColor?: string;
    fixedMainMargin?: string;
};

const Layout = ({ children, blured = false, extraHeader, bodyColor, fixedMainMargin = "64px 64px 64px 64px" }: LayoutProps) => {
    return (
        <StyledLayout $blured={blured}>
            <StyledHeader>
                {extraHeader}
                <LogoutButton logout={logout} bodyColor={bodyColor} />
            </StyledHeader>
            <main style={{ padding: fixedMainMargin }}>
                {children}
            </main>
        </StyledLayout>
    );
}

type StyledLayoutProps = {
    $blured: boolean;
}

const StyledLayout = styled.div <StyledLayoutProps>`
  -webkit-filter: ${props => props.$blured ? 'blur(8px)' : 'none'};
`;

const StyledHeader = styled.header`
    min-height: 65px;
`;

export default Layout;