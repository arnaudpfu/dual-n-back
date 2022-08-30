import { Component, ComponentProps } from 'solid-js';
import { BiSolidPalette } from 'solid-icons/bi';
import { CgGitFork } from 'solid-icons/cg';
import * as pjson from '../../../package.json';
import './Footer.scss';
import { TbSpace } from 'solid-icons/tb';
import { RiSystemArrowUpSFill, RiSystemArrowDownSFill, RiSystemArrowLeftSFill, RiSystemArrowRightSFill } from 'solid-icons/ri'

interface FooterProps extends ComponentProps<any> {
    // add props here
}

const Footer: Component<FooterProps> = (props: FooterProps) => {
    return (
        <div class="footer">
            <div class="flex-row left-part keybindings-notice">
                <div class="keybinding-line">
                    <strong>Space</strong> <TbSpace size={20} /> - Start / Cancel
                </div>
                <div class="keybinding-line">
                    Level : <strong><RiSystemArrowDownSFill size={14}  /></strong> - Decrease and <strong><RiSystemArrowUpSFill size={14}  /></strong> - Increase
                </div>
                <div class="keybinding-line">
                    Number of Trials : <strong><RiSystemArrowLeftSFill size={14}  /></strong> - Decrease and <strong><RiSystemArrowRightSFill size={14}  /></strong> - Increase
                </div>
            </div>
            <div class="flex-row right-part">
                <div class="notice theme-notice">
                    <BiSolidPalette size={14} />
                    <span class="theme">dark</span>
                </div>
                <div class="notice verstion-notice">
                    <CgGitFork size={17} />
                    <span class="version">v{pjson.version}</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
