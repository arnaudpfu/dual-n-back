import { Component } from 'solid-js';
import './ResultPanel.scss';
import { GameResult } from '../../store/GameResult';

interface IResultPanelProps {
    result: GameResult;
}

export const ResultPanel: Component<IResultPanelProps> = (props) => {
    if (props.result == null) return null;

    return (
        <div class="result-panel">
            <div class="row">
                <div class="cell"></div>
                <div class="cell label">Audio</div>
                <div class="cell label">Position</div>
                <div class="cell label">Total</div>
            </div>
            <div class="row">
                <div class="cell left">Matches: </div>
                <div class="cell label">{props.result.audioRecap.success}</div>
                <div class="cell label">{props.result.positionRecap.success}</div>
                <div class="cell label">
                    {props.result.audioRecap.success + props.result.positionRecap.success}
                </div>
            </div>
            <div class="row">
                <div class="cell left">Misses: </div>
                <div class="cell label">{props.result.audioRecap.failed}</div>
                <div class="cell label">{props.result.positionRecap.failed}</div>
                <div class="cell label">
                    {props.result.audioRecap.failed + props.result.positionRecap.failed}
                </div>
            </div>
            <div class="row">
                <div class="cell"></div>
                <div class="cell label">{props.result.audioMatchPercentage}%</div>
                <div class="cell label">{props.result.positionMatchPercentage}%</div>
                <div class="cell label bold" style={{ color: 'var(--primary)' }}>
                    {props.result.generalMatchPercentage}%
                </div>
            </div>
        </div>
    );
};
