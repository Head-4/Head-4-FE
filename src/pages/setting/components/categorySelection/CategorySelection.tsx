import React, {useState} from 'react';
import styled from "styled-components";
import CategoryEdit from "./CategoryEdit";
import CategoryInfo from "./CategoryInfo";

export default function CategorySelection() {
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <CategorySelectionWrapper>
            {isEdit ?
                <CategoryEdit categoryList={categoryList} setCategoryList={setCategoryList} setIsEdit={setIsEdit}/>
                :
                <CategoryInfo categoryList={categoryList} setIsEdit={setIsEdit}/>
            }
        </CategorySelectionWrapper>
    );
}

const CategorySelectionWrapper = styled.section`
    border: 1px solid black;
`;