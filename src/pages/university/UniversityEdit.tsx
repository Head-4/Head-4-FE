import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import GlobalButton from "../../components/GlobalButton";
import DropDown from "./components/DropDown";

const universityList: string[] = ["상명대학교 서울캠퍼스", "상명대학교 천안캠퍼스", "단국대학교", "백석대학교"];

export default function UniversityEdit() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [university, setUniversity] = useState<string>('');
    const [hasText, setHasText] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>(universityList);
    const [buttonActive, setButtonActive] = useState<boolean>(false);

    useEffect(() => {
        if (university === '') {
            setHasText(false);
            setOptions([]);
        } else {
            setOptions(universityList.filter((it) => it.includes(university)));
            setButtonActive(universityList.some((it) => it === university));
        }
    }, [university]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current && !inputRef.current.contains(e.target as Node)
            ) {
                setHasText(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const InputUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUniversity(e.target.value);
        setHasText(true);
    };

    const DropDownClick = (clickedUniversity: string) => {
        setUniversity(clickedUniversity);
        setHasText(false);
    };

    const highlightText = (text: string) => {
        if (!university) return text;
        const parts = text.split(new RegExp(`(${university})`, 'gi'));
        return parts.map((part, idx) =>
            part.toLowerCase() === university.toLowerCase()
                ? <HighlightSpan key={idx}>{part}</HighlightSpan>
                : part
        );
    };

    const showDropDown = options.length > 0 && hasText;

    return (
        <>
            <section>
                <UniversityH1>공지를 받아 볼<br/>학교를 선택해 주세요</UniversityH1>
                <div ref={inputRef}>
                    <UnivInput type="text"
                               list="search-university"
                               value={university}
                               onChange={InputUniversityChange}
                               $showDropDown={showDropDown}
                               placeholder='학교명 검색'/>

                    {showDropDown && (
                        <DropDown
                            options={options}
                            DropDownClick={DropDownClick}
                            highlightText={highlightText}/>
                    )}
                </div>
            </section>
            <GlobalButton isActive={buttonActive}/>
        </>
    );
}

const UniversityH1 = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.mainFont};
    margin-bottom: 32px;
`;

const UnivInput = styled.input<{ $showDropDown: boolean }>`
    width: 100%;
    padding: 20px;
    border-radius: ${({$showDropDown}) => $showDropDown ? '12px 12px 0 0' : '12px'};
    border: 1px solid #E9E9E9;
    border-bottom: ${({$showDropDown}) => $showDropDown ? 'none' : '1px solid #E9E9E9'};
    font-size: 18px;
    font-weight: 600;
    color: ${({theme}) => theme.colors.mainFont};

    &:focus {
        border-color: ${({theme}) => theme.colors.primary};
    }

    &::placeholder {
        color: #ADADAD;
    }
`;

const HighlightSpan = styled.span`
    color: ${({theme}) => theme.colors.primary};
    font-weight: 700;
    font-size: 18px;
`;