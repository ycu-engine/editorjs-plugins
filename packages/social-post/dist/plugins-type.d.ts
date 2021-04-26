import {
  BlockTool,
  BlockToolConstructable,
  BlockToolConstructorOptions,
} from '@editorjs/editorjs'
export declare type SocialPostPluginMediaPlatform = 'Twitter'
export interface SocialPostPluginData {
  socialMediaPlatform: SocialPostPluginMediaPlatform
  url: string
  caption?: string
}
export interface SocialPostPluginConstructable extends BlockToolConstructable {
  new (config: BlockToolConstructorOptions<SocialPostPluginData>): BlockTool
}
export interface SocialPostPlugin extends BlockTool {
  data: SocialPostPluginData
  url: string
  wrapper: HTMLDivElement | null
  selectedSocialMedia: SocialPostPluginMediaPlatform
  createTwitterPost(url: string, caption: string): Promise<void>
}
