import styled from "styled-components";
import {Link} from "react-router-dom";
import {ReactComponent as UniversityIcon} from "../../../assets/Aside/UniversityIcon.svg";
import {ReactComponent as KeywordIcon} from "../../../assets/Aside/KeywordIcon.svg";
import {ReactComponent as MessageIcon} from "../../../assets/Aside/MessageIcon.svg";
import {ReactComponent as ExpandIcon} from "../../../assets/Aside/ExpandIcon.svg";

interface AsideBottomProps {
    toggleAside: () => void;
}

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

export default function AsideBottom({toggleAside}: AsideBottomProps) {
    return (
        <AsideBottomUl>
            {AsideItems.map(({to, Icon, label}, index) => (
                <li key={index}>
                    <AsideLink to={to} onClick={toggleAside}>
                        <Icon/>
                        <AsideSetting>{label}</AsideSetting>
                        <ExpandIcon/>
                    </AsideLink>
                </li>
            ))}
        </AsideBottomUl>
    );
}

const AsideBottomUl = styled.ul`
    margin-top: 10px;
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