import React from 'react';

interface CategoryInfoProps {
    categoryList: string[];
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryInfo({categoryList, setIsEdit}: CategoryInfoProps) {
    return (
        <div>
            {categoryList.map((category, idx) =>
                <div key={idx}>{category}</div>
            )}
            <button onClick={() => setIsEdit(true)}>
                수정 버튼
            </button>
        </div>
    );
}
