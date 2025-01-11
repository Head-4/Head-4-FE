import {useState} from "react";

export const useAsideBar = () => {
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

    const toggleAside = () => {
        setIsAsideOpen((prev) => !prev);
    };

    return {
        isAsideOpen,
        toggleAside,
    }
}