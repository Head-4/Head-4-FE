import React from 'react';
import styled from "styled-components";
import {highlightText} from "../utils/highlightText";
import {formatDate} from "../utils/dateFormatting";

interface NoticeType {
    title: string;
    date: string;
    url: string;
}

interface NoticeProps {
    notice: NoticeType;
    searchInput?: string
}

export default function NoticeItem({notice, searchInput = ''}: NoticeProps) {
    return (
        <NoticeLi>
            <a href={notice.url}>
                <NoticeTitle>{highlightText(notice.title, searchInput, 16)}</NoticeTitle>
                <NoticeDate>{formatDate(notice.date)}</NoticeDate>
            </a>
        </NoticeLi>
    );
}
const NoticeLi = styled.li`
    margin-bottom: 12px;
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid #FAFAFA;
    background-color: ${({theme}) => theme.colors.backgroundWhite};

    &:active {
        border: 1px solid ${({theme}) => theme.colors.primary};
    }
`;

const NoticeTitle = styled.div`
    color: ${({theme}) => theme.colors.mainFont};
    font-weight: 600;
    margin-bottom: 4px;
`;

const NoticeDate = styled.div`
    color: #B7B7B7;
    font-size: 14px;
    font-weight: 500;
`;