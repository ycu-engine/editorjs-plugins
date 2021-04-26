import PluginIcon from './assets/plugin-icon.svg'
import './index.css'
import {
  SocialPostPlugin,
  SocialPostPluginConstructorOptions,
  SocialPostPluginData,
  SocialPostPluginMediaPlatform,
} from './plugins-type'
import { createTwitterPost } from './posts'
import { createMainBlock } from './ui'

export default class SocialPost implements SocialPostPlugin {
  data?: SocialPostPluginData
  wrapper: HTMLDivElement | null
  url: string
  selectedSocialMedia: SocialPostPluginMediaPlatform

  constructor({ data }: SocialPostPluginConstructorOptions) {
    this.data = data
    /**
     * Container for the entire block
     */
    this.wrapper = null

    /**
     * URL of the social media post
     */
    this.url = ''
    this.selectedSocialMedia = 'Twitter'
  }

  static get toolbox(): { icon: string; title: string } {
    return {
      icon: PluginIcon,
      title: 'Social Post',
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasUrl(obj: Record<string, any>): obj is { url: string } {
    if (typeof obj.url === 'string') return true
    return false
  }

  /**
   * Checks if url is empty or not.
   * Returns false if empty.
   * @param {boolean} savedData
   */
  validate(savedData: unknown): boolean {
    if (typeof savedData !== 'object' || savedData === null) return false
    if (this.hasUrl(savedData)) {
      if (savedData.url.trim()) {
        return true
      }
    }
    return false
  }

  render(): HTMLDivElement {
    try {
      this.wrapper = createMainBlock(this)

      return this.wrapper
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async createTwitterPost(url: string, caption: string): Promise<void> {
    await createTwitterPost(this, url, caption)
  }

  //   async _createFacebookPost(url, caption) {
  //     await createFacebookPost(this, url, caption)
  //   }

  //   async _createInstagramPost(url, caption) {
  //     await createInstagramPost(this, url, caption)
  //   }

  save(blockContent: HTMLElement): SocialPostPluginData {
    /**
     * Returns output as:
     * url - URL of the social media post.
     * caption - Caption provided by the user (giving more context about the post).
     */
    const captionInput = blockContent.querySelector(
      '#social-post-caption-input',
    )
    const caption =
      captionInput !== null && captionInput instanceof HTMLInputElement
        ? captionInput.value
        : undefined

    return {
      socialMediaPlatform: this.selectedSocialMedia,
      url: this.url,
      caption: caption,
    }
  }
}
