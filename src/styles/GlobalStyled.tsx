import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        height: 100%;
    }

    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        color: #333;
        line-height: 1.5;
        height: 100%;
    }

    #root {
        height: 100%;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: inherit;
        font-weight: inherit;
    }

    ul, ol {
        list-style: none;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    input, textarea, select {
        border: none;
        outline: none;
        padding: 0;
    }

    button {
        border: none;
        background: none;
        cursor: pointer;
    }
`;
