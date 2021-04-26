import {
  BlockTool,
  BlockToolConstructable,
  BlockToolConstructorOptions,
} from '@editorjs/editorjs'

export type SocialPostPluginMediaPlatform = 'Twitter'

export interface SocialPostPluginData {
  socialMediaPlatform: SocialPostPluginMediaPlatform
  url: string
  caption?: string
}

export type SocialPostPluginConstructorOptions = BlockToolConstructorOptions<SocialPostPluginData>

export interface SocialPostPluginConstructable extends BlockToolConstructable {
  new (config: SocialPostPluginConstructorOptions): SocialPostPlugin
}

export interface SocialPostPlugin extends BlockTool {
  data: SocialPostPluginData
  url: string
  wrapper: HTMLDivElement | null
  selectedSocialMedia: SocialPostPluginMediaPlatform

  createTwitterPost(url: string, caption: string): Promise<void>
}
