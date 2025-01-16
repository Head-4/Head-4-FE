import React, {useEffect} from 'react';
import NotificationDetail from "./components/NotificationDetail";
import styled from "styled-components";
import {useInfiniteQuery} from "@tanstack/react-query";
import getNotifications from "../../apis/notification/getNotifications";
import {useInView} from "react-intersection-observer";

export default function Notification() {
    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView])
    
    // 데이터 들어오면 확인
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({pageParam = 0}) => getNotifications(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage?.hasNext ? lastPage.cursor : undefined;
        },
        staleTime: 100000,
        initialPageParam: 0,
    });

    return (
        <>
            <NotificationUl>
                {data?.pages.map((page) =>
                    page?.pushLogs.map((it) =>
                        <NotificationDetail
                            key={it.pushId}
                            it={it}
                        />
                    )
                )}
            </NotificationUl>
            <NotificationComment ref={ref}>모든 알림은 90일간 보관돼요</NotificationComment>
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