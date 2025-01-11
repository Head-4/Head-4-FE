import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import GlobalButton from "../../components/GlobalButton";
import Row from "../../styles/Common/Row";
import KeyWord from "./components/KeyWord";
import {ReactComponent as AddIcon} from "../../assets/KeyWord/AddIcon.svg";
import AlertBox from "../../components/AlertBox";
import {useAlertBox} from "../../hooks/alertBox/useAlertBox";

interface keyWord {
    id: number;
    content: string;
}

export default function KeyWordEdit() {
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
    const isLogin = true;

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
        if (isMax) {
            alert("5개만 가능합니다.");
            setKeyWord('');
            return;
        }
        if (keyWordList.some((item) => item.content === keyWord)) {
            alert("이미 추가된 키워드입니다.");
            return;
        }
        setKeyWordList([...keyWordList, {id: Date.now(), content: keyWord}]);
        setKeyWord('');
    }

    const deleteKeyWordClick = (id: number) => {
        setKeyWordList(keyWordList.filter((it) => it.id !== id));
    };

    return (
        <>
            <KeywordSection>
                {isLogin ?
                    <></>
                    :
                    <KeyWordH1>보고 싶은 공지의<br/>키워드를 입력해 주세요</KeyWordH1>
                }
                <Row $gap={12} $verticalAlign="center">
                    <KeyWordInput
                        value={keyWord}
                        onChange={(e) => setKeyWord(e.target.value)}
                        $isMax={isMax}
                        readOnly={isMax}
                        placeholder='키워드 입력'
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    <AddButton
                        onClick={addKeyWordClick}
                        disabled={!isAddActive}
                        $isAddActive={isAddActive}
                    >
                        <AddIcon/>
                        <AddLabel>추가하기</AddLabel>
                    </AddButton>
                </Row>
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
            <GlobalButton isActive={isEdit} showAlert={showAlert}/>
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

const KeyWordInput = styled.input<{ $isMax: boolean }>`
    width: calc(100% - 55px);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #E9E9E9;
    font-size: 18px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.mainFont};

    &:focus {
        border-color: ${({$isMax}) => $isMax ? '#BD0000' : ({theme}) => theme.colors.primary};
    }

    &::placeholder {
        color: #ADADAD;
    }
`;

const AddButton = styled.button<{ $isAddActive: boolean }>`
    color: ${({$isAddActive}) => $isAddActive ? ({theme}) => theme.colors.primary : '#DBDBDB'};
`;

const AddLabel = styled.div`
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
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