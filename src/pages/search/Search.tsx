import React, {useEffect, useState} from 'react';
import NoticeItem from "../../components/NoticeItem";
import styled from "styled-components";
import {ReactComponent as SearchIcon} from "../../assets/Search/SearchIcon.svg";
import {getChoseong} from "es-hangul";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import getArticles from "../../apis/main/getArticles";

export default function Search() {
    const [searchInput, setSearchInput] = useState<string>('');
    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && searchInput) {
            fetchNextPage();
        }
    }, [inView])

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["articles", searchInput],
        queryFn: ({pageParam = 0}) => getArticles(pageParam, searchInput),
        getNextPageParam: (lastPage) => {
            return lastPage?.hasNext ? lastPage.cursor : undefined;
        },
        staleTime: 100000,
        initialPageParam: 0,
        enabled: searchInput !== '',
    });

    const inputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    return (
        <>
            <SearchTopDiv>
                <SearchH1>무엇을<br/>찾고 계신가요?</SearchH1>
                <SearchH2>내가 설정한 키워드가 포함된 공지만 검색돼요</SearchH2>
                <SearchInputDiv>
                    <SearchIcon/>
                    <SearchInput type="text"
                                 value={searchInput}
                                 onChange={inputSearchChange}
                                 placeholder="검색 키워드를 입력하세요"
                    />
                </SearchInputDiv>
            </SearchTopDiv>
            <SearchListSection>
                {searchInput === '' ? (
                    <></>
                ) : data?.pages[0]?.articles.length === 0 ? (
                    <NoSearchData>검색 결과를 찾을 수 없어요</NoSearchData>
                ) : (
                    <ul>
                        {data?.pages.map((page) =>
                            page?.articles.map((notice) =>
                                <NoticeItem
                                    key={notice.id}
                                    searchInput={searchInput}
                                    notice={notice}
                                />
                            )
                        )}
                    </ul>
                )}
            </SearchListSection>
            <div ref={ref}></div>
        </>
    );
}

const SearchTopDiv = styled.div`
    padding: 12px 20px 28px;
    background-color: #FFFFFF;
    width: calc(100% + 40px);
    transform: translateX(-20px);
`;

const SearchH1 = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.mainFont};
    margin-bottom: 12px;
`;

const SearchH2 = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #707070;
`;

const SearchInputDiv = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    padding: 16px 20px;
    border: 1px solid ${({theme}) => theme.colors.lightGray};
    border-radius: 12px;
    margin-top: 28px;
`;

const SearchInput = styled.input`
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    color: ${({theme}) => theme.colors.mainFont};

    &::placeholder {
        color: #ADADAD;
    }
`;

const SearchListSection = styled.section`
    padding-top: 20px;
    flex: 1;
`;

const NoSearchData = styled.div`
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 24px auto 0;
`;

const HighlightSpan = styled.span`
    color: ${({theme}) => theme.colors.primary};
    font-weight: 600;
    font-size: 16px;
`;