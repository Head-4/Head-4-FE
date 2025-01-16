import React from 'react';
import Overlay from "../../../styles/Common/Overlay";
import styled from "styled-components";
import Column from "../../../styles/Common/Column";
import {ReactComponent as BellIcon} from "../../../assets/Common/BellIcon.svg";
import CommonButton from "../../../components/CommonButton";
import {useNavigate} from "react-router-dom";
import {handleAllowNotification} from "../../../utils/firebaseConfig";
import patchAllowNotification from "../../../apis/fcm/patchAllowNotification";
import {useMutation} from "@tanstack/react-query";

interface NotificationModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function NotificationModal({isModalOpen, setIsModalOpen}: NotificationModalProps) {
    const navigate = useNavigate();

    const {mutate: patchAllowMutate} = useMutation({
        mutationFn: (allow: boolean) => patchAllowNotification(allow),
        onSuccess: (data) => {
            console.log('success: ', data);
            // queryClient.invalidateQueries({queryKey: ['']})
        },
        onError: (error) => {
            console.error("Error: ", error);
        },
    });

    const clickButton = async (isAllow: boolean) => {
        // 기본을 false 로 저장해야함
        if (isAllow) {
            const {permission} = await handleAllowNotification();
            if (permission === "granted") {
                patchAllowMutate(true);
            }
        }
        navigate('/register/complete');
    }

    return (
        <>
            {isModalOpen && <Overlay onClick={() => setIsModalOpen(false)}/>}
            <NotificationModalDiv $isModalOpen={isModalOpen}>
                <Column $verticalAlign="center">
                    <BellIconDiv>
                        <BellIcon color="#246AD2" width={32} height={32}/>
                    </BellIconDiv>
                    <NotificationModalH2>알림을 받을까요?</NotificationModalH2>
                    <NotificationModalH3>알림 받기를 수락하셔야 등록된 키워드가<br/>포함된 공지의 알림을 받을 수 있어요</NotificationModalH3>
                </Column>
                <ButtonDiv>
                    <CommonButton isActive={true} onClick={() => {
                        clickButton(true)
                    }}>알림 받기
                    </CommonButton>
                    <LaterButton onClick={() => {
                        clickButton(false)
                    }}>나중에 하기</LaterButton>
                </ButtonDiv>
            </NotificationModalDiv>
        </>
    );
}

const NotificationModalDiv = styled.div<{ $isModalOpen: boolean }>`
    display: ${({$isModalOpen}) => $isModalOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.backgroundWhite};
    z-index: 1000;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px 20px 86px;
    gap: 32px;
`;

const BellIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(43, 117, 203, 0.10);
    margin-bottom: 18px;
`;

const NotificationModalH2 = styled.h2`
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
`;

const NotificationModalH3 = styled.h3`
    color: #6E6E6E;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
`;

const ButtonDiv = styled.div`
    width: 100%;
`;

const LaterButton = styled.button`
    width: 100%;
    font-weight: 700;
    font-size: 18px;
    color: #686868;
    border-radius: 12px;
    background-color: ${({theme}) => theme.colors.backgroundWhite};
    padding: 18px 0;
    border: 1px solid #DDD;
    margin-top: 12px;
`;