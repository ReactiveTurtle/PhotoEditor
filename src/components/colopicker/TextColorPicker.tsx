import React, { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import EditText from '../../edittext/EditText';
import { toHexColor, toRGBAColor } from '../../helper/ColorHelper';
import { render } from '../../statemanager/StateManager';
import { RGBAColor } from '../../structures/RGBAColor';

interface ColorPickerProps {
    id: string,
    title: string,
    defaultColor: RGBAColor,
    onChange(color: RGBAColor): void
}

export default function TextColorPicker(props: ColorPickerProps) {
    const [color, setColor] = useState(props.defaultColor)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const handleChange = (result: ColorResult) => {
        if (result !== undefined) {
            let alpha = result.rgb.a;
            if (alpha === undefined) {
                alpha = 1;
            }
            const newColor = { r: result.rgb.r, g: result.rgb.g, b: result.rgb.b, a: alpha };
            setColor(newColor);
            (document.getElementById(props.id) as HTMLInputElement).value = `${toHexColor(newColor)}`
            props.onChange(newColor);
        }
    };

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };
    const popover: CSSProperties = {
        position: 'fixed',
        zIndex: 4
    }

    const cover: CSSProperties = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    return (
        <div>
            <div>
                {displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={handleClose} />
                    <div ref={
                        (e) => {
                            if (e !== null) {
                                e.style.transform = `translateY(${-e.clientHeight - 8}px)`;
                            }
                        }}>
                        <ChromePicker
                            color={{ r: color.r, g: color.g, b: color.b, a: color.a }}
                            disableAlpha={false}
                            onChangeComplete={handleChange}
                            onChange={handleChange}>
                        </ChromePicker>
                    </div>
                </div> : null}
                <EditText
                    id={props.id}
                    title={props.title}
                    text={toHexColor(color)}
                    type="text"
                    onClick={handleClick}
                    onChange={(e) => {
                        (e.target as HTMLInputElement).oninput = null;
                        const newColor = toRGBAColor(e.target.value);
                        setColor(newColor);
                        props.onChange(newColor);
                        render();
                    }}></EditText>
            </div>
        </div >
    );
}