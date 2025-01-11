import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import NavKeyWord from "./components/NavKeyWord";
import NoticeItem from "../../components/NoticeItem";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer';

interface keyWord {
    id: number;
    content: string;
}

interface NoticeType {
    title: string;
    date: string;
    url: string;
}

interface FetchNoticesResponse {
    items: NoticeType[];
    next?: number;
}

// 더미 데이터
const keyWordList: keyWord[] = [
    {id: 1, content: '전체'},
    {id: 2, content: '신입생'},
    {id: 3, content: '장학금'},
];
// 데이터 맞춰서 키워드 필터링 기능 추가하기
const NoticeList: NoticeType[] = [
    {title: '[일정변경]상명대학교 샘물시스템 일시 중지 안내', date: '2025.05.26', url: '1'},
    {title: '[현장실습] 현장실습 성과 발표대회 안내', date: '2025.05.26', url: '2'},
    {
        title: '[상명대학교 국제개발평가센터(천안)] KOICA 2025년 상반기 ODA YP(Young Professional) 채용 공고(접수마감: ~1/5일)',
        date: '2025.05.26',
        url: '3'
    },
];

const fetchNotices = async (pageParam: number): Promise<FetchNoticesResponse> => {
    const res = await fetch(`/api/items?page=${pageParam}`);
    return res.json();
};

export default function Main() {
    const [selectedKeyWord, setSelectedKeyWord] = useState<number>(1);
    const {ref, inView} = useInView();

    useEffect(() => {
        // if (inView && hasNextPage && !isFetchingNextPage) {
        //     fetchNextPage();
        // }
    }, [inView])

    // const {
    //     data,
    //     fetchNextPage,
    //     isFetchingNextPage,
    //     hasNextPage,
    //     isFetching,
    //     isLoading,
    //     isError,
    //     error
    // } = useInfiniteQuery({
    //     queryKey: ["notices"],
    //     queryFn: ({pageParam}) => fetchNotices(pageParam),
    //     getNextPageParam: (lastPage) => {
    //         return lastPage.next || undefined;
    //     },
    //     initialPageParam: 1,
    // });

    const clickKeyWord = (id: number) => {
        setSelectedKeyWord(id);
    };

    return (
        <>
            <MainNav>
                <NavUl>
                    {keyWordList.map((it) =>
                        <NavKeyWord
                            key={it.id}
                            it={it}
                            isSelected={selectedKeyWord === it.id}
                            clickKeyWord={clickKeyWord}
                        />
                    )}
                </NavUl>
            </MainNav>
            <MainSection>
                {NoticeList.length === 0 ?
                    <NoNoticeData>곧 새로운 공지를<br/>가져올게요!</NoNoticeData>
                    :
                    <MainNoticeUl>
                        {/*{data?.pages.map((page) =>*/}
                        {/*    page.items.map((notice) =>*/}
                        {/*        <NoticeItem*/}
                        {/*            key={notice.url}*/}
                        {/*            notice={notice}*/}
                        {/*        />*/}
                        {/*    )*/}
                        {/*)}*/}
                        {NoticeList.map((notice) =>
                            <NoticeItem
                                key={notice.url}
                                notice={notice}
                            />
                        )}
                        <div ref={ref}></div>
                    </MainNoticeUl>
                }
            </MainSection>
        </>
    );
}

const MainNav = styled.nav`
    margin-top: 8px;
    margin-bottom: 20px;
`;

const NavUl = styled.ul`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const MainSection = styled.section`
    display: flex;
    flex: 1;
`;

const MainNoticeUl = styled.ul``;

const NoNoticeData = styled.div`
    color: #B2B2B2;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: auto auto;
`;