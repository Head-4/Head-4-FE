import {useRouteError} from "react-router-dom";

export const ErrorPage = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div>
            <h1>에러!!</h1>
            <p>대충 에러가 발생했습니다</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};