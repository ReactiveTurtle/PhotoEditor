import React from "react";
import { Slide, Theme, withStyles } from "@material-ui/core";
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import DialogTitle from "./DialogTitle";

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

const Dialog = withStyles((theme: Theme) => ({
    root: {
        "& .MuiDialog-paper": {
            background: "#cfcfcf33",
            boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.2 )",
            backdropFilter: "blur(10.0px)",
            WebkitBackdropFilter: "blur( 10.0px )",
            borderRadius: "32px",
            borderTop: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderLeft: "1px solid rgba( 255, 255, 255, 0.18 )"
        },
        '& label': {
            color: "#FFFFFF8a"
        },
        '& label.Mui-focused': {
            color: "#62ebff"
        },
        '& .MuiInputBase-root': {
            color: "white"
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: "#cfcfcf21",
            boxShadow: "4px 4px 16px #55555521, -4px -4px 16px #ffffff21",
            '& fieldset': {
                borderColor: "transparent"
            },
            '&:hover fieldset': {
                borderColor: "transparent",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#62ebff42"
            }
        }
    },
}))(MuiDialog);

interface ReactiveDialogProps {
    isOpen: boolean,
    children: React.ReactNode,
    actions?: () => JSX.Element,
    paperStyle?: CSSProperties,
    contentStyle?: CSSProperties,
    title: string,
    onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void,
    onClose: () => void
}

function ReactiveDialog(props: ReactiveDialogProps) {
    const close = () => {
        props.onClose();
    }
    return (
        <Dialog
            PaperProps={{
                style: {
                    ...props.paperStyle,
                }
            }}
            TransitionComponent={Transition}
            onClose={() => close()}
            aria-labelledby="customized-dialog-title"
            open={props.isOpen}>
            <DialogTitle id="customized-dialog-title"
                onClose={() => close()}>
                {props.title}
            </DialogTitle>
            <DialogContent dividers
                onScroll={props.onScroll}
                style={props.contentStyle}>
                {props.children}
            </DialogContent>
            {props.actions !== undefined && <DialogActions>
                {props.actions !== undefined && props.actions()}
            </DialogActions>}
        </Dialog>
    );
}

export default ReactiveDialog;
