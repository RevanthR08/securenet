import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import './ArrowDotsButton.css';

export const ArrowDotsButton = forwardRef(({
    children,
    className,
    onClick,
    type = 'button',
    ...props
}, ref) => {
    // Function to generate dot elements for the icons
    const renderDots = () => {
        const dotValues = [2, 1, 0, 1, 2];
        return dotValues.map((value, index) => (
            <span
                key={`dot-${index}`}
                className="arrow-dots-btn__dot"
                style={{ '--index': value }}
            />
        ));
    };

    // Function to generate icon elements with dots
    const renderIcons = () => {
        return [3, 2, 1, 0].map((indexParent) => (
            <span
                key={`icon-${indexParent}`}
                className="arrow-dots-btn__icon"
                style={{ '--index-parent': indexParent }}
            >
                {renderDots()}
            </span>
        ));
    };

    return (
        <button
            type={type}
            className={cn('arrow-dots-btn', className)}
            onClick={onClick}
            ref={ref}
            {...props}
        >
            <span className="arrow-dots-btn__bg" />
            <span className="arrow-dots-btn__inner">
                <span className="arrow-dots-btn__text">{children}</span>
                <span className="arrow-dots-btn__icon-wrap">
                    {renderIcons()}
                </span>
            </span>
        </button>
    );
});

ArrowDotsButton.displayName = 'ArrowDotsButton';
