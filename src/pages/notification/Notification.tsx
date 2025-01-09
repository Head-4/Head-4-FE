import React from 'react';
import NotificationDetail from "./components/NotificationDetail";
import styled from "styled-components";

// json형식 보고 설정
const NotificationList: any[] = [
    {keyword: '학점', content: '[일정변경]상명대학교 샘물시스템 일시 중지 안내', date: '2분전', url: '1'},
    {keyword: '등록금', content: '[현장실습] 현장실습 성과 발표대회 안내', date: '2분전', url: '2'},
    {
        keyword: '장학금',
        content: '[상명대학교 국제개발평가센터(천안)] KOICA 2025년 상반기 ODA YP(Young Professional) 채용 공고(접수마감: ~1/5일)',
        date: '2분전',
        url: '3'
    },
];

export default function Notification() {


    return (
        <>
            <NotificationUl>
                {NotificationList.map((it) =>
                    <NotificationDetail
                        key={it.url}
                        it={it}
                    />
                )}
            </NotificationUl>
            <NotificationComment>모든 알림은 90일간 보관돼요</NotificationComment>
        </>
    );
}

const NotificationUl = styled.ul`
    margin-top: 16px;
`;

const NotificationComment = styled.div`
    text-align: center;
    margin-top: 48px;
    color: #B7B7B7;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
`;