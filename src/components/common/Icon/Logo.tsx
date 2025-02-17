import * as React from 'react';

function Logo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" {...props}>
            <rect width="44" height="44" fill="url(#a)" fillOpacity=".5" rx="12" />
            <path
                fill="url(#b)"
                fillRule="evenodd"
                d="M21 11.433v.067a2.5 2.5 0 1 1-.87-1.896C21.142 9.296 22.355 9 23.333 9 29.777 9 35 14.223 35 20.667c0 3.39-.474 6.673-1.359 9.783a1 1 0 1 1-1.923-.548A33.688 33.688 0 0 0 33 20.667 9.667 9.667 0 0 0 23.333 11c-.616 0-1.473.184-2.334.433Zm-6.04 4.401a1 1 0 0 0-1.732-1.001 11.617 11.617 0 0 0-1.561 5.834 12.28 12.28 0 0 1-1.233 5.381 1 1 0 1 0 1.799.875 14.28 14.28 0 0 0 1.434-6.256c0-1.763.47-3.412 1.292-4.833Zm8.373-1.5A6.333 6.333 0 0 0 17 20.666c0 2.624-.569 5.105-1.588 7.334a2.5 2.5 0 1 0 1.862.737A19.582 19.582 0 0 0 19 20.667a4.333 4.333 0 1 1 8.666 0c0 .159 0 .318-.003.477a2.5 2.5 0 1 0 1.997.141c.005-.206.006-.412.006-.618a6.333 6.333 0 0 0-6.333-6.334Zm1 6.333a1 1 0 0 0-2 0c0 4.495-1.289 8.687-3.517 12.229a1 1 0 1 0 1.693 1.065 24.888 24.888 0 0 0 3.824-13.294Zm4.19 8.272a1 1 0 1 0-1.924-.545 28.177 28.177 0 0 1-1.92 4.95 1 1 0 1 0 1.787.895 30.184 30.184 0 0 0 2.057-5.3Z"
                clipRule="evenodd"
            />
            <defs>
                <linearGradient id="a" x1="42.35" x2="3.3" y1="44" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5C697D" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".81" />
                </linearGradient>
                <linearGradient id="b" x1="16.5" x2="24.5" y1="12.5" y2="31" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff" />
                    <stop offset="1" stopColor="#A2A6AD" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export { Logo };
