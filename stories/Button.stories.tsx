// YourComponent.stories.ts|tsx

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Button from '../lib/components/primitives/button';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      description: 'Three sizes (small, medium, large). Optional',
    },
    id: {
      description: 'Optional parameter. Used as id in Button on DOM',
    }
  },
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template = (props) => <Button {...props}> {props.label}</Button>;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = { label: 'Button', variant: 'primary', size: 'medium', id: 'button-id' };
