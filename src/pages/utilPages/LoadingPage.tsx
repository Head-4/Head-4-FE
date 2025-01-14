import styled from "styled-components";
import LoadingGif from '../../assets/Common/LoadingGif.gif';

export const LoadingPage = () => {
    return (
        <LoadingWrapper>
            <LoadingImage src={LoadingGif} alt="로딩 이미지"/>
        </LoadingWrapper>
    );
};

const LoadingWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
`;

const LoadingImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: contain;
`;