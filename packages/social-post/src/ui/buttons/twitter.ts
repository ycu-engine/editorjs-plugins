import { SocialPostPlugin } from '../../plugins-type'
import TwitterIcon from './../../assets/twitter-icon.png'

/**
 * Returns Twitter button as HTMLButtonElement.
 * @param - Plugin object.
 *
 * @returns - Twitter button.
 */
export const createTwitterButton = (
  pluginObj: SocialPostPlugin,
): HTMLButtonElement => {
  try {
    const twitterBtn = document.createElement('button')
    twitterBtn.id = 'twitter-btn'
    // Keeps this in default selected state.
    twitterBtn.style.backgroundColor = '#efefef'

    // Img element which represents the logo of the social media platform.
    const twitterIcon = document.createElement('img')
    twitterIcon.classList.add('logo')
    twitterIcon.src = TwitterIcon
    twitterIcon.alt = 'Twitter Icon'

    const twitterName = document.createElement('div')
    twitterName.textContent = 'Twitter'
    twitterName.style.color = '#808080'
    twitterBtn.appendChild(twitterIcon)
    twitterBtn.appendChild(twitterName)

    /**
     * Highlights background of the recently clicked button and turns other buttons' backgrounds to transparent.
     */
    twitterBtn.addEventListener('click', () => {
      pluginObj.selectedSocialMedia = 'Twitter'

      twitterBtn.style.backgroundColor = '#efefef'
      const facebookBtn = document.getElementById('facebook-btn')
      if (facebookBtn) {
        facebookBtn.style.backgroundColor = 'transparent'
      }
      const instagramBtn = document.getElementById('instagram-btn')
      if (instagramBtn) {
        instagramBtn.style.backgroundColor = 'transparent'
      }
    })
    return twitterBtn
  } catch (error) {
    console.error(error)
    throw error
  }
}
