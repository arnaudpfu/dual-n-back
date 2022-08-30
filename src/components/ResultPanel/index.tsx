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
                <div class="cell label">{props.result.audioMatchCount}</div>
                <div class="cell label">{props.result.positionMatchCount}</div>
                <div class="cell label">{props.result.audioMatchCount + props.result.positionMatchCount}</div>
            </div>
            <div class="row">
                <div class="cell left">Misses: </div>
                <div class="cell label">{props.result.audioMissCount}</div>
                <div class="cell label">{props.result.positionMissCount}</div>
                <div class="cell label">{props.result.audioMissCount + props.result.positionMissCount}</div>
            </div>
            <div class="row">
                <div class="cell"></div>
                <div class="cell label">{props.result.audioMatchPercentage}%</div>
                <div class="cell label">{props.result.positionMatchPercentage}%</div>
                <div class="cell label bold" style={{color: 'var(--primary)'}}>{props.result.generalMatchPercentage}%</div>
            </div>
        </div>
    );
};
