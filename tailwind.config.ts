
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Comic theme colors
				comic: {
					blue: '#3498FF',
					pink: '#FF3D7F',
					yellow: '#FFD600',
					orange: '#FF9F1C',
					green: '#00E676',
					purple: '#9B5DE5',
					background: '#F8F9FA',
					panel: '#FFFFFF',
					border: '#000000',
					text: '#222222'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'shake': {
					'0%, 100%': {
						transform: 'rotate(0deg)'
					},
					'25%': {
						transform: 'rotate(5deg)'
					},
					'75%': {
						transform: 'rotate(-5deg)'
					}
				},
				'flip': {
					'0%': {
						transform: 'rotateY(0deg)'
					},
					'100%': {
						transform: 'rotateY(180deg)'
					}
				},
				'pop': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.1)'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'page-turn': {
					'0%': {
						transform: 'rotateY(0deg)',
						boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
					},
					'100%': {
						transform: 'rotateY(-180deg)',
						boxShadow: '0 15px 25px rgba(0,0,0,0.3)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 10px rgba(255,215,0,0.5)'
					},
					'50%': {
						boxShadow: '0 0 25px rgba(255,215,0,0.9)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-500px 0'
					},
					'100%': {
						backgroundPosition: '500px 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'shake': 'shake 2s ease-in-out infinite',
				'flip': 'flip 0.6s ease-in-out',
				'pop': 'pop 0.3s ease-out',
				'page-turn': 'page-turn 1.2s ease-in-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'shimmer': 'shimmer 2s infinite linear'
			},
			fontFamily: {
				'comic': ['"Comic Neue"', 'cursive'],
				'bangers': ['"Bangers"', 'cursive'],
				'marker': ['"Permanent Marker"', 'cursive']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
