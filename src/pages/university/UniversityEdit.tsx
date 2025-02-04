import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import DropDown from "./components/DropDown";
import AlertBox from "../../components/AlertBox";
import {useAlertBox} from "../../hooks/alertBox/useAlertBox";
import CommonButton from "../../components/CommonButton";
import {useNavigate} from "react-router-dom";
import patchUniversity from "../../apis/university/patchUniversity";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import getUniversity from "../../apis/university/getUniversity";
import Typography from "../../components/Typography";
import {UNIVERSITY_LIST} from "../../utils/const";

export default function UniversityEdit() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const [university, setUniversity] = useState<string>('');
    const [hasText, setHasText] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>(UNIVERSITY_LIST);
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const {isAlert, showAlert, result} = useAlertBox();

    const isFirst = JSON.parse(localStorage.getItem('isFirst') || 'false');

    const {data} = useQuery({
        queryKey: ["university"],
        queryFn: getUniversity,
        staleTime: 100000,
    });

    const {mutate: patchUniversityMutate} = useMutation({
        mutationFn: (university: string) => patchUniversity(university),
        onSuccess: (data) => {
            console.log("Success: ", data);
            queryClient.invalidateQueries({queryKey: ['university']});
            queryClient.invalidateQueries({queryKey: ['articles']});
            if (isFirst) {
                navigate('/register/keyword');
            } else {
                showAlert(true, data?.data.success);
            }
        },
        onError: (error) => {
            console.error("Error: ", error);
        },
    });

    useEffect(() => {
        if (university === '') {
            setHasText(false);
            setOptions([]);
        } else {
            setOptions(UNIVERSITY_LIST.filter((it) => it.includes(university)));
            setButtonActive(UNIVERSITY_LIST.some((it) => it === university));
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

    const clickButton = async () => {
        setUniversity('');
        setButtonActive(false);
        patchUniversityMutate(university);
    }

    const showDropDown = options.length > 0 && hasText;

    return (
        <>
            <UniversitySection>
                {data?.data ?
                    <UniversityCurrent>
                        <span>현재 학교</span>
                        <span>{data?.data}</span>
                    </UniversityCurrent>
                    :
                    <Typography typoSize="H3" color="Black" style={{marginBottom: "32px"}}>
                        공지를 받아 볼<br/>학교를 선택해 주세요</Typography>
                }
                <div ref={inputRef}>
                    <UnivInput type="text"
                               list="search-university"
                               value={university}
                               onChange={InputUniversityChange}
                               $showDropDown={showDropDown}
                               placeholder='학교명 검색'
                    />

                    {showDropDown && (
                        <DropDown
                            options={options}
                            DropDownClick={DropDownClick}
                            searchInput={university}/>
                    )}
                </div>
            </UniversitySection>
            <AlertBox isAlert={isAlert} status={result}/>
            <CommonButton onClick={clickButton} isActive={buttonActive}>
                {isFirst ? "다음" : "저장"}
            </CommonButton>
        </>
    );
}

const UniversitySection = styled.section`
    margin-top: 24px;
`;

const UniversityCurrent = styled.h2`
    color: #8F8F8F;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;

    span:last-of-type {
        margin-left: 12px;
        font-weight: 600;
        color: ${({theme}) => theme.Blue};
    }
`;

const UnivInput = styled.input<{ $showDropDown: boolean }>`
    width: 100%;
    padding: 20px;
    border-radius: ${({$showDropDown}) => $showDropDown ? '12px 12px 0 0' : '12px'};
    border: 1px solid ${({theme}) => theme.LightGray};
    border-bottom: ${({$showDropDown}) => $showDropDown ? 'none' : '1px solid #E9E9E9'};
    font-size: 18px;
    font-weight: 600;
    color: ${({theme}) => theme.Black};

    &:focus {
        border-color: ${({theme}) => theme.Blue};
    }

    &::placeholder {
        color: #ADADAD;
    }
`;