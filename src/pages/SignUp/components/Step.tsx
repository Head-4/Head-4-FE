import React from 'react';
import styled from "styled-components";

type StepProps = {
    steps: string[];
    currentStep: number;
};

export default function Step({steps, currentStep}: StepProps) {
    return (
        <StepWrapper>
            {steps.map((step, idx) => (
                <StepItem key={idx} $isCompleted={idx <= currentStep} $isCurrent={idx === currentStep}>
                    {step}
                </StepItem>
            ))}
        </StepWrapper>
    );
}

const StepWrapper = styled.section`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const StepItem = styled.div<{ $isCompleted: boolean; $isCurrent: boolean }>`
    font-weight: bold;
    color: ${({$isCompleted, $isCurrent}) =>
            $isCurrent ? 'rgb(255, 165, 0)' :
                    $isCompleted ? 'rgb(79 70 229)' : 'black'};
`;