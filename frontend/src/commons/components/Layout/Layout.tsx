import React from "react";
import { LogoutButton } from "../index";
import { logout } from "../../spotify/auth";
import styled from "styled-components";

const StyledHeader = styled.header`
min-height: 65px;
`

type LayoutProps = {
    children: React.ReactNode;
    extraHeader?: React.ReactNode;
    bodyColor?: string;
};

const Layout = ({ children, extraHeader, bodyColor }: LayoutProps) => {
    return (
        <>
            <StyledHeader>
                {extraHeader}
                <LogoutButton logout={logout} bodyColor={bodyColor} />
            </StyledHeader>
            <main>
                {children}
            </main>
        </>
    );
}

export default Layout;