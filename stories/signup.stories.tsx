// YourComponent.stories.ts|tsx

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Signup from '../lib/components/cta/signup';

export default {
  title: 'TryForFree',
  component: Signup,
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
    text: {
      description: 'text to display',
    },
  },
} as ComponentMeta<typeof Signup>;

//👇 We create a “template” of how args map to rendering
const Template = (props) => <Signup {...props} />;

export const Primary = Template.bind({});
Primary.args = { text: 'Try now' };
