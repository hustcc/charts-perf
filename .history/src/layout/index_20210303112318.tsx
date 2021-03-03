import React from 'react';
import { Header } from './header';
import { Content } from './content';
import { Footer } from './footer';

/**
 * 整体页面的布局
 */
export function Layout() {
  return (
    <div>
      <Header />

      <Content />

      <Footer />
    </div>
  );
}
