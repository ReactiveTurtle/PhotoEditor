import React, { useEffect, useState } from 'react';
import './App.css';
import SelectSizePopup from './components/selectsizepopup/SelectSizePopup';
import Canvas from './canvas/Canvas';
import ObjectParams from './objectparams/ObjectParams';
import { createNewCanvas, editCanvasSize, exportObject, importObject } from './helper/CanvasHelper';
import './structures/Vector2';
import Tools, { ToolType } from './components/tool/Tools';
import { dispatch, getEditor, redo, render, setEditor, undo } from './statemanager/StateManager';
import { Editor } from './structures/Editor';
import { AppBar, Box, IconButton, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import { replaceSelectedObject } from './helper/EditorHelper';
import { Art } from './structures/Art';
import FilterMenu from './components/filtermenu/FilterMenu';
import { applyBrightnessFilter, applyFilter } from './helper/FilterHelper';
import { Filter } from './structures/Filter';
import BrightnessSlider from './components/brightslider/BrightnessSlider';
import { useTimeout } from './components/timeout/Timeout';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple["A700"],
        },
        secondary: {
            main: green["A700"],
            light: green["A200"],
        },
    },
});

interface AppProps {
    editor: Editor
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: "100%"
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            textAlign: "start",
            fontFamily: "cursive"
        },
    }),
);

function App({ editor }: AppProps) {
    const timer = useTimeout();
    const [isBrightSliderShown, setBrightSliderShown] = useState(false);
    const [tempEditor, setTempEditor] = useState<Editor | null>(null);
    const [currentTool, setCurrentTool] = useState(ToolType.Rectangle);
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            console.log(e.code);
            if (e.ctrlKey) {
                if (e.code === "KeyZ") {
                    setEditor(undo());
                } else if (e.code === "KeyY") {
                    setEditor(redo());
                }
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }
    })
    const classes = useStyles();
    return (
        <div className="App"
            id="App">
            <ThemeProvider theme={theme}>
                <Canvas tool={currentTool}
                    imageData={editor.canvas}
                    selectedObject={editor.selectedObject}></Canvas>
                <Box position="fixed" className={classes.root}>
                    <AppBar position="static" style={{ background: "#6200ea" }}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.title}>
                                Reactive Photo Editor
                        </Typography>
                            <SelectSizePopup
                                applyText="Создать"
                                fun={createNewCanvas}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </SvgIcon>
                            </SelectSizePopup>
                            <SelectSizePopup
                                applyText="Изменить"
                                fun={editCanvasSize}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </SvgIcon>
                            </SelectSizePopup>
                            <IconButton aria-label="Загрузить"
                                color="inherit"
                                onClick={() => {
                                    importObject((art: Art) => {
                                        dispatch(replaceSelectedObject, art, getEditor().selectedObject !== null);
                                        render();
                                    })
                                }}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
                                </SvgIcon>
                            </IconButton>
                            <IconButton aria-label="Сохранить"
                                color="inherit"
                                edge="end"
                                onClick={() => {
                                    dispatch(replaceSelectedObject, null, false);
                                    exportObject();
                                    setEditor(editor);
                                }}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                                </SvgIcon>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Tools onSelected={(tool) => {
                        setCurrentTool(tool);
                    }}></Tools>
                    <FilterMenu
                        onSelect={(filter) => {
                            if (getEditor().selectedObject !== null) {
                                dispatch(replaceSelectedObject, null, true);
                                render();
                            }
                            if (filter !== Filter.Brightness) {
                                dispatch(applyFilter, filter, true);
                                render();
                            } else {
                                setTempEditor(getEditor());
                                setBrightSliderShown(true);
                            }
                        }}></FilterMenu>
                </Box>
                {currentTool !== ToolType.Area &&
                    <ObjectParams tool={currentTool}></ObjectParams>
                }
                {isBrightSliderShown
                    && <BrightnessSlider
                        onChange={(value) => {
                            if (tempEditor === null) {
                                return;
                            }
                            timer(16, () => {
                                setEditor(tempEditor, false);
                                dispatch(applyBrightnessFilter, value);
                            });
                        }}
                        onApply={() => {
                            setBrightSliderShown(false);
                            dispatch(replaceSelectedObject, null, true);
                        }}
                    ></BrightnessSlider>}
            </ThemeProvider>
        </div>
    );
}

export default App;
