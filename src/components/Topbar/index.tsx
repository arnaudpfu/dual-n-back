import Typography from '@suid/material/Typography';
import { Component, ComponentProps } from 'solid-js';
import './Topbar.scss';
import { IoSettingsSharp } from 'solid-icons/io';
import { BiRegularBrain } from 'solid-icons/bi';
import Stack from '@suid/material/Stack';
import Chip from '@suid/material/Chip';
import { RiFinanceBitCoinFill } from 'solid-icons/ri';

interface TopbarProps extends ComponentProps<any> {
    // add props here
}

const Topbar: Component<TopbarProps> = (props: TopbarProps) => {
    return (
        <div class="topbar">
            <div class="flex-row left-part">
                <BiRegularBrain size={30} />
                <Typography variant="h2" className="title">
                    Dual N Back
                </Typography>
                <div class="settings-btn">
                    <IoSettingsSharp size={24} />
                </div>
            </div>
            <div class="flex-row right-part">
                <Stack direction="row" spacing={1}>
                    <div class="game-notice">
                        <Chip label="Level 4" className="chip level-chip" variant="outlined" />
                    </div>
                    <div class="game-notice">
                        <Chip label="35 Trials" className="chip rep-chip" variant="outlined" />
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default Topbar;
