import {useEffect, useState} from "react";

export const useAlertBox = () => {
    const [isAlert, setIsAlert] = useState<boolean>(false);

    const showAlert = (isAlert: boolean) => {
        setIsAlert(isAlert);
    }

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return {
        isAlert,
        showAlert
    }
}