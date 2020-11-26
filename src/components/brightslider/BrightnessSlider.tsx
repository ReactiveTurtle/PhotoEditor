import { createStyles, Fab, makeStyles, Slider, SvgIcon, Theme } from '@material-ui/core';
import React from 'react';
import './BrightnessSlider.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            marginLeft: "24px",
        },
        slider: {
            width: "350px"
        }
    }),
);

interface BrightnessSliderProps {
    onChange(value: number): void,
    onApply: Function
}

export default function BrightnessSlider({onApply, onChange}: BrightnessSliderProps) {
    const classes = useStyles();
    return (
        <div className='BrightnessSlider-container'>
            <div className='BrightnessSlider-center'>
                <Slider
                    className={classes.slider}
                    defaultValue={1}
                    aria-labelledby="discrete-slider-custom"
                    step={0.02}
                    min={0}
                    max={4}
                    valueLabelDisplay="auto"
                    onChange={(e, newValue) => {onChange(newValue as number)}}
                />
                <Fab color="primary" aria-label="add"
                    size="small"
                    className={classes.fab}
                    onClick={(e) => onApply()}>
                    <SvgIcon>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </SvgIcon>
                </Fab>
            </div>
        </div>
    );
}