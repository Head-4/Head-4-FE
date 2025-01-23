import React, { useEffect, useState } from 'react';
import Overlay from "../../styles/Common/Overlay";
import CommonButton from "../../components/CommonButton";
import styled from "styled-components";
import {ReactComponent as MainLogo} from "../../assets/Logo/MainLogo.svg";

export default function PwaInstallModal() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowModal(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const installPWA = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === "accepted") {
            console.log("PWA 설치 완료!");
        } else {
            console.log("PWA 설치 취소");
        }

        setDeferredPrompt(null);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeferredPrompt(null);
    };

    if (!showModal) return null;

    return (
        <>
            <Overlay onClick={closeModal}/>
            <PWAModalDiv>
                <StyledMainLogo/>
                <PWAModalMSG>
                    터치 한 번으로<br/>바로 시작해 보세요!
                </PWAModalMSG>
                <CommonButton isActive={true} onClick={installPWA}>
                    앱 내려받기
                </CommonButton>
            </PWAModalDiv>
        </>
    );
}

const PWAModalDiv = styled.div`
    text-align: center;
    background-color: ${({theme}) => theme.colors.backgroundWhite};
    z-index: 1000;
    position: absolute;
    bottom: 20%;
    transform: translateY(20%);
    width: 95%;
    border-radius: 20px;
    padding: 40px 24px 28px;
`;

const PWAModalMSG = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: 44px 0 4px;
`;

const StyledMainLogo = styled(MainLogo)`
    width: 100%;
    max-width: 170px;
`;