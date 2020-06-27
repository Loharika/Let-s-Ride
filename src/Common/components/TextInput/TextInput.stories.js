import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import {validateUserName} from '../../utils/ValidationUtils'
import '../../../styles/tailwind.css'
import TextInput from '.'

export default {
   component: TextInput,
   title: 'Common/TextInput'
}

export const defaultView = () => <TextInput
placeholderText={'Username'}
            inputText={''}
            onChange={action('onChangeUserName')}
            validate={validateUserName}
/>

export const withOutError = () => (
   <TextInput
      placeholderText={'Username'}
            inputText={'harika'}
            onChange={action('onChangeUserName')}
            validate={validateUserName}
   />
)

export const knobs = () => (
   <TextInput
   placeholderText={'Username'}
   inputText={''}
   onChange={action('onChangeUserName')}
   validate={validateUserName}
   />
)

knobs.story = {
   decorators: [withKnobs]
}
