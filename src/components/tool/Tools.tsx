import { createStyles, List, ListItem, makeStyles, Paper, SvgIcon, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { render } from '../../statemanager/StateManager';
import './Tools.css';

export enum ToolType {
    Rectangle = 0, Triangle = 1, Circle = 2, Text = 3
}

interface ToolsProps {
    onSelected(tool: ToolType): void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            minWidth: "0",
            width: "48px",
            height: "48px",
            borderRadius: "24px",
            alignContent: "center",
            margin: "0 4px",
            padding: "0",
            '&:hover': {
                background: "#42424242",
            },
        },
        selectedItem: {
            background: theme.palette.secondary.light,
            '&:hover': {
                background: theme.palette.secondary.light,
            },
        }
    }),
);

export default function Tools({ onSelected }: ToolsProps) {
    const [currentTool, setCurrentTool] = useState(ToolType.Rectangle);
    useEffect(() => {
        onSelected(currentTool);
    }, [onSelected, currentTool])
    const onClick = (tool: ToolType) => {
        setCurrentTool(tool);
        render();
    };
    const classes = useStyles();
    return (
        <Paper className="Tools-root">
            <Typography
                className="Tools-title"
                variant="subtitle1" color="inherit">
                Инструменты
            </Typography>
            <List className="Tools-list" component="nav" aria-label="Инструменты">
                <ListItem button
                    onClick={() => onClick(ToolType.Rectangle)}
                    className={classes.item + " " + (currentTool === ToolType.Rectangle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <rect x="0" y="0" width="32" height="32"
                            fill="#424242"
                        />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Triangle)}
                    className={classes.item + " " + (currentTool === ToolType.Triangle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <polygon points="0,32 32,32 16,0"
                            fill="#424242" />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Circle)}
                    className={classes.item + " " + (currentTool === ToolType.Circle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <circle r="16" cx="16" cy="16"
                            fill="#424242"
                        />
                    </SvgIcon>
                </ListItem>
            </List>
        </Paper>
    );
}
