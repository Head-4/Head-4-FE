import React, {useState} from 'react';
import NoticeItem from "../../components/NoticeItem";
import styled from "styled-components";
import {ReactComponent as SearchIcon} from "../../assets/Search/SearchIcon.svg";
import {getChoseong} from "es-hangul";

interface NoticeType {
    title: string;
    date: string;
    url: string;
}

// 더미데이터
const NoticeList: NoticeType[] = [
    {title: '[일정변경]상명대학교 샘물시스템 일시 중지 안내', date: '2025.05.26', url: '1'},
    {title: '[현장실습] 현장실습 성과 발표대회 안내', date: '2025.05.26', url: '2'},
    {
        title: '[상명대학교 국제개발평가센터(천안)] KOICA 2025년 상반기 ODA YP(Young Professional) 채용 공고(접수마감: ~1/5일)',
        date: '2025.05.26',
        url: '3'
    },
];

export default function Search() {
    const [searchList, setSearchList] = useState<NoticeType[]>(NoticeList);
    const [searchInput, setSearchInput] = useState<string>('');

    const inputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setSearchInput(input);

        const filteredList = NoticeList.filter((it) =>
            getChoseong(it.title).includes(getChoseong(input))
        );
        setSearchList(filteredList);
    };

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const highlightText = (text: string) => {
        if (!searchInput) return text;
        const escapedInput = escapeRegExp(searchInput);
        const parts = text.split(new RegExp(`(${escapedInput})`, 'gi'));
        return parts.map((part, idx) =>
            part.toLowerCase() === searchInput.toLowerCase()
                ? <HighlightSpan key={idx}>{part}</HighlightSpan>
                : part
        );
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
                ) : searchList.length === 0 ? (
                    <NoSearchData>검색 결과를 찾을 수 없어요</NoSearchData>
                ) : (
                    <ul>
                        {searchList.map((notice) => (
                            <NoticeItem
                                key={notice.url}
                                notice={notice}
                                highlightText={highlightText}
                            />
                        ))}
                    </ul>
                )}
            </SearchListSection>
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