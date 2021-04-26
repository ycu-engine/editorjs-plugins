import { SocialPostPlugin } from '../plugins-type'
/**
 * Adds or replaces social media post.
 * @param  url - URL of the social media post.
 * @param  caption - caption provided by the user.
 */
export declare const createTwitterPost: (
  pluginObj: SocialPostPlugin,
  url: string,
  caption: string,
) => Promise<void>
