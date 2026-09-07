import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={metadataBase:new URL('https://pokerhub-world.omnibar.chatgpt.site'),title:'Pokerhub — Poker Simulations, Strategy & Country Guides',description:'Practice Texas hold’em with a free hand equity simulator and pot odds calculator. Study poker strategy and explore country-specific licensing guides.',alternates:{canonical:'/'},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
