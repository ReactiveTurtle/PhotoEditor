import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextColorPicker from '../components/colopicker/TextColorPicker';
import { ToolType } from '../components/tool/Tools';
import EditText from '../edittext/EditText';
import updateFillColor from '../store/actionCreators/updateFillColor';
import updateStrokeColor from '../store/actionCreators/updateStrokeColor';
import updateStrokeWidth from '../store/actionCreators/updateStrokeWidth';
import updateTextColor from '../store/actionCreators/updateTextColor';
import updateTextSize from '../store/actionCreators/updateTextSize';
import initialViewModel from '../store/initialState';
import { ViewModel } from '../viewmodel/ViewModel';
import './ObjectParams.css';

function ObjectParams() {
    const dispatch = useDispatch();
    const tool: ToolType = useSelector(
        (state: ViewModel) => state.currentTool
    )
    return (
        <div className="ObjectParams">
            <div className="ParamsList">
                <TextColorPicker
                    id="EditText-fill"
                    title="Цвет заливки"
                    defaultColor={initialViewModel.objectState.fillColor}
                    onChange={(color) => {
                        dispatch(updateFillColor(color));
                    }}></TextColorPicker>
                <TextColorPicker
                    id="EditText-stroke"
                    title="Цвет контура"
                    defaultColor={initialViewModel.objectState.strokeColor}
                    onChange={(color) => {
                        dispatch(updateStrokeColor(color))
                    }}></TextColorPicker>
                <EditText
                    id="EditText-strokeWidth"
                    title="Толщина контура"
                    text={`${initialViewModel.objectState.strokeWidth}`}
                    min="0"
                    type="number"
                    onChange={(e) => {
                        const strokeWidth = e.target.valueAsNumber;
                        dispatch(updateStrokeWidth(strokeWidth))
                    }}></EditText>
            </div>
            <div className="ParamsList">
                {tool === ToolType.Text
                    && <EditText
                        id="EditText-textSize"
                        title="Размер текста"
                        text={`${initialViewModel.objectState.textSize}`}
                        min="1"
                        type="number"
                        onChange={(e) => {
                            dispatch(updateTextSize(e.target.valueAsNumber))
                        }}></EditText>
                }
                {tool === ToolType.Text
                    && <TextColorPicker
                        id="EditText-textColor"
                        title="Цвет текста"
                        defaultColor={initialViewModel.objectState.textColor}
                        onChange={(color) => {
                            dispatch(updateTextColor(color));
                        }}></TextColorPicker>
                }
            </div>
        </div>
    );
}

export default ObjectParams;
