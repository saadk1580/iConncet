import { FC } from "react";

export const Spinner: FC<{width: number, color: string}> = ({width, color}) => {
    const radius = (width / 2) * 0.8; // 80% of half the width
    const strokeWidth = width * 0.05; // 5% of the width

    // Calculate the strokeDasharray
    const dashArray = `${radius * Math.PI * 0.6}, ${radius * Math.PI * 1.4}`;

    return (
        <svg width={width} height={width} xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx={width / 2} 
                cy={width / 2} 
                r={radius} 
                stroke={color} 
                strokeWidth={strokeWidth} 
                fill="none" 
                strokeDasharray={dashArray}
            >
                <animateTransform 
                    attributeName="transform" 
                    type="rotate"
                    from={`0 ${width / 2} ${width / 2}`}
                    to={`360 ${width / 2} ${width / 2}`}
                    dur="1s"
                    repeatCount="indefinite"/>
            </circle>
        </svg>
    );
}


