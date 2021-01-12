import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextColorPicker from '../components/colopicker/TextColorPicker';
import ReactiveTextField from '../components/reactivetextfield/ReactiveTextField';
import { ToolType } from '../components/tool/Tools';
import updateFillColor from '../store/actionCreators/updateFillColor';
import updateStrokeColor from '../store/actionCreators/updateStrokeColor';
import updateStrokeWidth from '../store/actionCreators/updateStrokeWidth';
import updateTextColor from '../store/actionCreators/updateTextColor';
import updateTextSize from '../store/actionCreators/updateTextSize';
import updateFontName from '../store/actionCreators/updateFontName';
import { ObjectState } from '../viewmodel/ObjectState';
import { ViewModel } from '../viewmodel/ViewModel';
import styles from './ObjectParams.module.css';
import useStyles from './ObjectParamsStyle';
import updateTextPadding from '../store/actionCreators/updateTextPadding';

function ObjectParams() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const objectState: ObjectState = useSelector(
        (state: ViewModel) => state.objectState
    )
    const tool: ToolType = useSelector(
        (state: ViewModel) => state.currentTool
    )
    return (
        <div className={styles.ObjectParams}>
            <div className={styles.ParamsList}>
                <TextColorPicker
                    id="TextField-fillColor"
                    title="Цвет заливки"
                    defaultColor={objectState.fillColor}
                    onChange={(color) => {
                        dispatch(updateFillColor(color));
                    }}></TextColorPicker>
                <TextColorPicker
                    id="TextField-strokeColor"
                    title="Цвет контура"
                    defaultColor={objectState.strokeColor}
                    onChange={(color) => {
                        dispatch(updateStrokeColor(color))
                    }}></TextColorPicker>
                <ReactiveTextField
                    className={classes.root}
                    label="Толщина контура"
                    defaultText={`${objectState.strokeWidth}`}
                    min="0"
                    type="number"
                    onChange={(e) => {
                        const strokeWidth = parseInt(e.target.value);
                        dispatch(updateStrokeWidth(strokeWidth))
                    }}></ReactiveTextField>
            </div>
            <div className={styles.ParamsList}>
                {tool === ToolType.Text
                    && <ReactiveTextField
                        className={classes.root}
                        label="Размер текста"
                        defaultText={`${objectState.textSize}`}
                        min="1"
                        type="number"
                        onChange={(e) => {
                            dispatch(updateTextSize(parseInt(e.target.value)))
                        }}></ReactiveTextField>
                }
                {tool === ToolType.Text
                    && <TextColorPicker
                        id="TextField-textColor"
                        title="Цвет текста"
                        defaultColor={objectState.textColor}
                        onChange={(color) => {
                            dispatch(updateTextColor(color));
                        }}></TextColorPicker>
                }
                {tool === ToolType.Text
                    && <ReactiveTextField
                        className={classes.root}
                        label="Шрифт"
                        defaultText={`${objectState.fontName}`}
                        type="text"
                        onChange={(e) => {
                            dispatch(updateFontName(e.target.value))
                        }}></ReactiveTextField>
                }
            </div>
            <div className={styles.ParamsList}>
                {tool === ToolType.Text
                    && <ReactiveTextField
                        className={classes.root}
                        label="Внутренний отступ"
                        defaultText={`${objectState.padding}`}
                        min="0"
                        type="number"
                        onChange={(e) => {
                            dispatch(updateTextPadding(parseInt(e.target.value)))
                        }}></ReactiveTextField>
                }
            </div>
        </div>
    );
}

export default ObjectParams;
