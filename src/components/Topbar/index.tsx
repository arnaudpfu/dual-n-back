import Typography from '@suid/material/Typography';
import { Component, ComponentProps } from 'solid-js';
import './Topbar.scss';
import { IoSettingsSharp } from 'solid-icons/io';
import { BiRegularBrain } from 'solid-icons/bi';

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
            </div>
            <div class="flex-row right-part">
                <IoSettingsSharp size={24} />
            </div>
        </div>
    );
};

export default Topbar;
