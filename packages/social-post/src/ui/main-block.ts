import { SocialPostPlugin } from '../plugins-type'
import { createButtonGroup } from './button-group'
import { createInputForm } from './form-input'

const createReadOnlyBlock = async (plugin: SocialPostPlugin): Promise<void> => {
  if (!plugin.data) return
  switch (plugin.data.socialMediaPlatform) {
    case 'Twitter':
      await plugin.createTwitterPost(plugin.data.url, plugin.data.caption)
      break
  }
}

const createEditableBlock = (plugin: SocialPostPlugin): void => {
  const btngroup = createButtonGroup(plugin)
  const formInput = createInputForm(plugin)

  plugin.wrapper.appendChild(btngroup)
  plugin.wrapper.appendChild(formInput)
}

/**
 * Creates main block container.
 * @returns - main wrapper element.
 */
export const createMainBlock = async (
  pluginObj: SocialPostPlugin,
): Promise<void> => {
  try {
    if (pluginObj.readOnly) {
      await createReadOnlyBlock(pluginObj)
    } else {
      createEditableBlock(pluginObj)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
