import { BlockToolConstructorOptions } from '@editorjs/editorjs'
import './index.css'
import {
  SocialPostPlugin,
  SocialPostPluginData,
  SocialPostPluginMediaPlatform,
} from './plugins-type'
export default class SocialPost implements SocialPostPlugin {
  data: SocialPostPluginData
  wrapper: HTMLDivElement | null
  url: string
  selectedSocialMedia: SocialPostPluginMediaPlatform
  constructor({ data }: BlockToolConstructorOptions<SocialPostPluginData>)
  static get toolbox(): {
    icon: string
    title: string
  }
  hasUrl(
    obj: Record<string, any>,
  ): obj is {
    url: string
  }
  /**
   * Checks if url is empty or not.
   * Returns false if empty.
   * @param {boolean} savedData
   */
  validate(savedData: unknown): boolean
  render(): HTMLDivElement
  createTwitterPost(url: string, caption: string): Promise<void>
  save(blockContent: HTMLElement): SocialPostPluginData
}
