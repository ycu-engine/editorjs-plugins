import {
  API,
  BlockTool,
  BlockToolConstructable,
  ToolConfig,
} from '@editorjs/editorjs'

export type SocialPostPluginMediaPlatform = 'Twitter'

export interface SocialPostPluginData {
  socialMediaPlatform: SocialPostPluginMediaPlatform
  url: string
  caption?: string
}

export type SocialPostPluginOption = Record<string, never>

export type SocialPostPluginConstructorOptions = {
  api: API
  config?: ToolConfig<SocialPostPluginOption>
  data?: SocialPostPluginData
  readOnly?: boolean
}
export interface SocialPostPluginConstructable extends BlockToolConstructable {
  new (config: SocialPostPluginConstructorOptions): SocialPostPlugin
}

export interface SocialPostPlugin extends BlockTool {
  data?: SocialPostPluginData
  url: string
  wrapper: HTMLDivElement
  selectedSocialMedia: SocialPostPluginMediaPlatform
  readOnly: boolean

  createTwitterPost(url: string, caption?: string): Promise<void>
}
