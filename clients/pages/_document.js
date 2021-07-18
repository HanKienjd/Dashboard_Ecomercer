/* eslint-disable jsx-a11y/lang */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/html-has-lang */
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

// import { getLocaleDataScript } from '@/utils/i18nHelper';


// const defaultIcon = `${publicRuntimeConfig.APP_ICON}`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // console.log("document ", new Date())
    const initialProps = await Document.getInitialProps(ctx);
    const { req: { locale, localeDataScript } } = ctx;
    return {
      ...initialProps,
      locale,
      localeDataScript
    }
  }

  render() {
    return (
      <html lang={`${this.props.locale}`}>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <div className="page-body">
            <div className="op_login" />
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    )
  }
}

export default MyDocument