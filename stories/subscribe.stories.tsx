// YourComponent.stories.ts|tsx

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Subscribe from '../lib/components/cta/subscribe';

export default {
  title: 'Newsletter Subscribe',
  component: Subscribe,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as ComponentMeta<typeof Subscribe>;

//👇 We create a “template” of how args map to rendering
const Template = (props) => <Subscribe {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  // title: 'Never miss an update',
  // subTitle: 'Subscribe to receive the freshest subscription resources from HomeKasa.',
  id: 'test-id',
  disclaimerURL: '/legal/privacy',
  buttonLabel: 'Subscribe',
  description: 'Description',
};
