import React from 'react';

type CategorySelectionProps = {
    clickNext: () => void;
    clickPrev: () => void;
};

export default function CategorySelection({clickNext, clickPrev}: CategorySelectionProps) {
    return (
        <div>
            카테고리
            <button onClick={clickPrev}>이전</button>
            <button onClick={clickNext}>다음</button>
        </div>
    );
}