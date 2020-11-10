import React from 'react';
import { ChangeEvent } from "react";
import './EditText.css';

interface EditTextProps {
    id?: string,
    title: string,
    text: string,
    min?: string,
    hintText?: string,
    type: string,
    onChange(e: ChangeEvent<HTMLInputElement>): void
}

export default function EditText(props: EditTextProps) {
    return (
        <div className="EditText-input">
            <input
                className="Number-input"
                id={props.id}
                type={props.type}
                min={props.min}
                defaultValue={props.text}
                placeholder={props.hintText}
                onChange={(e) => props.onChange(e)}></input>
            <label className="Number-label" htmlFor="newWidth">{props.title}</label>
        </div>
    );
}