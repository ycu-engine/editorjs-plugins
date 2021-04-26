import { SocialPostPlugin } from '../plugins-type'
import { createButtonGroup } from './button-group'
import { createInputForm } from './form-input'

/**
 * Creates main block container.
 * @returns - main wrapper element.
 */
export const createMainBlock = (
  pluginObj: SocialPostPlugin,
): HTMLDivElement => {
  try {
    const btngroup = createButtonGroup(pluginObj)
    const formInput = createInputForm(pluginObj)

    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    wrapper.appendChild(btngroup)
    wrapper.appendChild(formInput)

    return wrapper
  } catch (error) {
    console.error(error)
    throw error
  }
}
