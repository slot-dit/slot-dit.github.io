import React from 'react';
import { useTextColors } from './ColorContext';

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { textColor } = useTextColors();

    return <h1 className="site-title" style={{color: textColor}}>{children}</h1>;
};

export default Title;
