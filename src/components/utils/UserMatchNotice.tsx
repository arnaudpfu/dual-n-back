import { Component } from 'solid-js';
import ActionButton from './ActionButton';
import './UserMatchNotice.scss';

const UserMatchNotice: Component = () => {
    return (
        <div class="match-notice">
            <ActionButton type="position" />
            <ActionButton type="audio" />
        </div>
    );
};

export default UserMatchNotice;
