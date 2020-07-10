import * as React from 'react'
import GitHubRibbon from 'react-github-ribbons';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import Header from './Header'
import Footer from './Footer'
import { useNetworkHook } from '../hooks/network';
import { useLoadPWAElements } from '../hooks/pwa-loader';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: any
}

export default (props: DefaultLayoutProps) => {
  useLoadPWAElements()
  useNetworkHook()
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
      <GitHubRibbon
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/getshifter/gatsby-starter-wordpress-typescript"
      />
    </div>
  )
}