import styled from "styled-components";
import {Outlet, useLocation} from "react-router-dom";
import {useAsideBar} from "../hooks/layout/useAsideBar";
import Header from "./Header/Header";
import Aside from "./Aside/Aside";

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
    background-color: ${({$pageRoute, theme}) => {
        switch ($pageRoute) {
            case "/login":
                return theme.colors.primary;
            case "/":
                return "#FAFAFA";
            case "/search":
                return "#FAFAFA";
            default:
                return "#FFFFFF;";
        }
    }};
`;

const LayoutMain = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 52px - 86px);
`;