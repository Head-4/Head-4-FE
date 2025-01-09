import {createBrowserRouter,} from "react-router-dom";
import {lazy, Suspense} from "react";
import {ErrorPage} from "../pages/utilPages/ErrorPage";
import {LoadingPage} from "../pages/utilPages/LoadingPage";

const Layout = lazy(() => import("../layout/Layout"));
const Login = lazy(() => import("../pages/login/Login"));
const KakaoLoading = lazy(() => import("../pages/login/components/KakaoLoading"));
const UniversityEdit = lazy(() => import("../pages/university/UniversityEdit"));
const KeyWordEdit = lazy(() => import("../pages/keyword/KeyWordEdit"));
const CompletePage = lazy(() => import("../pages/utilPages/CompletePage"));
const Main = lazy(() => import("../pages/main/Main"));
const Notice = lazy(() => import("../pages/notification/Notification"));

export const router = createBrowserRouter([
        {
            path: "/",
            element: <Suspense fallback={<LoadingPage/>}><Layout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    errorElement: <ErrorPage/>,
                    children: [
                        {index: true, element: <Main/>},
                        {
                            path: "login",
                            element: <Login/>,
                        },
                        {
                            path: "kakao/callback",
                            element: <KakaoLoading/>,
                            // loader: tokenLoader,
                        },
                        {
                            path: "register/university",
                            element: <UniversityEdit/>,
                        },
                        {
                            path: "register/keyword",
                            element: <KeyWordEdit/>,
                        },
                        {
                            path: "register/complete",
                            element: <CompletePage/>,
                        },
                        {
                            path: "notice",
                            element: <Notice/>,
                        },
                        // {
                        //     path: "setting",
                        //     element: <Setting/>,
                        //     // loader : settingLoader
                        //     // action: settingAction,
                        // },
                    ],
                }
            ],
        },
    ])
;