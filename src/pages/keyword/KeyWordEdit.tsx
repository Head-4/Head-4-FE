import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import KeyWord from "./components/KeyWord";
import AlertBox from "../../components/AlertBox";
import {useAlertBox} from "../../hooks/alertBox/useAlertBox";
import KeyWordInputSection from "./components/KeyWordInputSection";
import CommonButton from "../../components/CommonButton";
import {useNavigate} from "react-router-dom";

interface keyWord {
    id: number;
    content: string;
}

export default function KeyWordEdit() {
    const navigate = useNavigate();
    const [keyWord, setKeyWord] = useState<string>('');
    const [keyWordList, setKeyWordList] = useState<keyWord[]>([
        {id: 1, content: '장학'},
        {id: 2, content: '학점'},
    ]);

    // 캐싱된 서버 데이터와 비교해서 바뀐게 있으면 BUTTON을 ON
    const prevKeyWordList = useRef<keyWord[]>(keyWordList);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const {isAlert, showAlert} = useAlertBox();

    // 로그인 되어있는지 확인
    const isLogin = false;

    // 여기는 서버데이터 받아오고 수정이 필요하다
    useEffect(() => {
        if (prevKeyWordList.current !== keyWordList) {
            prevKeyWordList.current = keyWordList;
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    }, [keyWordList, isAlert]);

    const isAddActive: boolean = keyWord.length > 0;
    const isMax: boolean = keyWordList.length === 5;

    const addKeyWordClick = () => {
        if (keyWordList.some((item) => item.content === keyWord)) {
            // 에러처리
            return;
        }
        setKeyWordList([...keyWordList, {id: Date.now(), content: keyWord}]);
        setKeyWord('');
    }

    const deleteKeyWordClick = (id: number) => {
        setKeyWordList(keyWordList.filter((it) => it.id !== id));
    };

    // api 설정
    const clickButton = () => {
        if (isLogin) {
            showAlert(true);
        } else {
            navigate('/register/complete');
        }
    }

    return (
        <>
            <KeywordSection>
                {isLogin && <KeyWordH1>보고 싶은 공지의<br/>키워드를 입력해 주세요</KeyWordH1>}
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
                    {keyWordList.map((it) =>
                        <KeyWord
                            key={it.id}
                            it={it}
                            deleteKeyWordClick={deleteKeyWordClick}
                        />
                    )}
                </KeyWordWrapper>
            </KeywordSection>
            <AlertBox isAlert={isAlert} status="failure"/>
            {/*<GlobalButton isActive={isEdit} showAlert={showAlert}/>*/}
            <CommonButton onClick={clickButton} isActive={isEdit}>
                {isLogin ? "저장" : "다음"}
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