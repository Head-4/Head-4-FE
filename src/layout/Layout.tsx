import styled from "styled-components";
import {Outlet, useLocation} from "react-router-dom";
import {useAsideBar} from "../hooks/layout/useAsideBar";
import Header from "./Header/Header";
import Aside from "./Aside";

export default function Layout() {
    const location = useLocation();
    const pageRoute = location.pathname;
    const {isAsideOpen, toggleAside} = useAsideBar();

    return (
        <LayoutWrapper $pageRoute={pageRoute}>
            <Header pageRoute={pageRoute} toggleAside={toggleAside}/>
            <LayoutMain>
                <Outlet/>
            </LayoutMain>
            <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen}/>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div<{ $pageRoute: string }>`
    position: relative;
    min-height: 100vh;
    padding: 52px 20px 86px;
    background-color: ${({$pageRoute, theme}) =>
            $pageRoute === "/login"
                    ? theme.colors.primary
                    : $pageRoute === "/"
                            ? "#FAFAFA"
                            : "transparent"};
`;

const LayoutMain = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 52px - 86px);
`;