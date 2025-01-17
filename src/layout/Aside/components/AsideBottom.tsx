import styled from "styled-components";
import {Link} from "react-router-dom";
import {ReactComponent as UniversityIcon} from "../../../assets/Aside/UniversityIcon.svg";
import {ReactComponent as KeywordIcon} from "../../../assets/Aside/KeywordIcon.svg";
import {ReactComponent as MessageIcon} from "../../../assets/Aside/MessageIcon.svg";
import {ReactComponent as ExpandIcon} from "../../../assets/Aside/ExpandIcon.svg";
import {ReactComponent as BellIcon} from "../../../assets/Common/BellIcon.svg";
import {useState} from "react";
import useAsideStore from "../../../store/AsideStore";
import {handleAllowNotification} from "../../../utils/firebaseConfig";
import {useMutation} from "@tanstack/react-query";
import patchAllowNotification from "../../../apis/fcm/patchAllowNotification";

const AsideItems = [
    {
        to: "/setting/university",
        Icon: UniversityIcon,
        label: "학교 설정",
    },
    {
        to: "/setting/keyword",
        Icon: KeywordIcon,
        label: "키워드 설정",
    },
    {
        to: "/faq",
        Icon: MessageIcon,
        label: "건의하기",
    },
];

export default function AsideBottom() {
    const toggleAside = useAsideStore((state) => state.toggleAside);
    // 알림 승인했는지 확인하는 api로 변경
    const [keyWordToggle, setKeyWordToggle] = useState<boolean>(false);

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

    const clickKeyWordToggle = async () => {
        setKeyWordToggle((prev) => !prev);
        if (!keyWordToggle) {
            console.log('알림 허용')
            const {permission} = await handleAllowNotification();
            if (permission === "granted") {
                patchAllowMutate(true);
            }
        } else {
            console.log('알림 거절')
            patchAllowMutate(false);
        }
    };

    return (
        <>
            <OnOffDiv>
                <BellIcon/>
                <AsideSetting>키워드 알림</AsideSetting>
                <KeyWordOnOffButton onClick={clickKeyWordToggle} $keyWordToggle={keyWordToggle}>
                    {keyWordToggle ? "ON" : "OFF"}
                </KeyWordOnOffButton>
            </OnOffDiv>
            <ul>
                {AsideItems.map(({to, Icon, label}, index) => (
                    <li key={index}>
                        <AsideLink to={to} onClick={toggleAside}>
                            <Icon/>
                            <AsideSetting>{label}</AsideSetting>
                            <ExpandIcon/>
                        </AsideLink>
                    </li>
                ))}
            </ul>
        </>
    );
}

const OnOffDiv = styled.div`
    margin-top: 10px;
    display: flex;
    column-gap: 12px;
    padding: 16px 20px;
    align-items: center;
    color: #DDDDDD;
`;

const KeyWordOnOffButton = styled.button<{ $keyWordToggle: boolean }>`
    padding: 0 10px;
    text-align: ${({$keyWordToggle}) => $keyWordToggle ? 'left' : 'right'};
    font-size: 12px;
    font-weight: 600;
    color: ${({$keyWordToggle, theme}) => $keyWordToggle ? theme.colors.primary : '#B7B7B7'};
    position: relative;
    width: 64px;
    height: 32px;
    border-radius: 24px;
    border: 1px solid ${({$keyWordToggle}) => $keyWordToggle ? '#BFCFE9' : '#E2E2E2'};
    background-color: ${({$keyWordToggle}) => $keyWordToggle ? '#E4EBF5' : '#F7F7F7'};
    transition: all 0.2s;

    &::after {
        position: absolute;
        content: "";
        left: ${({$keyWordToggle}) => $keyWordToggle ? '38px' : '5px'};
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background-color: ${({$keyWordToggle, theme}) => $keyWordToggle ? theme.colors.primary : '#D0D0D0'};
        border-radius: 50%;
        transition: all 0.2s;
    }
`;

const AsideLink = styled(Link)`
    display: flex;
    column-gap: 12px;
    padding: 16px 20px;
    align-items: center;
    color: #DDDDDD;

    &:active {
        background-color: rgba(233, 233, 233, 0.25);
    }
`;

const AsideSetting = styled.div`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;