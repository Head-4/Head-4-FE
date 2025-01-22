import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import NavKeyWord from "./components/NavKeyWord";
import NoticeItem from "../../components/NoticeItem";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer';
import getArticles from "../../apis/main/getArticles";
import getKeywordList from "../../apis/keyword/getKeywordList";

interface Keyword {
    notifyId: number;
    keyword: string;
}

export default function Main() {
    // 로그인 했는지ㅣ 안했는지 확인
    const [selectedKeyWord, setSelectedKeyWord] = useState<string>("null");
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
    } = useInfiniteQuery({
        queryKey: ["articles", selectedKeyWord],
        queryFn: ({pageParam = 0}) => getArticles(pageParam, selectedKeyWord),
        getNextPageParam: (lastPage) => {
            return lastPage?.hasNext ? lastPage.cursor : undefined;
        },
        staleTime: 100000,
        initialPageParam: 0,
    });

    const fallback: string[] = [];
    const {data: Keywords = fallback} = useQuery({
        queryKey: ["keywords"],
        queryFn: getKeywordList,
        staleTime: 100000,
    });

    const clickKeyWord = (keyword: string) => {
        setSelectedKeyWord(keyword);
    };

    return (
        <>
            <MainNav>
                <NavUl>
                    <NavKeyWord
                        key="all"
                        it={{notifyId: -1, keyword: "null"}}
                        isSelected={selectedKeyWord === "null"}
                        clickKeyWord={clickKeyWord}
                    >
                        전체
                    </NavKeyWord>
                    {Keywords.data?.map((it: Keyword) =>
                        <NavKeyWord
                            key={it.notifyId}
                            it={it}
                            isSelected={selectedKeyWord === it.keyword}
                            clickKeyWord={clickKeyWord}
                        >
                            {it.keyword}
                        </NavKeyWord>
                    )}
                </NavUl>
            </MainNav>
            <MainSection>
                {data?.pages[0]?.articles.length === 0 ?
                    <NoNoticeData>곧 새로운 공지를<br/>가져올게요!</NoNoticeData>
                    :
                    <MainNoticeUl>
                        {data?.pages.map((page) =>
                            page?.articles.map((notice) =>
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

const MainNoticeUl = styled.ul`
    width: 100%;
`;

const NoNoticeData = styled.div`
    color: #B2B2B2;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: auto auto;
`;