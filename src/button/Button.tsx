import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string,
    onClick: ((event: React.MouseEvent) => void)
}

function Button(props: ButtonProps) {
    return (
        <div className="Button" onClick={props.onClick}>
            {props.text}
        </div>
    );
}

export default Button;
