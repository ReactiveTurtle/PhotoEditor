import React, { useState } from 'react';
import './SelectSizeDialog.css';
import '../../index.css';
import { Vector2 } from '../../structures/Vector2';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Vector2Action from '../../store/actions/types/Vector2Action';
import ReactiveDialog from '../reactivedialog/ReactiveDialog';
import ReactiveTextField from '../reactivetextfield/ReactiveTextField';
import useStyles from './SelectSizeDialogStyle';

interface SelectSizeDialogProps {
    applyText: string,
    action: Vector2Action,
    children: JSX.Element
}

export default function SelectSizeDialog(props: SelectSizeDialogProps) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [canApply, setCanApply] = useState(true);
    const [size] = useState<Vector2>({ x: 800, y: 600 });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndCreate = () => {
        if (!canApply) {
            return;
        }
        handleClose();
        props.action.value = size;
        dispatch(props.action);
    };

    return (
        <div>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}>
                {props.children}
            </IconButton>
            <ReactiveDialog
                isOpen={open}
                title="Выберите размер"
                onClose={() => handleClose()}
                actions={() => {
                    return (
                        <Button autoFocus onClick={handleCloseAndCreate} color="secondary">
                            {props.applyText}
                        </Button>
                    )
                }}>

                <ReactiveTextField
                    className={classes.searchField}
                    defaultText={size.x + ""}
                    type="number"
                    label="Ширина"
                    min="0"
                    onChange={(e) => {
                        setCanApply(e.target.value !== "");
                        if (e.target.value !== "")
                            size.x = Math.abs(parseInt(e.target.value))
                    }} />

                <ReactiveTextField
                    defaultText={size.y + ""}
                    type="number"
                    label="Высота"
                    min="0"
                    onChange={(e) => {
                        setCanApply(e.target.value !== "");
                        if (e.target.value !== "")
                            size.y = Math.abs(parseInt(e.target.value))
                    }} />
            </ReactiveDialog>
        </div >
    );
}
