import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import SelectSizePopup from './components/selectsizepopup/SelectSizeDialog';
import Canvas from './components/canvas/Canvas';
import ObjectParams from './objectparams/ObjectParams';
import { exportObject, importImageUrl, importObject, scaleImageData } from './helper/CanvasHelper';
import './structures/Vector2';
import Tools, { ToolType } from './components/tool/Tools';
import { Editor } from './structures/Editor';
import { AppBar, Box, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';
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
import { cyan, purple, red } from '@material-ui/core/colors';
import ExportDialog from './components/exportdialog/ExportDialog';
import ImportDialog from './components/importdialog/ImportDialog';
import { ImportType } from './structures/ImportType';
import PexelsSearchDialog from './components/pexelsartdialog/PexelsSearchDialog';
import { Photo } from 'pexels';
import PexelsSelectSizeDialog from './components/pexelsartdialog/size/PexelsSelectSizeDialog';
import ProgressDialog from './components/pexelsartdialog/progress/ProgressDialog';
import WebCameraDialog from './components/webcameradialog/WebCameraDialog';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple["A700"],
        },
        secondary: {
            main: cyan["A200"] + "8a",
            light: red["A400"],
        },
        text: {
            secondary: "#FFFFFF"
        }
    }
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
        }
    }),
);

function App() {
    const classes = useStyles();
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
    const [isPasteArtDialogOpen, setPasteArtDialogOpen] = useState(false);
    const [isPexelsArtDialogOpen, setPexelsArtDialogOpen] = useState(false);
    const [pasteArt, setPasteArt] = useState<Art | null>(null);

    const [pexelsPhoto, setPexelsPhoto] = useState<Photo | null>(null);
    const [pexelsPhotoProgress, setPexelsPhotoProgress] = useState<number>(0);

    const [isWebCameraDialogOpen, setWebCameraDialogOpen] = useState(false);

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
        <div className={styles.App}
            id="App">
            <ThemeProvider theme={theme}>
                <Canvas
                    focused={!isPasteArtDialogOpen && !isPexelsArtDialogOpen && pexelsPhoto === null}
                ></Canvas>
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
                            <ImportDialog
                                onApply={(type) => {
                                    switch (type) {
                                        case ImportType.STORAGE:
                                            importObject((art: Art) => {
                                                setPasteArt(art);
                                                setPasteArtDialogOpen(true);
                                            })
                                            break;
                                        case ImportType.PEXELS:
                                            setPexelsArtDialogOpen(true);
                                            break;
                                        case ImportType.WEB_CAMERA:
                                            setWebCameraDialogOpen(true);
                                            break;
                                    }
                                }}
                            ></ImportDialog>
                            <ExportDialog
                                onApply={(format, quality) => {
                                    const newEditor = replaceSelectedObject(editor, null);
                                    exportObject(newEditor.canvas, format, quality);
                                }}></ExportDialog>
                            <PasteArtDialog
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
                                }}></PasteArtDialog>
                            <PexelsSearchDialog
                                focused={pexelsPhoto === null}
                                isOpen={isPexelsArtDialogOpen}
                                onClose={() => {
                                    setPexelsArtDialogOpen(false);
                                }}
                                onApply={(photo) => {
                                    setPexelsPhoto(photo);
                                }}></PexelsSearchDialog>
                            <PexelsSelectSizeDialog
                                photo={pexelsPhoto}
                                isOpen={pexelsPhoto !== null}
                                onResult={(size, url) => {
                                    if (pexelsPhoto !== null) {
                                        importImageUrl(url, (art) => {
                                            art.image = scaleImageData(art.image, size);
                                            art.size = size;
                                            setPexelsArtDialogOpen(false);
                                            setPasteArt(art);
                                            setPasteArtDialogOpen(true);
                                        }, (percentage) => {
                                            setPexelsPhotoProgress(percentage);
                                        });
                                    }
                                    setPexelsPhoto(null);
                                }}
                                onClose={() => { setPexelsPhoto(null) }} />
                            <ProgressDialog
                                isOpen={pexelsPhotoProgress > 0 && pexelsPhotoProgress < 100}
                                progress={pexelsPhotoProgress} />
                            <WebCameraDialog
                                isOpen={isWebCameraDialogOpen}
                                onClose={() => { setWebCameraDialogOpen(false) }}
                                onResult={(art) => {
                                    setPasteArt(art);
                                    setPasteArtDialogOpen(true);
                                }} />
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
