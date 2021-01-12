
import React from "react";
import { createStyles, IconButton, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const titleStyles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: "#FFFFFF8a",
            borderRadius: "50%",
            backgroundColor: "#cfcfcf21",
            boxShadow: "4px 4px 16px #55555521, -4px -4px 16px #ffffff21"
        },
        title: {
            userSelect: "none",
            msUserSelect: "none",
            fontFamily: "cursive",
            color: "#FFFFFFd0",
            marginLeft: theme.spacing(2)
        }
    });

export interface DialogTitleProps extends WithStyles<typeof titleStyles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(titleStyles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classes.title} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton type="submit" aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default DialogTitle;
