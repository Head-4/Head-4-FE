import {css, CSSObject} from "styled-components";

type DeviceType = "large" | "medium" | "small";

const sizes: Record<DeviceType, number> = {
    large: 1024,
    medium: 768,
    small: 480,//asdasd
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (
            first: CSSObject | TemplateStringsArray,
            ...interpolations: CSSObject[]
        ) => css`
            @media (min-width: ${value}px) {
                ${css(first, ...interpolations)}
            }
        `,
    };
}, {}) as Record<DeviceType, any>;

export {media};