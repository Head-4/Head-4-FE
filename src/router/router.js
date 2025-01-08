import {createBrowserRouter,} from "react-router-dom";
import {ErrorPage} from "../components/ErrorPage";
import {lazy, Suspense} from "react";
import {LoadingPage} from "../components/LoadingPage";

const Layout = lazy(() => import("../layout/Layout"));
const Login = lazy(() => import("../pages/login/Login"));
const KakaoLoading = lazy(() => import("../pages/login/components/KakaoLoading"));
const UniversityEdit = lazy(() => import("../pages/university/UniversityEdit"));
const KeyWordEdit = lazy(() => import("../pages/keyword/KeyWordEdit"));

export const router = createBrowserRouter([
        {
            path: "/",
            element: <Suspense fallback={<LoadingPage/>}><Layout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    errorElement: <ErrorPage/>,
                    children: [
                        // {index: true, element: <Index/>},
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