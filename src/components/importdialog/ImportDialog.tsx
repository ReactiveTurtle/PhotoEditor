import React from 'react';
import '../../index.css';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {
    createStyles, Dialog, Icon, IconButton,
    List, ListItem, ListItemIcon, ListItemText,
    Slide, SvgIcon, Theme, Typography, withStyles, WithStyles
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { ImportType } from '../../structures/ImportType';
import PexelsIcon from '../../images/ic_pexels.webp';
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            width: "256px"
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

interface ImportDialogProps {
    onApply(importType: ImportType): void
}


export default function ImportDialog(props: ImportDialogProps) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenWithAction = (type: ImportType) => {
        props.onApply(type);
        handleClose();
    };

    return (
        <div>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}>
                <SvgIcon viewBox="0 0 24 24">
                    <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" />
                </SvgIcon>
            </IconButton>
            <Dialog
                TransitionComponent={Transition}
                onClose={() => handleClose()}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title"
                    onClose={() => handleClose()}>
                    Вставка изображения
                </DialogTitle>
                <DialogContent dividers>
                    <List component="nav" aria-label="">
                        <ListItem button onClick={() => handleClickOpenWithAction(ImportType.STORAGE)}>
                            <ListItemIcon>
                                <SvgIcon viewBox="0 0 24 24">
                                    <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary="Компьютер" />
                        </ListItem>
                        <ListItem button onClick={() => handleClickOpenWithAction(ImportType.PEXELS)}>
                            <ListItemIcon>
                                <Icon style={{ textAlign: "center" }}>
                                    <img src={PexelsIcon} alt="ic_pexels" width="90%" height="90%"
                                        style={{ marginBottom: "20%" }}></img>
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary="Сервис Pexels" />
                        </ListItem>
                        <ListItem button onClick={() => handleClickOpenWithAction(ImportType.WEB_CAMERA)}>
                            <ListItemIcon>
                                <SvgIcon viewBox="0 0 24 24">
                                    <path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 
                                    2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 
                                    9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 
                                    4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 
                                    12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 
                                    2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 
                                    15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 
                                    2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z" />
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText primary="Веб-камера" />
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
}
