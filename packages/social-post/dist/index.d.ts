import './index.css';
import { SocialPostPlugin, SocialPostPluginConstructorOptions, SocialPostPluginData, SocialPostPluginMediaPlatform } from './plugins-type';
export default class SocialPost implements SocialPostPlugin {
    data: SocialPostPluginConstructorOptions['data'];
    wrapper: HTMLDivElement | null;
    url: string;
    selectedSocialMedia: SocialPostPluginMediaPlatform;
    api: SocialPostPluginConstructorOptions['api'];
    readonly: SocialPostPluginConstructorOptions['readOnly'];
    block: SocialPostPluginConstructorOptions['block'];
    config: SocialPostPluginConstructorOptions['config'];
    constructor({ data, api, readOnly, block, config, }: SocialPostPluginConstructorOptions);
    static get toolbox(): {
        icon: string;
        title: string;
    };
    hasUrl(obj: Record<string, any>): obj is {
        url: string;
    };
    /**
     * Checks if url is empty or not.
     * Returns false if empty.
     * @param {boolean} savedData
     */
    validate(savedData: unknown): boolean;
    render(): HTMLDivElement;
    createTwitterPost(url: string, caption: string): Promise<void>;
    save(blockContent: HTMLElement): SocialPostPluginData;
}
