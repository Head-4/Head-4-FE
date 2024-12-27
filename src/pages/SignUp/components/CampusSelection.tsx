import React from 'react';

type CampusSelectionProps = {
    clickNext: () => void;
    clickPrev: () => void;
};

export default function CampusSelection({clickNext, clickPrev}: CampusSelectionProps) {
    return (
        <div>
            캠퍼스 선택
            <br/>
            <button onClick={clickPrev}>이전</button>
            <button onClick={clickNext}>다음</button>
        </div>
    );
}
