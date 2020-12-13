import React from 'react';
import '../../index.css';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { Button, createStyles, Dialog, IconButton, Slide, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
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

interface PasteArtDialogProps {
    isOpen: boolean,
    onSaveSize: Function,
    onChangeSize: Function,
    onClose: Function
}

export default function PasteArtDialog(props: PasteArtDialogProps) {
    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                onClose={() => props.onClose()}
                aria-labelledby="customized-dialog-title"
                open={props.isOpen}>
                <DialogTitle id="customized-dialog-title"
                    onClose={() => props.onClose()}>
                    Выберите действие
                </DialogTitle>
                <DialogContent dividers>
                    <Button autoFocus onClick={() => {
                        props.onSaveSize();
                        props.onClose()
                    }} color="primary">
                        Сохранить размер полотна
                    </Button>
                    <Button autoFocus onClick={() => {
                        props.onChangeSize();
                        props.onClose();
                    }} color="primary">
                        Изменить размер полотна
                    </Button>
                    <Button autoFocus onClick={() => props.onClose()} color="primary">
                        Отмена
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
