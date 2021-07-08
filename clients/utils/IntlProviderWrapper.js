import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  // console.log("ReactIntlLocaleData: ", window.ReactIntlLocaleData)
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    const { locale, messages, initialNow } = this.props;

    this.switchToEnglish = () => {
      // console.log("switchToEnglish")
      this.setState({ locale: 'en', messages });
    };

    this.switchToVietNam = () => {
      // console.log("switchToVietNam")
      this.setState({ locale: 'vi', messages });
    };

    // pass everything in state to avoid creating object inside render method (like explained in the documentation)
    this.state = {
      locale,
      messages,
      initialNow,
      // eslint-disable-next-line react/no-unused-state
      switchToEnglish: this.switchToEnglish,
      // eslint-disable-next-line react/no-unused-state
      switchToVietNam: this.switchToVietNam,
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages, initialNow } = this.state;
    // console.log("IntlProviderWrapper locale: %o \n messages: %o", locale, messages)
    return (
      <Context.Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          initialNow={initialNow}
          defaultLocale="vi"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export const IntlContext = Context;
export default IntlProviderWrapper;
