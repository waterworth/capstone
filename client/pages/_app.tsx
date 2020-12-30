import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/theme';

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
        <ThemeProvider theme={lightTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
