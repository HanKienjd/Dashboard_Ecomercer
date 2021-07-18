import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import IntlProviderWrapper from '@/utils/IntlProviderWrapper';
import withDva from '@/utils/withDva';
import models from '@/models';
import viData from '@/locales/vi';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    ctx.roles = [];
    let pageProps = {}
    // console.log("\x1b[2m", "\x1b[31m", "\x1b[44m", "Sample Text", "\x1b[0m");
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx })
    }

    /* const { req } = ctx
    // eslint-disable-next-line no-underscore-dangle
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    console.log("_app locale: %o \n messages: %o", locale, messages) */
    const initialNow = Date.now()

    return { pageProps, initialNow }
  }

  render() {
    const { Component, pageProps, locale, messages, initialNow, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <IntlProviderWrapper
            locale={locale || 'vi'}
            messages={messages || viData}
            initialNow={initialNow}
          >
            <Component {...pageProps} />
          </IntlProviderWrapper>
        </Provider>
      </Container>
    )
  }
}

export default withDva(models)(MyApp)
