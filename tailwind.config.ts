import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container : {
        center : true,
        padding: {
          DEFAULT: '1rem',  // varsayılan padding değeri (16px mobil)
          sm: '1rem',  // küçük ekranlar için padding değeri (16px)
          lg: '1.5rem',  // büyük ekranlar için padding değeri
          xl: '7.5rem',  // ekstra büyük ekranlar için padding değeri
        },
        screens : {
          xs : '100%',
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1512px',
        },
        },
      colors : {
        // Default Colors
        'base-bg': '#FFFFFF',
        'grey-bg': '#FCFCFC',
        'black-bg': '#1C1C1C',
        'base-text-black': '#171717',
        'base-text-white': '#FFFFFF',
        
        // Greys
        'grey': {
          '25': '#F4F5F6',
          '50': '#E8EBED',
          '100': '#DCE0E4',
          '200': '#D2D6DB',
          '300': '#C6CCD2',
          '400': '#A9B2BC',
          '500': '#8D99A5',
          '600': '#70808F',
          '700': '#5A6672',
          '800': '#434D56',
          '900': '#2D3339',
        },
        
        // Primary Colors
        'primary': {
          '50': '#FFF5F6',
          '100': '#FFDDE1',
          '200': '#FFBFC8',
          '300': '#FF9AAC',
          '400': '#F45C73',
          '500': '#E82C4B', // Primary red color (default-bg, default-text, default-border)
          '600': '#CC2441', // hover-bg, hover-text, hover-border
          '700': '#A31F35',
          '800': '#7B192A',
          '900': '#4C0F1A',
          'disabled-bg': '#F6B6C0',
          'disabled-text': '#F6B6C0',
          'disabled-border': '#F6B6C0',
        },
        // Backward compatibility
        'primary_hover': '#CC2441',
        
        // White with opacity
        'white': {
          'default': '#FFFFFF',
          '80': 'rgba(255, 255, 255, 0.8)',
          '60': 'rgba(255, 255, 255, 0.6)',
          '40': 'rgba(255, 255, 255, 0.4)',
          '20': 'rgba(255, 255, 255, 0.2)',
          '16': 'rgba(255, 255, 255, 0.16)',
          '12': 'rgba(255, 255, 255, 0.12)',
          '8': 'rgba(255, 255, 255, 0.08)',
        },
        
        // Secondary Colors
        'secondary': {
          'bg': '#F3F5F6', // Solid default-bg
          'hover': '#E5E8EB', // Solid hover-bg
          'text': '#171A1D', // Solid default-text, hover-text
          'text-alt': '#1A1A1A', // Outline/Flat default-text, hover-text
          'border': '#D1D6DB', // Outline default-border
          'hover-border': '#98A3AE', // Outline hover-border
          'flat-default': '#D1D6DB', // Flat default-text
          'disabled-bg': '#E2E5E9', // Solid disabled-bg
          'disabled-border': '#E5E8EB', // Outline disabled-border
          'disabled-text': '#B5BDC5', // disabled-text
        },
        
        // Neutral/Black Button Colors (Third Button)
        'neutral': {
          // Solid Button
          'bg': '#1A1A1A',
          'text': '#FFFFFF',
          'hover-bg': '#242424',
          'disabled-bg': '#4D4D4D',
          'disabled-text': '#C7C7C7',
          
          // Outline & Flat Buttons
          'border': '#1A1A1A',
          'text-outline-flat': '#1A1A1A',
          'hover-border': '#242424',
          'disabled-border': '#BDBDBD',
          'disabled-text-outline-flat': '#BDBDBD',
        },
        
        // Flat Button Colors
        'flat': {
          'text': '#1A1A1A',
          'hover': '#485563',
          'disabled': '#9CA3AF',
          'hover-dark': '#000000',
        },
        
        // Badge Colors
        'badge': {
          // Red badge (error)
          'error-bg': '#FDEDEF',
          'error-text': '#E6193B',
          'error-text-alt': '#56101C',
          'error-dark-bg': '#E6193B',
          'error-dark-text': '#56101C',
          
          // Blue badge (info)
          'info-bg': '#EDF5FD',
          'info-text': '#1A80E5',
          'info-text-alt': '#0A335C',
          'info-dark-bg': '#1A80E5',
          'info-dark-text': '#0A335C',
          
          // Yellow badge (warning)
          'warning-bg': '#FFFCEB',
          'warning-text': '#FFD500',
          'warning-text-alt': '#665500',
          'warning-dark-bg': '#FFD500',
          'warning-dark-text': '#665500',
          
          // Green badge (success)
          'success-bg': '#EBFFF3',
          'success-text': '#00C14C',
          'success-text-alt': '#006629',
          'success-dark-bg': '#00C14C',
          'success-dark-text': '#006629',
          
          // Purple badge (primary)
          'primary-bg': '#F5EDFD',
          'primary-text': '#8019E6',
          'primary-text-alt': '#330A5C',
          'primary-dark-bg': '#8019E6',
          'primary-dark-text': '#330A5C',
          
          // Orange badge (warning alternative)
          'orange-bg': '#FDF5ED',
          'orange-text': '#E68019',
          'orange-text-alt': '#5C330A',
          'orange-dark-bg': '#E68019',
          'orange-dark-text': '#5C330A',
          
          // Teal badge
          'teal-bg': '#EBFCFF',
          'teal-text': '#00C3EB',
          'teal-text-alt': '#005566',
          'teal-dark-bg': '#00C3EB',
          'teal-dark-text': '#005566',
          
          // Pink badge
          'pink-bg': '#FDEDF5',
          'pink-text': '#E51A80',
          'pink-text-alt': '#5C0A33',
          'pink-dark-bg': '#E51A80',
          'pink-dark-text': '#5C0A33',
          
          // Grey badge (neutral)
          'neutral-bg': '#F4F5F6',
          'neutral-text': '#70808F',
          'neutral-dark-bg': '#70808F',
          'neutral-dark-text': '#FFFFFF',
        },
        
        // Success Colors
        'success': {
          '50': '#E6F9ED',
          '100': '#C8F2D9',
          '200': '#9FE8C0',
          '300': '#6FDC9B',
          '400': '#44CE7C',
          '500': '#00C14C',
          '600': '#00A844',
          '700': '#008C38',
          '800': '#006A2A',
          '900': '#00451C',
        },
        
        // Black with opacity
        'black': {
          'default': '#000000',
          '80': 'rgba(0, 0, 0, 0.8)',
          '60': 'rgba(0, 0, 0, 0.6)',
          '40': 'rgba(0, 0, 0, 0.4)',
          '20': 'rgba(0, 0, 0, 0.2)',
          '16': 'rgba(0, 0, 0, 0.16)',
          '12': 'rgba(0, 0, 0, 0.12)',
          '8': 'rgba(0, 0, 0, 0.08)',
          '0': '#FFFFFF',
        },
        
        // Error Colors
        'error': {
          '50': '#FDECEC',
          '100': '#F9C6C6',
          '200': '#F29B9B',
          '300': '#EC6F6F',
          '400': '#E54848',
          '500': '#D92D20',
          '600': '#B42318',
          '700': '#912018',
          '800': '#7A1A16',
          '900': '#611210',
        },
      },
      fontFamily: {
        sans: ['Sour Gummy', 'Sour Gummy Expanded', 'Sour Gummy SemiExpanded'].concat('sans-serif')
      },
      fontSize: {
        '6xl': ['60px', { lineHeight: '74px', letterSpacing: '-0.02em' }],
        '5xl': ['48px', { lineHeight: '58px', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        // Paragraph Scale - Design System
        'paragraph-5x-lg': ['24px', { lineHeight: '42px', letterSpacing: '0' }],
        'paragraph-4x-lg': ['24px', { lineHeight: '38px', letterSpacing: '0' }],
        'paragraph-3x-lg': ['22px', { lineHeight: '36px', letterSpacing: '0' }],
        'paragraph-2x-lg': ['20px', { lineHeight: '32px', letterSpacing: '0' }],
        'paragraph-1x-lg': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        'paragraph-lg': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'paragraph-md': ['14px', { lineHeight: '22px', letterSpacing: '0' }],
        'paragraph-sm': ['12px', { lineHeight: '18px', letterSpacing: '0' }],
        'paragraph-xsm': ['12px', { lineHeight: '18px', letterSpacing: '0' }],
        // Heading Scale - Design System
        'heading-1': ['56px', { lineHeight: '84px', letterSpacing: '-0.02em' }],
        'heading-2': ['48px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
        'heading-3': ['40px', { lineHeight: '52px', letterSpacing: '-0.01em' }],
        'heading-4': ['32px', { lineHeight: '42px', letterSpacing: '-0.01em' }],
        // Size Scale - Design System
        'size-5x-lg': ['26px', { lineHeight: '34px', letterSpacing: '0' }],
        'size-4x-lg': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
        'size-3x-lg': ['22px', { lineHeight: '28px', letterSpacing: '0' }],
        'size-2x-lg': ['20px', { lineHeight: '24px', letterSpacing: '0' }],
        'size-1x-lg': ['18px', { lineHeight: '22px', letterSpacing: '0' }],
        'size-md': ['16px', { lineHeight: '20px', letterSpacing: '0' }],
        'size-sm': ['14px', { lineHeight: '18px', letterSpacing: '0' }],
        'size-xsm': ['14px', { lineHeight: '18px', letterSpacing: '0' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};

export default config;

