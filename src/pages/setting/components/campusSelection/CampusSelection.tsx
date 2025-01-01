import React, {useState} from 'react';
import UniversityInfo from "./UniversityInfo";
import UniversityEdit from "./UniversityEdit";
import styled from "styled-components";

export default function CampusSelection() {
    const [university, setUniversity] = useState<string>('');
    const [campus, setCampus] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <CampusSelectionWrapper>
            {isEdit ?
                <UniversityEdit university={university} setUniversity={setUniversity} setCampus={setCampus} setIsEdit={setIsEdit}/>
                :
                <UniversityInfo university={university} campus={campus} setIsEdit={setIsEdit}/>
            }
        </CampusSelectionWrapper>
    );
}

const CampusSelectionWrapper = styled.section`
    border: 1px solid black;
`;