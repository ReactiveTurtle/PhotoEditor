import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import useStyles from "./ReactiveTextFieldStyle";

export interface ReactiveTextFieldProps {
    id?: string;
    className?: string;
    label: string;
    text?: string;
    defaultText?: string;
    min?: string;
    autocomplete?: string;
    type: string,
    onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onClick?: Function;
}

const ReactiveTextField = (props: ReactiveTextFieldProps) => {
    const classes = useStyles();
    return (
        <TextField
            classes={{ root: `${classes.root} ${props.className}` }}
            label={props.label}
            id={props.id === undefined ? "outlined-textfield" : props.id}
            variant="outlined"
            autoComplete={props.autocomplete}
            InputProps={{
                inputProps: { min: props.min }
            }}
            type={props.type}
            value={props.text}
            defaultValue={props.defaultText}
            onFocus={() => {
                if (props.onClick !== undefined) {
                    props.onClick();
                }
            }}
            onClick={() => {
                if (props.onClick !== undefined) {
                    props.onClick();
                }
            }}
            onChange={(e) => props.onChange(e)} />
    );
};


export default ReactiveTextField;
