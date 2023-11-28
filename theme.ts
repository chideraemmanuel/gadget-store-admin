const theme = {
  layout: {
    // header-max-width: 1400px;
    // section-max-width: 1200px;
    // side-padding: 24px;
    // border-radius: 12px;
  },

  colors: {
    'primary-color': '#121212',
    'secondary-color': 'e0e0e0',

    light: {
      // TEXT COLOR
      'primary-text-color': '#000',
      'secondary-text-color': '#666',
      'text-gradient': 'linear-gradient(180deg, #555, #000)',

      'gray-100': '#f2f2f2',
      'gray-200': '#ebebeb',
      'gray-300': '#e6e6e6',
      'gray-400': '#ebebeb',
      'gray-500': '#c9c9c9',
      'gray-600': '#a8a8a8',
      'gray-700': '#8f8f8f',
      'gray-800': '#7d7d7d',
      'gray-900': '#666',
      'gray-1000': '#171717',
    },
    dark: {
      // TEXT COLOR
      'primary-text-color': '#fafafa',
      'secondary-text-color': '#888',
      'text-gradient': 'linear-gradient(180deg, #fff, #adadad)',

      'gray-100': '#1a1a1a',
      'gray-200': '#1f1f1f',
      'gray-300': '#292929',
      'gray-400': '#2e2e2e',
      'gray-500': '#454545',
      'gray-600': '#878787',
      'gray-700': '#8f8f8f',
      'gray-800': '#7d7d7d',
      'gray-900': '#a1a1a1',
      'gray-1000': '#221d1d',
    },
  },

  font: {
    'xs-font': 'clamp(0.75rem, 0.7021rem + 0.2128vw, 0.875rem)',
    'sm-font': 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)',
    'base-font': 'clamp(1rem, 0.934rem + 0.2817vw, 1.1875rem)',
    'md-font': 'clamp(1.25rem, 1.14rem + 0.4695vw, 1.5625rem)',
    'lg-font': 'clamp(1.5625rem, 1.3644rem + 0.8451vw, 2.125rem)',
    'xl-font': 'clamp(1.9375rem, 1.6294rem + 1.3146vw, 2.8125rem)',
    '2xl-font': 'clamp(2.4375rem, 1.9754rem + 1.9718vw, 3.75rem)',
    '3xl-font': 'clamp(3.0625rem, 2.3803rem + 2.9108vw, 5rem)',
  },

  space: {
    'space-1': '0.25rem',
    'space-2': '0.5rem',
    'space-3': '0.75rem',
    'space-4': '1rem',
    'space-5': '1.25rem',
    'space-6': '1.5rem',
    'space-8': '2rem',
    'space-10': '2.5rem',
    'space-12': '3rem',
    'space-16': '4rem',
    'space-20': '5rem',
    'space-24': '6rem',
    'space-32': '8rem',
    'space-40': '10rem',
    'space-48': '12rem',
    'space-56': '14rem',
    'space-64': '16rem',

    'fluid-inline-space-1': 'clamp(0.25rem, 0.1923rem + 0.2564vw, 0.5rem)',
    'fluid-inline-space-2': 'clamp(0.5rem, 0.4423rem + 0.2564vw, 0.75rem)',
    'fluid-inline-space-3': 'clamp(0.75rem, 0.6923rem + 0.2564vw, 1rem)',
    'fluid-inline-space-4': 'clamp(1rem, 0.9423rem + 0.2564vw, 1.25rem)',
    'fluid-inline-space-5': 'clamp(1.25rem, 1.1923rem + 0.2564vw, 1.5rem)',
    'fluid-inline-space-6': 'clamp(1.5rem, 1.4423rem + 0.2564vw, 1.75rem)',
    'fluid-inline-space-7': 'clamp(1.75rem, 1.6923rem + 0.2564vw, 2rem)',
    'fluid-inline-space-8': 'clamp(2rem, 0.9423rem + 0.2564vw, 2.25rem)',
    'fluid-inline-space-9': 'clamp(2.25rem, 1.1923rem + 0.2564vw, 2.5rem)',
    'fluid-inline-space-10': 'clamp(2.5rem, 1.4423rem + 0.2564vw, 2.75rem)',
    'fluid-inline-space-11': 'clamp(2.75rem, 1.6923rem + 0.2564vw, 3rem)',
    'fluid-inline-space-12': 'clamp(3rem, 0.9423rem + 0.2564vw, 3.25rem)',
    'fluid-inline-space-13': 'clamp(3.25rem, 1.1923rem + 0.2564vw, 3.5rem)',
    'fluid-inline-space-14': 'clamp(3.5rem, 1.4423rem + 0.2564vw, 3.75rem)',
    'fluid-inline-space-15': 'clamp(3.75rem, 1.6923rem + 0.2564vw, 4rem)',
    'fluid-inline-space-16': 'clamp(4rem, 0.9423rem + 0.2564vw, 4.25rem)',
    'fluid-inline-space-17': 'clamp(4.25rem, 1.1923rem + 0.2564vw, 4.5rem)',
    'fluid-inline-space-18': 'clamp(4.5rem, 1.4423rem + 0.2564vw, 4.75rem)',
    'fluid-inline-space-19': 'clamp(4.75rem, 1.6923rem + 0.2564vw, 5rem)',

    'fluid-block-space-1': 'clamp(0.25rem, 0.1923rem + 0.2564vh, 0.5rem)',
    'fluid-block-space-2': 'clamp(0.5rem, 0.4423rem + 0.2564vh, 0.75rem)',
    'fluid-block-space-3': 'clamp(0.75rem, 0.6923rem + 0.2564vh, 1rem)',
    'fluid-block-space-4': 'clamp(1rem, 0.9423rem + 0.2564vh, 1.25rem)',
    'fluid-block-space-5': 'clamp(1.25rem, 1.1923rem + 0.2564vh, 1.5rem)',
    'fluid-block-space-6': 'clamp(1.5rem, 1.4423rem + 0.2564vh, 1.75rem)',
    'fluid-block-space-7': 'clamp(1.75rem, 1.6923rem + 0.2564vh, 2rem)',
    'fluid-block-space-8': 'clamp(2rem, 0.9423rem + 0.2564vh, 2.25rem)',
    'fluid-block-space-9': 'clamp(2.25rem, 1.1923rem + 0.2564vh, 2.5rem)',
    'fluid-block-space-10': 'clamp(2.5rem, 1.4423rem + 0.2564vh, 2.75rem)',
    'fluid-block-space-11': 'clamp(2.75rem, 1.6923rem + 0.2564vh, 3rem)',
    'fluid-block-space-12': 'clamp(3rem, 0.9423rem + 0.2564vh, 3.25rem)',
    'fluid-block-space-13': 'clamp(3.25rem, 1.1923rem + 0.2564vh, 3.5rem)',
    'fluid-block-space-14': 'clamp(3.5rem, 1.4423rem + 0.2564vh, 3.75rem)',
    'fluid-block-space-15': 'clamp(3.75rem, 1.6923rem + 0.2564vh, 4rem)',
    'fluid-block-space-16': 'clamp(4rem, 0.9423rem + 0.2564vh, 4.25rem)',
    'fluid-block-space-17': 'clamp(4.25rem, 1.1923rem + 0.2564vh, 4.5rem)',
    'fluid-block-space-18': 'clamp(4.5rem, 1.4423rem + 0.2564vh, 4.75rem)',
    'fluid-block-space-19': 'clamp(4.75rem, 1.6923rem + 0.2564vh, 5rem)',
  },
};

export default theme;
