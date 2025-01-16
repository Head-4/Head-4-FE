import React from 'react';
import styled from "styled-components";
import {dateAgo} from "../../../utils/dateFormatting";

interface NotificationType {
    createdDate: string;
    keyword: string;
    pushId: number;
    title: string;
    url: string;
}

interface NotificationDetailProps {
    it: NotificationType;
}

export default function NotificationDetail({it}: NotificationDetailProps) {
    return (
        <DetailLi>
            <a href={it.url}>
                <DetailHead>
                    <DetailKeyword>
                        '{it.keyword}' 새로운 공지
                    </DetailKeyword>
                    <DetailTime>
                        {dateAgo(it.createdDate)}
                    </DetailTime>
                </DetailHead>
                <DetailTitle>
                    {it.title}
                </DetailTitle>
            </a>
        </DetailLi>
    );
}

const DetailLi = styled.li`
    padding: 20px 0;
`;

const DetailHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`;

const DetailKeyword = styled.div`
    color: ${({theme}) => theme.colors.primary};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
`;

const DetailTime = styled.span`
    color: #C0C0C0;
    font-size: 12px;
    font-weight: 500;
`;

const DetailTitle = styled.p`
    color: #707070;
    font-weight: 500;
`;