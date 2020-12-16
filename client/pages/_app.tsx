import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar/Sidebar';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
