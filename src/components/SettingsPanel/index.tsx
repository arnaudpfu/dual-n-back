import { Component, ComponentProps } from 'solid-js';
import { IoMailOutline } from 'solid-icons/io';
import { HiOutlineInboxIn } from 'solid-icons/hi';
import Box from '@suid/material/Box';
import Divider from '@suid/material/Divider';
import List from '@suid/material/List';
import ListItem from '@suid/material/ListItem';
import ListItemButton from '@suid/material/ListItemButton';
import ListItemIcon from '@suid/material/ListItemIcon';
import ListItemText from '@suid/material/ListItemText';
import { mapArray } from 'solid-js';

interface SettingsPanelProps extends ComponentProps<any> {
    // add props here
}

const SettingsPanel: Component<SettingsPanelProps> = () => {
    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            //   onClick={toggleDrawer(anchor, false)}
            //   onKeyDown={toggleDrawer(anchor, false)}
        >
            j
        </Box>
    );
};

export default SettingsPanel;
