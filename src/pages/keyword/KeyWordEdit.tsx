import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import KeyWord from "./components/KeyWord";
import AlertBox from "../../components/AlertBox";
import {useAlertBox} from "../../hooks/alertBox/useAlertBox";
import KeyWordInputSection from "./components/KeyWordInputSection";
import CommonButton from "../../components/CommonButton";
import NotificationModal from "./components/NotificationModal";
import postKeyword from "../../apis/keyword/postKeyword";
import getKeywordList from "../../apis/keyword/getKeywordList";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import deleteKeyword from "../../apis/keyword/deleteKeyword";

interface Keyword {
    notifyId: number;
    keyword: string;
}

export default function KeyWordEdit() {
    const queryClient = useQueryClient();

    const [keyWord, setKeyWord] = useState<string>('');
    const [keywordList, setKeywordList] = useState<string[]>([]);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {isAlert, showAlert} = useAlertBox();

    // 로그인 되어있는지 확인
    const isFirst = true;

    const fallback: string[] = [];
    const {data: Keywords = fallback} = useQuery({
        queryKey: ["keywords"],
        queryFn: getKeywordList,
        staleTime: 100000,
    });

    const {mutate: deleteKeywordMutate} = useMutation({
        mutationFn: (notifyId: number) => deleteKeyword(notifyId),
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: ['keywords']}),
    });

    const {mutate: postKeywordMutate} = useMutation({
        mutationFn: (keywords: string[]) => postKeyword(keywords),
        onSuccess: (data) => {
            console.log("Success: ", data);
            if (isFirst) {
                setIsModalOpen(true)
            } else {
                showAlert(true);
            }
            queryClient.invalidateQueries({queryKey: ['keywords']});
        },
        onError: (error) => {
            console.error("Error: ", error);
        },
    });

    const isAddActive: boolean = keyWord.length > 0;
    const isMax: boolean = Keywords.data?.length === 5;

    const addKeyWordClick = (keyword: string) => {
        if (Keywords.data?.some((item: Keyword) => item.keyword === keyword)) {
            // 에러처리
            return;
        }
        setKeywordList((prev) => [...prev, keyword]);
        setKeyWord('');
    }

    // api 설정
    const clickButton = async () => {
        postKeywordMutate(keywordList);

    }

    return (
        <>
            <NotificationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <KeywordSection>
                {isFirst && <KeyWordH1>보고 싶은 공지의<br/>키워드를 입력해 주세요</KeyWordH1>}
                <KeyWordInputSection
                    keyWord={keyWord}
                    setKeyWord={setKeyWord}
                    isAddActive={isAddActive}
                    isMax={isMax}
                    setIsInputFocused={setIsInputFocused}
                    addKeyWordClick={addKeyWordClick}
                />
                <NoticeP $isMax={isMax} $isInputFocused={isInputFocused}>최대 5개까지 추가할 수 있어요</NoticeP>
                <KeyWordWrapper>
                    {/*{keywordList?.map((it: Keyword) =>*/}
                    {/*    <KeyWord*/}
                    {/*        key={it.notifyId}*/}
                    {/*        it={it}*/}
                    {/*        deleteKeywordMutate={deleteKeywordMutate}*/}
                    {/*    />*/}
                    {/*)}*/}
                </KeyWordWrapper>
            </KeywordSection>
            <AlertBox isAlert={isAlert} status={true}/>
            <CommonButton onClick={clickButton} isActive={true}>
                {isFirst ? "다음" : "저장"}
            </CommonButton>
        </>
    );
}

const KeywordSection = styled.section`
    margin-top: 24px;
`;


const KeyWordH1 = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.mainFont};
    margin-bottom: 32px;
`;

const NoticeP = styled.p<{ $isMax: boolean; $isInputFocused: boolean }>`
    margin-top: 12px;
    color: ${({$isMax, $isInputFocused}) => $isMax && $isInputFocused ? '#BD0000' : '#ADADAD'};
    font-size: 14px;
    font-weight: 500;
`;


const KeyWordWrapper = styled.div`
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;