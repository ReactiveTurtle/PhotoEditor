import { Button, IconButton, SvgIcon } from '@material-ui/core';
import { Photo } from 'pexels';
import React, { useEffect, useState } from 'react';
import { Vector2 } from '../../../structures/Vector2';
import ReactiveDialog from '../../reactivedialog/ReactiveDialog';
import ReactiveTextField from '../../reactivetextfield/ReactiveTextField';
import useStyles from './PexelsSelectSizeDialogStyle';

interface PexelsSelectSizeDialogProps {
    photo: Photo | null,
    isOpen: boolean,
    onClose: () => void,
    onResult: (size: Vector2, url: string) => void,
}

export default function PexelsSelectSizeDialog(props: PexelsSelectSizeDialogProps) {
    const classes = useStyles();
    const [canApply, setCanApply] = useState(true);
    const [size, setSize] = useState<Vector2>({ x: 0, y: 0 });
    const handleClick = () => {
        if (canApply) {
            props.onClose();
            if (props.photo === null) {
                throw new Error("Photo is null");
            }
            props.onResult(size, props.photo.src.original);
        }
    }

    const handleClose = () =>{
        setCanApply(true);
        props.onClose();
    }
 
    useEffect(() => {
        if (!props.isOpen && size.x !== 0) {
            setSize({ x: 0, y: 0 });
        } else if (props.photo !== null && size.x === 0) {
            setSize({
                x: props.photo.width,
                y: props.photo.height
            });
        }
    }, [props, size]);
    return (
        <ReactiveDialog
            title="Выберите размер картинки"
            paperStyle={{
                width: "fit-content",
            }}
            contentStyle={{
                display: "inline-flex"
            }}
            isOpen={props.isOpen}
            onClose={handleClose}
            actions={() => {
                return (
                    <Button autoFocus onClick={() => handleClick()} color="secondary">
                        Далее
                    </Button>
                );
            }}>
            <ReactiveTextField
                className={classes.searchField}
                text={canApply ? size.x.toString() : ""}
                type="number"
                label="Ширина"
                min="0"
                onChange={(e) => {
                    setCanApply(e.target.value !== "");
                    if (e.target.value !== "") {
                        const newSize = {
                            x: Math.abs(parseInt(e.target.value)),
                            y: 0
                        }
                        if (props.photo !== null) {
                            newSize.y = Math.round(newSize.x * props.photo.height / props.photo.width);
                        }
                        setSize(newSize);
                    }
                }} />

            <div className={classes.searchButtonWrapper}>
                <IconButton
                    disabled
                    type="submit"
                    aria-label="search">
                    <SvgIcon viewBox="0 0 24 24">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 
                                5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 
                                1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                            fill="#FFFFFF8a" />
                    </SvgIcon>
                </IconButton>
            </div>

            <ReactiveTextField
                className={classes.searchField}
                text={canApply ? size.y.toString() : ""}
                type="number"
                label="Высота"
                min="0"
                onChange={(e) => {
                    setCanApply(e.target.value !== "");
                    if (e.target.value !== "") {
                        const newSize = {
                            x: 0,
                            y: Math.abs(parseInt(e.target.value))
                        }
                        if (props.photo !== null) {
                            newSize.x = Math.round(newSize.y * props.photo.width / props.photo.height);
                        }
                        setSize(newSize);
                    }
                }} />
        </ReactiveDialog>
    );
}