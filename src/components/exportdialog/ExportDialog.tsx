import React from 'react';
import '../../index.css';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { Button, createStyles, Dialog, DialogActions, FormControl, FormControlLabel, FormLabel, IconButton, makeStyles, Radio, RadioGroup, Slide, Slider, SvgIcon, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { ExportFormat, formatToString } from '../../structures/ExportFormat';

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

interface ExportDialogProps {
    onApply(format: ExportFormat, quality: number): void
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            width: "272px",
            margin: "0 8px"
        },
        quality_label: {
            marginTop: "16px"
        }
    }),
);

export default function ExportDialog(props: ExportDialogProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [format, setFormat] = React.useState<ExportFormat>(ExportFormat.JPEG);
    const [quality, setQuality] = React.useState<number>(90);
    const handleCloseAndCreate = () => {
        handleClose();
        props.onApply(format, quality);
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFormat = (event.target as HTMLInputElement).value;
        switch (newFormat) {
            case "jpeg":
                setFormat(ExportFormat.JPEG);
                break;
            case "png":
                setFormat(ExportFormat.PNG);
                break;
            default:
                throw new Error();
        }
    };

    const handleQualityChange = (v: number) => {
        setQuality(v);
    };
    return (
        <div>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}>
                <SvgIcon>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                </SvgIcon>
            </IconButton>
            <Dialog
                TransitionComponent={Transition}
                onClose={() => handleClose()}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title"
                    onClose={() => handleClose()}>
                    Сохранение
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Формат</FormLabel>
                        <RadioGroup aria-label="format" name="format1" value={formatToString(format)} onChange={handleFormatChange}>
                            <FormControlLabel value="jpeg" control={<Radio />} label="JPEG" />
                            <FormControlLabel value="png" control={<Radio />} label="PNG" />
                        </RadioGroup>
                        <FormLabel component="legend"
                            className={classes.quality_label}>Качество</FormLabel>
                        <Slider
                            className={classes.slider}
                            defaultValue={90}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            min={1}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={(e, newValue) => {
                                const num = newValue as number;
                                handleQualityChange(num);
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseAndCreate} color="secondary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
