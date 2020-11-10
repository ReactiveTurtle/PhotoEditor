import React, { useState } from 'react';
import './SelectSizePopup.css';
import '../../index.css';
import { dispatch } from '../../statemanager/StateManager';
import { createNewCanvas } from '../../helper/CanvasHelper';
import { Vector2 } from '../../structures/Vector2';
import EditText from '../../edittext/EditText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { Button, createStyles, Dialog, IconButton, Slide, SvgIcon, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        title: {
            fontFamily: "cursive"
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classes.title} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function SelectSizeDialog() {
    const [open, setOpen] = React.useState(false);
    const [size] = useState<Vector2>({ x: 800, y: 600 })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        dispatch(createNewCanvas, size);
    };

    return (
        <div>
            <IconButton aria-label="Создать полотно"
                color="inherit"
                onClick={handleClickOpen}>
                <SvgIcon>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </SvgIcon>
            </IconButton>
            <Dialog
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Выберите размер
                </DialogTitle>
                <DialogContent dividers>
                    <EditText title="Ширина" type="number"
                        hintText="Введите значение"
                        min="1"
                        text={size.x + ""}
                        onChange={(e) => size.x = parseInt(e.target.value)}></EditText>
                    <EditText title="Ширина" type="number"
                        hintText="Введите значение"
                        min="1"
                        text={size.y + ""}
                        onChange={(e) => size.x = parseInt(e.target.value)}></EditText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Создать
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
