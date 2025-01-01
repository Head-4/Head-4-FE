import React from 'react';

interface UniversityEditProps {
    university: string;
    setUniversity: React.Dispatch<React.SetStateAction<string>>;
    setCampus: React.Dispatch<React.SetStateAction<string>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UniversityEdit({university, setUniversity, setCampus, setIsEdit}: UniversityEditProps) {
    const universityList: string[] = ["상명대학교", "단국대학교", "백석대학교"];

    const clickCampusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCampus(e.target.value);
    }

    return (
        <>
            <div>
                <label htmlFor="univ-search">대학 선택:</label>
                <input
                    list="search-university"
                    id="search"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="대학 선택해"
                />
                <datalist id="search-university">
                    {universityList.map((univ, index) => (
                        <option key={index} value={univ}/>
                    ))}
                </datalist>
            </div>
            {university &&
                <div>
                    <label>
                        <input
                            type="radio"
                            name="campus"
                            value="seoul"
                            onChange={clickCampusChange}
                        />
                        서울
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="campus"
                            value="cheonan"
                            onChange={clickCampusChange}
                        />
                        천안
                    </label>
                </div>
            }
            <button onClick={() => setIsEdit(false)}>
                저장
            </button>
        </>
    );
}
