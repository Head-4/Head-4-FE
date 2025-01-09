import React from 'react';
import styled from "styled-components";

// 타입 맞추기
interface NotificationDetailProps {
    it: any;
}

export default function NotificationDetail({it}: NotificationDetailProps) {
    return (
        <DetailLi>
            <a href="">
                <DetailHead>
                    <DetailTitle>
                        '{it.keyword}' 새로운 공지
                    </DetailTitle>
                    <DetailTime>
                        {it.date}
                    </DetailTime>
                </DetailHead>
                <DetailContent>
                    {it.content}
                </DetailContent>
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

const DetailTitle = styled.div`
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

const DetailContent = styled.p`
    color: #707070;
    font-weight: 500;
`;