import React from 'react';
import '../../index.css';
import {
    Button, createStyles, FormControl,
    FormControlLabel, FormLabel, IconButton,
    makeStyles, Radio, RadioGroup, Slider, SvgIcon
} from '@material-ui/core';
import { ExportFormat, formatToString } from '../../structures/ExportFormat';
import ReactiveDialog from '../reactivedialog/ReactiveDialog';

interface ExportDialogProps {
    onApply(format: ExportFormat, quality: number): void
}

const useStyles = makeStyles(() =>
    createStyles({
        slider: {
            width: "272px",
            margin: "8px 8px 0 8px",
        },
        quality_label: {
            color: "#FFFFFFa5",
            marginTop: "16px",
            "&.Mui-focused": {
                color: "#FFFFFFa5"
            }
        },
        label: {
            color: "#FFFFFFa5",
            "&.Mui-focused": {
                color: "#FFFFFFa5",
            }
        },
        radioGroup: {
            marginTop: "8px",
            flexDirection: "row"
        },
        radio: {
            color: "#FFFFFF8a"
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
            <ReactiveDialog
                isOpen={open}
                onClose={() => handleClose()}
                title="Сохранение"
                actions={() => {
                    return (
                        <Button autoFocus onClick={handleCloseAndCreate} color="secondary">
                            Сохранить
                        </Button>
                    );
                }}>
                <FormControl component="fieldset">
                    <FormLabel
                        component="legend"
                        classes={{ root: classes.label }}>Формат</FormLabel>
                    <RadioGroup
                        className={classes.radioGroup}
                        aria-orientation="horizontal"
                        aria-label="format"
                        name="format1"
                        value={formatToString(format)}
                        onChange={handleFormatChange}>
                        <FormControlLabel
                            value="jpeg"
                            control={<Radio className={classes.radio} />}
                            label="JPEG" />
                        <FormControlLabel
                            value="png"
                            control={<Radio className={classes.radio} />}
                            label="PNG" />
                    </RadioGroup>
                    <FormLabel
                        component="legend"
                        classes={{ root: classes.quality_label }}>Качество</FormLabel>
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
            </ReactiveDialog>
        </div>
    );
}
