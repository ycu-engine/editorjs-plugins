import { SocialPostPlugin } from '../plugins-type'
import { createTwitterButton } from './buttons'

/**
 * Creates button group and adds all the buttons.
 * @param  - Plugin object.
 *
 * @returns - wrapper containing all social media buttons.
 */
export const createButtonGroup = (
  pluginObj: SocialPostPlugin,
): HTMLDivElement => {
  try {
    const btngroup = document.createElement('div')
    btngroup.classList.add('btn-group')
    const twitterBtn = createTwitterButton(pluginObj)
    btngroup.appendChild(twitterBtn)
    return btngroup
  } catch (error) {
    console.error(error)
    throw error
  }
}
