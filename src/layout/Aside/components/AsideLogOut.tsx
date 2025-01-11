import styled from "styled-components";
import {useNavigate} from "react-router-dom";

interface AsideLogOutProps {
    toggleAside: () => void;
}

export default function AsideLogOut({toggleAside}: AsideLogOutProps) {
    const navigate = useNavigate();

    const clickLogOut = () => {
        // 로그아웃 설정
        toggleAside();
        navigate('/login');
    }

    return (
        <LogOutButton onClick={clickLogOut}>
            로그아웃
        </LogOutButton>
    );
}

const LogOutButton = styled.button`
    position: absolute;
    left: 20px;
    bottom: 140px;
    color: #A9A9A9;
    font-size: 12px;
    font-weight: 500;
    text-decoration-line: underline;
`;