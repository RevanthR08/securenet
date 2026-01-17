import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BoxesCore = ({ className, ...rest }) => {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);

    // Color palette for hover effects
    const colors = [
        "rgb(125, 211, 252)", // sky-300
        "rgb(249, 168, 212)", // pink-300
        "rgb(134, 239, 172)", // green-300
        "rgb(253, 224, 71)",  // yellow-300
        "rgb(252, 165, 165)", // red-300
        "rgb(216, 180, 254)", // purple-300
        "rgb(147, 197, 253)", // blue-300
        "rgb(165, 180, 252)", // indigo-300
        "rgb(196, 181, 253)", // violet-300
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
                position: 'absolute',
                left: '25%',
                top: '-25%',
                display: 'flex',
                width: '100%',
                height: '100%',
                zIndex: 0,
                padding: '1rem'
            }}
            className={cn("boxes-container", className)}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row${i}`}
                    style={{
                        width: '4rem',
                        height: '2rem',
                        borderLeft: '1px solid #334155',
                        position: 'relative'
                    }}
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: getRandomColor(),
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            key={`col${j}`}
                            style={{
                                width: '4rem',
                                height: '2rem',
                                borderRight: '1px solid #334155',
                                borderTop: '1px solid #334155',
                                position: 'relative'
                            }}
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    style={{
                                        position: 'absolute',
                                        height: '1.5rem',
                                        width: '2.5rem',
                                        top: '-14px',
                                        left: '-22px',
                                        color: '#334155',
                                        strokeWidth: '1px',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
