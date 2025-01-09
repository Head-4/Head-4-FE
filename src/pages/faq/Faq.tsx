import React, {useState} from 'react';
import GlobalButton from "../../components/GlobalButton";
import styled from "styled-components";
import {ReactComponent as FaqIcon} from "../../assets/faq/FaqIcon.svg";

export default function Faq() {
    const [faqInput, setFaqInput] = useState<string>('');

    return (
        <>
            <FaqSection>
                <FaqInput
                    rows={20}
                    value={faqInput}
                    onChange={(e) => setFaqInput(e.target.value)}
                    placeholder="건의할 내용을 입력해 주세요"
                />
                <FaqInfo>
                    <FaqH2><FaqIcon/>알려드려요</FaqH2>
                    <FaqP>· 건의 내용을 자세하게 적어주시면 빠른 답변에 도움돼요</FaqP>
                    <FaqP>· 보내주신 건의의 답변에는 시간이 조금 소요될 수 있어요</FaqP>
                    <FaqP>· 더 편리한 우리의 공지 사용을 위해 모든 건의는 기록으로 남아 보관돼요</FaqP>
                </FaqInfo>
            </FaqSection>
            <GlobalButton isActive={faqInput.length > 0}/>
        </>
    );
}

const FaqSection = styled.section`
    margin-top: 20px;
`;

const FaqInput = styled.textarea`
    color: ${({theme}) => theme.colors.mainFont};
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    resize: none;

    &::placeholder {
        color: #ADADAD;
    }
`;

const FaqInfo = styled.div`
    margin-top: 12px;
`;

const FaqH2 = styled.h2`
    margin-bottom: 8px;
    display: flex;
    column-gap: 4px;
    color: #707070;
    font-size: 14px;
    font-weight: 500;
`;

const FaqP = styled.p`
    color: #949494;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
`;