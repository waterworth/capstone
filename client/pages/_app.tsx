import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Sidebar from '../components/Sidebar/Sidebar';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include' as const,
  cache: new InMemoryCache(),
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default MyApp;
