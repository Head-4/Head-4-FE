import {createBrowserRouter,} from "react-router-dom";
import {ErrorPage} from "../components/ErrorPage";
import {lazy, Suspense} from "react";
import {LoadingPage} from "../components/LoadingPage";

const Layout =lazy(()=>import("../layout/Layout"));

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
                    ],
                }
            ],
        },
    ])
;