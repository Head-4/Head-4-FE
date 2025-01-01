import React from 'react';

interface CategoryEditProps {
    categoryList: string[];
    setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CATEGORY_LIST: string[] = [
    '장학금',
    '행사',
    '학점',
];

export default function CategoryEdit({categoryList, setCategoryList, setIsEdit}: CategoryEditProps) {
    const clickCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategoryList((prevSelected: string[]): string[] =>
            prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
        );
    }

    return (
        <div>
            {CATEGORY_LIST.map((category) =>
                <label>
                    <input
                        type="checkbox"
                        value={category}
                        checked={categoryList.includes(category)}
                        onChange={clickCategoryChange}
                    />
                    {category}
                </label>
            )}
            <br/>
            <button onClick={() => setIsEdit(false)}>
                저장 버튼
            </button>
        </div>
    );
}
