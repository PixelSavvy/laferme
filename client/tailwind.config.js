import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	container: {
  		center: 'true',
  		padding: '1.5rem',
  		screens: 'lg'
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--clr-background))',
  			foreground: 'hsl(var(--clr-foreground))',
  			ring: 'hsl(var(--clr-ring))',
  			input: 'hsl(var(--clr-input))',
  			primary: {
  				'50': 'hsl(var(--clr-primary-50))',
  				'100': 'hsl(var(--clr-primary-100))',
  				'200': 'hsl(var(--clr-primary-200))',
  				'300': 'hsl(var(--clr-primary-300))',
  				'400': 'hsl(var(--clr-primary-400))',
  				'500': 'hsl(var(--clr-primary-500))',
  				'600': 'hsl(var(--clr-primary-600))',
  				'700': 'hsl(var(--clr-primary-700))',
  				'800': 'hsl(var(--clr-primary-800))',
  				'900': 'hsl(var(--clr-primary-900))',
  				'950': 'hsl(var(--clr-primary-950))'
  			},
  			neutral: {
  				'50': 'hsl(var(--clr-neutral-50))',
  				'100': 'hsl(var(--clr-neutral-100))',
  				'200': 'hsl(var(--clr-neutral-200))',
  				'300': 'hsl(var(--clr-neutral-300))',
  				'400': 'hsl(var(--clr-neutral-400))',
  				'500': 'hsl(var(--clr-neutral-500))',
  				'600': 'hsl(var(--clr-neutral-600))',
  				'700': 'hsl(var(--clr-neutral-700))',
  				'800': 'hsl(var(--clr-neutral-800))',
  				'900': 'hsl(var(--clr-neutral-900))'
  			},
  			success: {
  				'50': 'hsl(var(--clr-success-50))',
  				'100': 'hsl(var(--clr-success-100))',
  				'200': 'hsl(var(--clr-success-200))',
  				'300': 'hsl(var(--clr-success-300))',
  				'400': 'hsl(var(--clr-success-400))',
  				'500': 'hsl(var(--clr-success-500))',
  				'600': 'hsl(var(--clr-success-600))',
  				'700': 'hsl(var(--clr-success-700))',
  				'800': 'hsl(var(--clr-success-800))',
  				'900': 'hsl(var(--clr-success-900))',
  				'950': 'hsl(var(--clr-success-950))'
  			},
  			danger: {
  				'50': 'hsl(var(--clr-danger-50))',
  				'100': 'hsl(var(--clr-danger-100))',
  				'200': 'hsl(var(--clr-danger-200))',
  				'300': 'hsl(var(--clr-danger-300))',
  				'400': 'hsl(var(--clr-danger-400))',
  				'500': 'hsl(var(--clr-danger-500))',
  				'600': 'hsl(var(--clr-danger-600))',
  				'700': 'hsl(var(--clr-danger-700))',
  				'800': 'hsl(var(--clr-danger-800))',
  				'900': 'hsl(var(--clr-danger-900))',
  				'950': 'hsl(var(--clr-danger-950))'
  			},
  			warning: {
  				'50': 'hsl(var(--clr-warning-50))',
  				'100': 'hsl(var(--clr-warning-100))',
  				'200': 'hsl(var(--clr-warning-200))',
  				'300': 'hsl(var(--clr-warning-300))',
  				'400': 'hsl(var(--clr-warning-400))',
  				'500': 'hsl(var(--clr-warning-500))',
  				'600': 'hsl(var(--clr-warning-600))',
  				'700': 'hsl(var(--clr-warning-700))',
  				'800': 'hsl(var(--clr-warning-800))',
  				'900': 'hsl(var(--clr-warning-900))',
  				'950': 'hsl(var(--clr-warning-950))'
  			},
  			info: {
  				'50': 'hsl(var(--clr-info-50))',
  				'100': 'hsl(var(--clr-info-100))',
  				'200': 'hsl(var(--clr-info-200))',
  				'300': 'hsl(var(--clr-info-300))',
  				'400': 'hsl(var(--clr-info-400))',
  				'500': 'hsl(var(--clr-info-500))',
  				'600': 'hsl(var(--clr-info-600))',
  				'700': 'hsl(var(--clr-info-700))',
  				'800': 'hsl(var(--clr-info-800))',
  				'900': 'hsl(var(--clr-info-900))',
  				'950': 'hsl(var(--clr-info-950))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			'georgian-sans': 'var(--ff-georgian-sans)'
  		},
  		fontSize: {
  			'desktop-display-lg': 'var(--fz-desktop-dislpay-lg)',
  			'desktop-display-sm': 'var(--fz-desktop-display-sm)',
  			'desktop-h1': 'var(--fz-desktop-h1)',
  			'desktop-h2': 'var(--fz-desktop-h2)',
  			'desktop-h3': 'var(--fz-desktop-h3)',
  			'desktop-h4': 'var(--fz-desktop-h4)',
  			'desktop-h5': 'var(--fz-desktop-h5)',
  			'desktop-h6': 'var(--fz-desktop-h6)',
  			'mobile-h1': 'var(--fz-mobile-h1)',
  			'mobile-h2': 'var(--fz-mobile-h2)',
  			'mobile-h3': 'var(--fz-mobile-h3)',
  			'mobile-h4': 'var(--fz-mobile-h4)',
  			'mobile-h5': 'var(--fz-mobile-h5)',
  			'mobile-h6': 'var(--fz-mobile-h6)',
  			'paragraph-lg': 'var(--fz-paraghrap-lg)',
  			'paragraph-md': 'var(--fz-paraghrap-md)',
  			'paragraph-sm': 'var(--fz-paraghrap-sm)',
  			'label-lg': 'var(--fz-label-lg)',
  			'label-md': 'var(--fz-label-md)',
  			'label-sm': 'var(--fz-label-sm)',
  			'label-xs': 'var(--fz-label-xs)'
  		},
  		lineHeight: {
  			'desktop-display-lg': 'var(--lh-desktop-display-lg)',
  			'desktop-display-sm': 'var(--lh-desktop-display-sm)',
  			'desktop-h1': 'var(--lh-desktop-h1)',
  			'desktop-h2': 'var(--lg-desktop-h2)',
  			'desktop-h3': 'var(--lg-desktop-h3)',
  			'desktop-h4': 'var(--lg-desktop-h4)',
  			'desktop-h5': 'var(--lg-desktop-h5)',
  			'desktop-h6': 'var(--lg-desktop-h6)',
  			'mobile-h1': 'var(--lh-mobile-h1)',
  			'mobile-h2': 'var(--lh-mobile-h2)',
  			'mobile-h3': 'var(--lh-mobile-h3)',
  			'mobile-h4': 'var(--lh-mobile-h4)',
  			'mobile-h5': 'var(--lh-mobile-h5)',
  			'mobile-h6': 'var(--lh-mobile-h6)',
  			'paragraph-lg': 'var(--lh-paraghrap-lg)',
  			'paragraph-md': 'var(--lh-paraghrap-md)',
  			'paragraph-sm': 'var(--lh-paraghrap-sm)',
  			'label-lg': 'var(--lh-label-lg)',
  			'label-md': 'var(--lh-label-md)',
  			'label-sm': 'var(--lh-label-sm)',
  			'label-xs': 'var(--lh-label-xs)'
  		},
  		letterSpacing: {
  			tight: 'var(--ls-tight)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, theme }) {
      const customTextStyles = {
        /* Desktop Display Large */
        ".typo-desktop-display-lg-medium": {
          fontSize: theme("fontSize.desktop-display-lg"),
          lineHeight: theme("lineHeight.desktop-display-lg"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },

        /* Desktop Display Small */
        ".typo-desktop-display-sm-medium": {
          fontSize: theme("fontSize.desktop-display-sm"),
          lineHeight: theme("lineHeight.desktop-display-sm"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },

        /* Desktop H1 */
        ".typo-desktop-h1": {
          fontSize: theme("fontSize.desktop-h1"),
          lineHeight: theme("lineHeight.desktop-h1"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },

        /* Desktop H2 */
        ".typo-desktop-h2": {
          fontSize: theme("fontSize.desktop-h2"),
          lineHeight: theme("lineHeight.desktop-h2"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Desktop H3 */
        ".typo-desktop-h3": {
          fontSize: theme("fontSize.desktop-h3"),
          lineHeight: theme("lineHeight.desktop-h3"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Desktop H4 */
        ".typo-desktop-h4": {
          fontSize: theme("fontSize.desktop-h4"),
          lineHeight: theme("lineHeight.desktop-h4"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Desktop H5 */
        ".typo-desktop-h5": {
          fontSize: theme("fontSize.desktop-h5"),
          lineHeight: theme("lineHeight.desktop-h5"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Desktop H6 */
        ".typo-desktop-h6": {
          fontSize: theme("fontSize.desktop-h6"),
          lineHeight: theme("lineHeight.desktop-h6"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H1 */
        ".typo-mobile-h1": {
          fontSize: theme("fontSize.mobile-h1"),
          lineHeight: theme("lineHeight.mobile-h1"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H2 */
        ".typo-mobile-h2": {
          fontSize: theme("fontSize.mobile-h2"),
          lineHeight: theme("lineHeight.mobile-h2"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H3 */
        ".typo-mobile-h3": {
          fontSize: theme("fontSize.mobile-h3"),
          lineHeight: theme("lineHeight.mobile-h3"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H4 */
        ".typo-mobile-h4": {
          fontSize: theme("fontSize.mobile-h4"),
          lineHeight: theme("lineHeight.mobile-h4"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H5 */
        ".typo-mobile-h5": {
          fontSize: theme("fontSize.mobile-h5"),
          lineHeight: theme("lineHeight.mobile-h5"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Mobile H6 */
        ".typo-mobile-h6": {
          fontSize: theme("fontSize.mobile-h6"),
          lineHeight: theme("lineHeight.mobile-h6"),
          fontWeight: theme("fontWeight.medium"),
          letterSpacing: theme("letterSpacing.tight"),
        },
        /* Paragraph Large */
        ".typo-paragraph-lg": {
          fontSize: theme("fontSize.paragraph-lg"),
          lineHeight: theme("lineHeight.paragraph-lg"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Paragraph Medium */
        ".typo-paragraph-md": {
          fontSize: theme("fontSize.paragraph-md"),
          lineHeight: theme("lineHeight.paragraph-md"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Paragraph Small */
        ".typo-paragraph-sm": {
          fontSize: theme("fontSize.paragraph-sm"),
          lineHeight: theme("lineHeight.paragraph-sm"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Label Large */
        ".typo-label-lg": {
          fontSize: theme("fontSize.label-lg"),
          lineHeight: theme("lineHeight.label-lg"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Label Medium */
        ".typo-label-md": {
          fontSize: theme("fontSize.label-md"),
          lineHeight: theme("lineHeight.label-md"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Label Small */
        ".typo-label-sm": {
          fontSize: theme("fontSize.label-sm"),
          lineHeight: theme("lineHeight.label-sm"),
          fontWeight: theme("fontWeight.regular"),
        },
        /* Label Extra Small */
        ".typo-label-xs": {
          fontSize: theme("fontSize.label-xs"),
          lineHeight: theme("lineHeight.label-xs"),
          fontWeight: theme("fontWeight.regular"),
        },
      };

      addUtilities(customTextStyles);
    }),
  ],
};
