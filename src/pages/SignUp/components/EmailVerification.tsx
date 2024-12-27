import React from 'react';

type EmailVerificationProps = {
    clickNext: () => void;
};

export default function EmailVerification({clickNext}: EmailVerificationProps) {
    return (
        <div>
            이메일 인증
            <br/>
            <button onClick={clickNext}>
                다음
            </button>
        </div>
    );
}