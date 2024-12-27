import {useState} from "react";
import Step from "./components/Step";
import EmailVerification from "./components/EmailVerification";
import CampusSelection from "./components/CampusSelection";
import CategorySelection from "./components/CategorySelection";
import SignUpComplete from "./components/SignUpComplete";
import styled from "styled-components";

const steps: string[] = ['이메일 인증', '캠퍼스 선택', '카테고리 선택', '완료'];

export default function SignUp() {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const clickNext = () => {
        setCurrentStep(prev => prev + 1);
    }

    const clickPrev = () => {
        setCurrentStep(prev => prev - 1);
    }

    return (
        <>
            <header>
                <h1> 회원가입</h1>
            </header>
            <MainWrapper>
                <Step steps={steps} currentStep={currentStep}/>
                {currentStep === 0 && <EmailVerification clickNext={clickNext}/>}
                {currentStep === 1 && <CampusSelection clickNext={clickNext} clickPrev={clickPrev}/>}
                {currentStep === 2 && <CategorySelection clickNext={clickNext} clickPrev={clickPrev}/>}
                {currentStep === 3 && <SignUpComplete/>}
            </MainWrapper>
        </>
    );
};

const MainWrapper = styled.main`
    border-radius: 5px;
    border: 1px solid black;
    text-align: center;
`;