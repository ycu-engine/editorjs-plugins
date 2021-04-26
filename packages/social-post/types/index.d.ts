import './index.css';
import { SocialPostPlugin, SocialPostPluginConstructorOptions, SocialPostPluginData, SocialPostPluginMediaPlatform } from './plugins-type';
export default class SocialPost implements SocialPostPlugin {
    static get isReadOnlySupported(): boolean;
    data?: SocialPostPluginData;
    wrapper: HTMLDivElement;
    url: string;
    selectedSocialMedia: SocialPostPluginMediaPlatform;
    readOnly: boolean;
    constructor({ data, readOnly }: SocialPostPluginConstructorOptions);
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
    createTwitterPost(url: string, caption?: string): Promise<void>;
    save(blockContent: HTMLElement): SocialPostPluginData;
}
