import { createStyles, List, ListItem, makeStyles, Paper, SvgIcon, Theme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import updateTool from '../../store/actionCreators/updateTool';
import { ViewModel } from '../../viewmodel/ViewModel';
import './Tools.css';

export enum ToolType {
    Rectangle = 0, Triangle = 1, Circle = 2, Text = 3, Area = 4
}

interface ToolsProps {
    onSelected(): void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            margin: "8px 0 0 8px",
            background: "rgba(255, 255, 255, 0.20)",
            boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.2 )",
            backdropFilter: "blur(10.0px)",
            WebkitBackdropFilter: "blur( 10.0px )",
            borderRadius: "32px",
            borderTop: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderLeft: "1px solid rgba( 255, 255, 255, 0.18 )"
        },
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
            background: theme.palette.secondary.light + "CC",
            '&:hover': {
                background: theme.palette.secondary.light,
            },
        }
    }),
);

export default function Tools({ onSelected }: ToolsProps) {
    const dispatch = useDispatch();
    const currentTool: ToolType = useSelector(
        (state: ViewModel) => state.currentTool
    )
    const onClick = (tool: ToolType) => {
        if (tool !== currentTool) {
            dispatch(updateTool(tool));
            onSelected();
        }
    };
    const classes = useStyles();
    return (
        <Paper className={"Tools-root " + classes.root}>
            <List className="Tools-list" component="nav" aria-label="Инструменты">
                <ListItem button
                    onClick={() => onClick(ToolType.Rectangle)}
                    className={classes.item + " " + (currentTool === ToolType.Rectangle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <rect x="0" y="0" width="32" height="32"
                            fill={currentTool === ToolType.Rectangle ? "#FFFFFF" : "#424242"} />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Triangle)}
                    className={classes.item + " " + (currentTool === ToolType.Triangle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <polygon points="0,32 32,32 16,0"
                            fill={currentTool === ToolType.Triangle ? "#FFFFFF" : "#424242"} />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Circle)}
                    className={classes.item + " " + (currentTool === ToolType.Circle ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 32 32" style={{ margin: "auto" }}>
                        <circle r="16" cx="16" cy="16"
                            fill={currentTool === ToolType.Circle ? "#FFFFFF" : "#424242"}
                        />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Text)}
                    className={classes.item + " " + (currentTool === ToolType.Text ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 24 24" style={{ margin: "auto" }}>
                        <path d="M5 4v3h5.5v12h3V7H19V4z"
                            fill={currentTool === ToolType.Text ? "#FFFFFF" : "#424242"} />
                    </SvgIcon>
                </ListItem>
                <ListItem button
                    onClick={() => onClick(ToolType.Area)}
                    className={classes.item + " " + (currentTool === ToolType.Area ? classes.selectedItem : "")}>
                    <SvgIcon viewBox="0 0 24 24" style={{ margin: "auto" }}>
                        <path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"
                            fill={currentTool === ToolType.Area ? "#FFFFFF" : "#424242"} />
                    </SvgIcon>
                </ListItem>
            </List>
        </Paper>
    );
}
