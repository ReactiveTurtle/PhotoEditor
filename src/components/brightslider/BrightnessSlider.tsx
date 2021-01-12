import { createStyles, Fab, makeStyles, Slider, SvgIcon, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import styles from './BrightnessSlider.module.css';

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
    onApply(value: number): void
}

export default function BrightnessSlider({ onApply, onChange }: BrightnessSliderProps) {
    const classes = useStyles();
    const [value, setValue] = useState<number>(1)
    return (
        <div className={styles.BrightnessSliderContainer}>
            <div className={styles.BrightnessSliderCenter}>
                <Slider
                    className={classes.slider}
                    defaultValue={1}
                    aria-labelledby="discrete-slider-custom"
                    step={0.01}
                    min={0}
                    max={4}
                    valueLabelDisplay="auto"
                    onChange={(e, newValue) => {
                        const num = newValue as number;
                        setValue(num);
                        onChange(num)
                    }}
                />
                <Fab color="primary" aria-label="add"
                    size="small"
                    className={classes.fab}
                    onClick={(e) => onApply(value)}>
                    <SvgIcon>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </SvgIcon>
                </Fab>
            </div>
        </div>
    );
}