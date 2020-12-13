import React, { useEffect, useState } from 'react';
import './App.css';
import SelectSizePopup from './components/selectsizepopup/SelectSizeDialog';
import Canvas from './components/canvas/Canvas';
import ObjectParams from './objectparams/ObjectParams';
import { exportObject, importObject } from './helper/CanvasHelper';
import './structures/Vector2';
import Tools, { ToolType } from './components/tool/Tools';
import { Editor } from './structures/Editor';
import { AppBar, Box, IconButton, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { Art } from './structures/Art';
import FilterMenu from './components/filtermenu/FilterMenu';
import { applyBrightnessFilter } from './helper/FilterHelper';
import { Filter } from './structures/Filter';
import BrightnessSlider from './components/brightslider/BrightnessSlider';
import { useTimeout } from './components/timeout/Timeout';
import PasteArtDialog from './components/pasteartdialog/PasteArtDialog';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ViewModel } from './viewmodel/ViewModel';
import undoHistory from './store/actionCreators/undoHistory';
import redoHistory from './store/actionCreators/redoHistory';
import actionReplaceSelectedObject from './store/actionCreators/actionReplaceSelectedObject';
import setEditor from './store/actionCreators/setEditor';
import pushToHistory from './store/actionCreators/pushToHistory';
import editCanvasSize from './store/actionCreators/editCanvasSize';
import applyFilter from './store/actionCreators/applyFilter';
import createNewCanvas from './store/actionCreators/createNewCanvas';
import { replaceSelectedObject } from './helper/EditorHelper';
import { purple, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple["A700"],
        },
        secondary: {
            main: purple["A700"],
            light: red["A400"],
        },
    },
});

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

function App() {
    const timeout = useTimeout();
    const dispatch = useDispatch();
    const editor: Editor = useSelector(
        (state: ViewModel) => state.editor,
        shallowEqual
    )
    const currentTool: ToolType = useSelector(
        (state: ViewModel) => state.currentTool
    )
    const [isBrightSliderShown, setBrightSliderShown] = useState(false);
    const [tempEditor, setTempEditor] = useState<Editor | null>(null);
    const classes = useStyles();

    const [isPasteArtDialogOpen, setPasteArtDialogOpen] = useState(false);
    const [pasteArt, setPasteArt] = useState<Art | null>(null);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.code === "KeyZ") {
                    dispatch(undoHistory());
                } else if (e.code === "KeyY") {
                    dispatch(redoHistory());
                }
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener);
        }
    })
    return (
        <div className="App"
            id="App">
            <ThemeProvider theme={theme}>
                <Canvas></Canvas>
                <Box position="fixed" className={classes.root}>
                    <AppBar position="static" style={{ background: "#6200ea" }}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.title}>
                                Reactive Photo Editor
                        </Typography>
                            <SelectSizePopup
                                applyText="Создать"
                                action={createNewCanvas({ x: 0, y: 0 })}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </SvgIcon>
                            </SelectSizePopup>
                            <SelectSizePopup
                                applyText="Изменить"
                                action={editCanvasSize({ x: 0, y: 0 })}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </SvgIcon>
                            </SelectSizePopup>
                            <IconButton aria-label="Загрузить"
                                color="inherit"
                                onClick={() => {
                                    importObject((art: Art) => {
                                        setPasteArt(art);
                                        setPasteArtDialogOpen(true);
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
                                    setTempEditor(editor);
                                    dispatch(actionReplaceSelectedObject(null));
                                    exportObject();
                                    dispatch(setEditor(editor));
                                }}>
                                <SvgIcon>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                                </SvgIcon>
                            </IconButton>
                            {isPasteArtDialogOpen && <PasteArtDialog
                                isOpen={isPasteArtDialogOpen}
                                onSaveSize={() => {
                                    const isPushToHistory = editor.selectedObject !== null;
                                    const historyCanvas = editor.canvas;
                                    dispatch(actionReplaceSelectedObject(pasteArt));
                                    if (isPushToHistory) {
                                        dispatch(pushToHistory(historyCanvas));
                                    }
                                }}
                                onChangeSize={() => {
                                    const isPushToHistory = editor.selectedObject !== null;
                                    const historyCanvas = editor.canvas;
                                    if (pasteArt === null) {
                                        throw new Error();
                                    }
                                    dispatch(editCanvasSize(pasteArt.size));
                                    dispatch(actionReplaceSelectedObject(pasteArt));
                                    if (isPushToHistory) {
                                        dispatch(pushToHistory(historyCanvas));
                                    }
                                }}
                                onClose={() => {
                                    setPasteArtDialogOpen(false);
                                    setPasteArt(null);
                                }}></PasteArtDialog>}
                        </Toolbar>
                    </AppBar>
                    <Tools onSelected={() => {
                        if (isBrightSliderShown) {
                            if (tempEditor === null) {
                                throw new Error();
                            }
                            dispatch(setEditor(tempEditor))
                            setBrightSliderShown(false);
                        }
                    }}></Tools>
                    <FilterMenu
                        onSelect={(filter) => {
                            let temp = editor;
                            if (editor.selectedObject != null) {
                                const newEditor = replaceSelectedObject(editor, null);
                                dispatch(pushToHistory(newEditor.canvas));
                                dispatch(setEditor(newEditor));
                                temp = newEditor;
                            }
                            if (filter !== Filter.Brightness) {
                                dispatch(applyFilter(filter));
                            } else {
                                setTempEditor(temp);
                                setBrightSliderShown(true);
                            }
                        }}></FilterMenu>
                </Box>
                {currentTool !== ToolType.Area && <ObjectParams />}
                {isBrightSliderShown
                    && <BrightnessSlider
                        onChange={(value) => {
                            if (tempEditor === null) {
                                return;
                            }
                            timeout(16, () => {
                                const brightEditor = applyBrightnessFilter(tempEditor, value);
                                dispatch(setEditor(brightEditor))
                            });
                        }}
                        onApply={(value) => {
                            setBrightSliderShown(false);
                            if (value === 1) {
                                return;
                            }
                            const newEditor = replaceSelectedObject(editor, null);
                            dispatch(pushToHistory(newEditor.canvas));
                            dispatch(setEditor(newEditor));
                        }}
                    ></BrightnessSlider>}
            </ThemeProvider>
        </div>
    );
}

export default App;
