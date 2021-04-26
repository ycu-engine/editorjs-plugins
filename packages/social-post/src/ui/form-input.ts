import { SocialPostPlugin } from '../plugins-type'

/**
 * Creates an input element for social media post URL.
 */
const createUrlInput = (pluginObj: SocialPostPlugin): HTMLInputElement => {
  const urlInput = document.createElement('input')
  urlInput.id = 'social-post-url-input'
  urlInput.placeholder = 'Post URL'
  urlInput.classList.add('cdx-input')
  urlInput.style.margin = '12px 0'
  urlInput.value = pluginObj.data?.url || ''
  return urlInput
}

/**
 * Creates an input element for caption
 */
const createCaptionInput = (pluginObj: SocialPostPlugin): HTMLInputElement => {
  const captionInput = document.createElement('input')
  captionInput.id = 'social-post-caption-input'
  captionInput.placeholder = 'Caption'
  captionInput.classList.add('cdx-input')
  captionInput.style.margin = '12px 0'
  captionInput.value = pluginObj.data?.caption || ''
  return captionInput
}

/**
 * Creates a button which adds provides gives a preview of the social media post.
 */
const createPreviewButton = (): HTMLButtonElement => {
  const previewBtn = document.createElement('button')
  previewBtn.innerHTML = 'Preview'
  previewBtn.classList.add('cdx-button')
  previewBtn.style.margin = 'margin: 12px 0 20px 0;'
  previewBtn.setAttribute('type', 'button')
  return previewBtn
}

/**
 * Returns form wrapper which contains inputs for URL and Caption and Preview button.
 * @param - Plugin object.
 * @returns - wrapper containing inputs and preview button.
 */
export const createInputForm = (
  pluginObj: SocialPostPlugin,
): HTMLDivElement => {
  try {
    const urlInput = createUrlInput(pluginObj)
    const captionInput = createCaptionInput(pluginObj)
    const previewBtn = createPreviewButton()
    /**
     * Calls appropriate social media post creater based on selected social medial platform.
     */
    previewBtn.addEventListener('click', async () => {
      const url = urlInput.value
      const caption = captionInput.value

      if (url && url !== '') {
        switch (pluginObj.selectedSocialMedia) {
          case 'Twitter':
            await pluginObj.createTwitterPost(url, caption)
            break
          default:
        }
      }
    })

    /**
     * Creates form wrapper.
     */
    const formWrapper = document.createElement('div')
    formWrapper.classList.add('form-wrapper')

    formWrapper.appendChild(urlInput)
    formWrapper.appendChild(captionInput)
    formWrapper.appendChild(previewBtn)

    return formWrapper
  } catch (error) {
    console.error(error)
    throw error
  }
}
