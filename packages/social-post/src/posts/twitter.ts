import fetchJsonp from 'fetch-jsonp'
import { SocialPostPlugin } from '../plugins-type'

/**
 * Adds the post in the iframe.
 *
 * @param  post - the srcdoc for iframe containing markup for the post.
 * @returns  twitterPostFrame.outerHTML - the markup for the iframe representing the post.
 */
const createTwitterPostFrame = (post: string): string => {
  try {
    const twitterPostFrame = document.createElement('iframe')
    twitterPostFrame.id = '#twitter-post-frame'
    twitterPostFrame.classList.add('post-frame')
    // Delete twitterPostFrame.frameBorder = 0
    twitterPostFrame.srcdoc = post

    twitterPostFrame.addEventListener('load', () => {
      /**
       * Makes all the links in the inline-frame on click, to open in a new tab of the browser
       * rather than inside the inline-frame itself.
       */
      const { contentWindow } = twitterPostFrame
      if (!contentWindow) return

      const links = contentWindow.document.getElementsByTagName('a')
      Array.from(links).forEach((link) => {
        link.setAttribute('target', '_blank')
      })
    })

    /**
     * Returning the iframe markup which can be later appended in postWrapper.
     */
    return twitterPostFrame.outerHTML
  } catch (error) {
    console.error(error)
    throw error
  }
}

type TwitterResponse = {
  url: string
  title: string
  html: string
  width: null | number
  height: null | number
  type: string
  // eslint-disable-next-line camelcase
  cache_age: string
  // eslint-disable-next-line camelcase
  provider_name: 'Twitter'
  // eslint-disable-next-line camelcase
  provider_url: 'https://twitter.com'
  version: string
}

const errorHandleForFailedFetchTwitter = (plugin: SocialPostPlugin) => {
  // Clearing url
  plugin.url = ''
  // Shows error message when error occurs.
  const errorWrapper = document.createElement('div')
  errorWrapper.innerHTML =
    'The URL provided does not refer to any valid <b>Twitter</b> post.'
  errorWrapper.classList.add('error-wrapper')
  const urlInput = document.getElementById('social-post-url-input')
  if (urlInput && urlInput instanceof HTMLInputElement) {
    urlInput.value = ''
  }
  return errorWrapper.outerHTML
}

/**
 * Fetches post data from Twitter API.
 *
 * @param  url - twitter post URL.
 * @returns  post - post html content.
 */
const getTwitterPostFromURL = async (
  plugin: SocialPostPlugin,
  url: string,
): Promise<string> => {
  try {
    // Fetches the response containing post metadata.
    const response = await fetchJsonp(
      `https://publish.twitter.com/oembed?url=${url}`,
    )
    if (!response) throw new Error('Response is undefined')
    // Comverting response to JSON format.
    const result = await response.json<TwitterResponse>()
    if (!result) throw new Error('Response is not convertible to JSON')
    // URL validated, hence can be returned in output data.
    plugin.url = url
    // Retrieving the html property of the reponse JSOn whihc contains the markup for the embedding the post.
    const post = await result.html
    // Creates the iframe containing the post and returns its markup.
    return createTwitterPostFrame(post)
  } catch (error) {
    console.error(error)
    return errorHandleForFailedFetchTwitter(plugin)
  }
}

const setUpTwitterElement = (
  innerHTML: string,
  caption: string,
  elm: HTMLDivElement,
): void => {
  elm.id = 'twitter-post-wrapper'
  elm.classList.add('post-wrapper')
  // Returns the iframe representing the post.
  elm.innerHTML = innerHTML
  // Appending the user provided caption.
  const captionContainer = document.createElement('div')
  captionContainer.id = 'caption-container'
  captionContainer.textContent = caption
  elm.appendChild(captionContainer)
}

/**
 * Adds or replaces social media post.
 * @param  url - URL of the social media post.
 * @param  caption - caption provided by the user.
 */
export const createTwitterPost = async (
  pluginObj: SocialPostPlugin,
  url: string,
  caption: string,
): Promise<void> => {
  const innerHTML = await getTwitterPostFromURL(pluginObj, url)
  try {
    const postWrapper = document.querySelector('.post-wrapper')
    // If postWarpper does not already exist create one.
    if (postWrapper === null || !(postWrapper instanceof HTMLDivElement)) {
      const div = document.createElement('div')
      setUpTwitterElement(innerHTML, caption, div)
      pluginObj.wrapper?.appendChild?.(div)
    }
    // If postWrapper already exists, change its update its content i.e. post and caption.
    else {
      setUpTwitterElement(innerHTML, caption, postWrapper)
    }
  } catch (error) {
    console.error(error)
  }
}
