import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Dynamic text component that changes color based on current theme
export const DynamicText = ({ children, variant = 'primary', className = '', style = {}, ...props }) => {
    const { currentTheme } = useTheme();

    const getColor = () => {
        switch (variant) {
            case 'primary':
                return currentTheme.primary;
            case 'secondary':
                return currentTheme.secondary;
            case 'accent':
                return currentTheme.accent;
            default:
                return currentTheme.primary;
        }
    };

    const getGlow = () => {
        return currentTheme.textGlow;
    };

    return (
        <span
            className={className}
            style={{
                color: getColor(),
                transition: 'color 0.8s ease-in-out',
                ...style
            }}
            {...props}
        >
            {children}
        </span>
    );
};

export default DynamicText;
