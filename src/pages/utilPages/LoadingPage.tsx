import styled from "styled-components";

export const LoadingPage = () => {
    return (
        <LoadingWrapper>
            <div>
                로딩중 이미지
            </div>
        </LoadingWrapper>
    );
};


const LoadingWrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;