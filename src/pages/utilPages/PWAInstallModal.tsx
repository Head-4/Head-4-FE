import React, {useEffect, useState} from 'react';
import Overlay from "../../styles/Common/Overlay";
import CommonButton from "../../components/CommonButton";
import styled from "styled-components";
import {ReactComponent as MainLogo} from "../../assets/Logo/MainLogo.svg";

export default function PwaInstallModal() {
    const [isInstallable, setIsInstallable] = useState<boolean>(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState<boolean>(false);

    useEffect(() => {
        const isDeviceIOS =
            /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isDeviceIOS);

        const handleBeforeInstallPrompt = (e: any) => {
            // 기본 이벤트 방지
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };
        // `beforeinstallprompt` 이벤트 리스너 등록
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
            console.log("사용자가 PWA를 설치했습니다!");
        } else {
            console.log("사용자가 PWA 설치를 취소했습니다.");
        }

        // 설치 프로세스 완료 후 초기화
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    const closeModal = () => {
        setIsInstallable(false);
        setDeferredPrompt(null);
    };

    if (!isIOS && !isInstallable) {
        return null;
    }

    return (
        <>
            {isInstallable &&
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
            }
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