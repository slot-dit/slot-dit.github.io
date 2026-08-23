import React from "react";
import {useTextColors} from "./ColorContext";

const Abstract: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { textColor } = useTextColors();
    return (
        <div className="abstract-copy" style={{color: textColor}}>
            {children}
        </div>
    );
};

export default Abstract;
