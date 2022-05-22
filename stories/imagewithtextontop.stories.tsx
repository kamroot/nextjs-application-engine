// YourComponent.stories.ts|tsx

import React from 'react';
import { ComponentMeta } from '@storybook/react';
import ImageWithTextOnTop from '../lib/components/primitives/image';
import Button from '../lib/components/primitives/button';

export default {
  title: 'Image with text',
  component: ImageWithTextOnTop,
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
    title: {
      description: 'Image title. String or JSX.',
    },
    text: {
      description: 'Text on image. String or JSX. Optional',
    },
    id: {
      description: 'Optional parameter. Used as id the image on DOM',
    },
    opacity: {
      description: 'Optional. Number between 0 to 99',
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
  },
} as ComponentMeta<typeof ImageWithTextOnTop>;

//👇 We create a “template” of how args map to rendering
const Template = (props) => <ImageWithTextOnTop {...props} />;

export const Primary = Template.bind({});
const img = '/img/pages/us-taxes/understanding-taxes-associated-with-owning-real-estate-in-the-united-states.jpg';
Primary.args = {
  image: img,
  title: 'This is the title',
  text: 'some very long text that will be rendedered',
  id: 'test-id',
  alt: 'this is the alt text for the image',
  opacity: 50,
};

export const Hero = Template.bind({});
Hero.args = {
  image: '/img/pages/home/dashboard.jpg',
  title: (
    <h1>
      <span className="block ">Self-Service &nbsp;</span>
      <span className="block text-gray-500 xl:inline">property management</span>
    </h1>
  ),
  text: (
    <>
      <p
        className="mt-3 text-base text-brand-core sm:mx-auto sm:mt-5
           sm:text-lg md:mt-5 md:text-xl lg:mx-0"
      >
        It&apos;s your wealth: Best property management software
      </p>
      <Button variant="primary" id="hero-image-button">
        Get Started
      </Button>
    </>
  ),
  id: 'test-id',
  opacity: 30,
  alt: 'this is the alt text for the image',
};
