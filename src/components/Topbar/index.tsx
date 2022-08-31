import Typography from '@suid/material/Typography';
import { Component, ComponentProps, createSignal } from 'solid-js';
import './Topbar.scss';
import { IoSettingsSharp } from 'solid-icons/io';
import { BiRegularBrain } from 'solid-icons/bi';
import Stack from '@suid/material/Stack';
import Chip from '@suid/material/Chip';
import store from '../../store';
import Drawer from '@suid/material/Drawer';
import SettingsPanel from '../SettingsPanel';
import Box from '@suid/material/Box';

interface TopbarProps extends ComponentProps<any> {
    // add props here
}

const Topbar: Component<TopbarProps> = (props: TopbarProps) => {
    const [settingsOpen, setSettingsOpen] = createSignal(false);

    return (
        <div class="topbar">
            <div class="flex-row left-part">
                <BiRegularBrain size={30} />
                <Typography variant="h2" className="title">
                    Dual N Back
                </Typography>
                {/* <div class="settings-btn">
                    <IoSettingsSharp
                        size={24}
                        onClick={() => {
                            setSettingsOpen(true);
                        }}
                    />
                </div>
                <Drawer
                    anchor={'left'}
                    open={settingsOpen()}
                    sx={{ zIndex: 9999 }}
                    onClose={() => {
                        setSettingsOpen(false);
                    }}
                >
                    <Box
                        sx={{ width: 350 }}
                        role="presentation"
                        onClick={() => {
                            setSettingsOpen(false);
                        }}
                    >
                        list
                    </Box>
                </Drawer> */}
            </div>
            <div class="flex-row right-part">
                <Stack direction="row" spacing={1}>
                    <div class="game-notice">
                        <Chip
                            label={`Level ${store.state.settings.level}`}
                            className="chip level-chip"
                            variant="outlined"
                        />
                    </div>
                    <div class="game-notice">
                        <Chip
                            label={`${store.state.settings.trials} Trials`}
                            className="chip rep-chip"
                            variant="outlined"
                        />
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default Topbar;
