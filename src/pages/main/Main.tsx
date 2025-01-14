import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import NavKeyWord from "./components/NavKeyWord";
import NoticeItem from "../../components/NoticeItem";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer';
import axios from "axios";

interface keyWord {
    id: number;
    content: string;
}

interface NoticeType {
    id: number;
    title: string;
    date: string;
    url: string;
}

interface FetchNoticesResponse {
    articles: NoticeType[];
    hasNext: boolean;
    cursor?: number;
}

// 더미 데이터
const keyWordList: keyWord[] = [
    {id: 1, content: '전체'},
    {id: 2, content: '신입생'},
    {id: 3, content: '장학금'},
];

const fetchNotices = async (pageParam: number): Promise<FetchNoticesResponse> => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/article/page/${pageParam}`);
    return res.data.data;
};

export default function Main() {
    const [selectedKeyWord, setSelectedKeyWord] = useState<number>(1);
    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView])

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ["notices"],
        queryFn: ({pageParam = 0}) => fetchNotices(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.cursor : undefined;
        },
        initialPageParam: 0,
    });

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
                {isLoading ?
                    <NoNoticeData>곧 새로운 공지를<br/>가져올게요!</NoNoticeData>
                    :
                    <MainNoticeUl>
                        {data?.pages.map((page) =>
                            page.articles.map((notice) =>
                                <NoticeItem
                                    key={notice.id}
                                    notice={notice}
                                />
                            )
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