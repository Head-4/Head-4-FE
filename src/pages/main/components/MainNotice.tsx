import React from 'react';
import styled from "styled-components";

interface NoticeType {
    title: string;
    date: string;
    url:string;
}

interface NoticeProps {
    notice: NoticeType
}

export default function MainNotice({notice}: NoticeProps) {
    return (
        <MainNoticeLi>
            <a href="">
                <MainNoticeTitle>{notice.title}</MainNoticeTitle>
                <MainNoticeDate>{notice.date}</MainNoticeDate>
            </a>
        </MainNoticeLi>
    );
}
const MainNoticeLi = styled.li`
    margin-bottom: 12px;
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid #FAFAFA;

    &:active {
        border: 1px solid ${({theme}) => theme.colors.primary};
    }
`;

const MainNoticeTitle = styled.div`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    margin-bottom: 4px;
`;

const MainNoticeDate = styled.div`
    color: #B7B7B7;
    font-size: 14px;
    font-weight: 500;
`;