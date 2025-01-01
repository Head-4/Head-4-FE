import React from 'react';

interface UniversityInfoProps {
    university: string;
    campus: string;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UniversityInfo({university, campus, setIsEdit}: UniversityInfoProps) {
    return (
        <section>
            설정 학교:{university}
            <br/>
            캠퍼스:{campus}
            <br/>
            <button onClick={() => setIsEdit(true)}>
                수정 버튼
            </button>
        </section>
    );
}
