try {
  const IntlPolyfill = require('intl');
  const compression = require('compression')
  const express = require('express')
  const cookieParser = require('cookie-parser')
  const bodyParser = require('body-parser')
  const { createServer } = require('http')
  const next = require('next')
  const { parse } = require('url')
  const { join } = require('path')
  const fs = require('fs');
  const path = require('path');
  const crypto = require('crypto');
  const { /* serialize, */ deserialize } = require('json-immutable');
  const { readFileSync } = require('fs');

  const isProd = process.env.NODE_ENV === 'production';

  if (process.env.NODE_ENV === "production") {
    require('dotenv').config({ path: path.resolve(process.cwd(), '.env.production') });
  } else {
    require('dotenv').config();
  }

  const port = parseInt(process.env.PORT, 10) || 6001
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const Router = require('./routes').Router

  const oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
  const PASS = 'PASS123';

  /* const encryptedString = (data, passWord) => {
    const cipher = crypto.createCipher('aes192', passWord)
    let encrypted = cipher.update(data, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    // console.log("encrypted with pass %s: %s", passWord, encrypted)
    return encrypted
  } */

  const decryptedString = (data, passWord) => {
    const decipher = crypto.createDecipher('aes192', passWord)
    let decrypted = decipher.update(data, 'base64', 'utf8')
    decrypted += decipher.final('utf8')
    // console.log("decrypted with pass %s: %s", passWord, decrypted)
    return decrypted
  }

  Intl.NumberFormat = IntlPolyfill.NumberFormat
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

  // Get the supported languages by looking for translations in the `lang/` dir.
  /* const supportedLanguages = glob
    .sync('./lang/*.json')
    .map(f => path(f, '.json')) */

  // We need to expose React Intl's locale data on the request for the user's
  // locale. This function will also cache the scripts by lang in memory.
  const localeDataCache = new Map()
  const getLocaleDataScript = locale => {
    const lang = locale.split('-')[0]
    if (!localeDataCache.has(lang)) {
      const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
      const localeDataScript = readFileSync(localeDataFile, 'utf8')
      localeDataCache.set(lang, localeDataScript)
    }
    return localeDataCache.get(lang)
  }

  // We need to load and expose the translations on the request for the user's
  // locale. These will only be used in production, in dev the `defaultMessage` in
  // each message description in the source code will be used.
  const getMessages = locale => {
    // eslint-disable-next-line import/no-dynamic-require
    const messages = require(`./locales/${locale}.js`);
    // console.log("messages: ", messages)
    return messages;
  }

  const handler = app.getRequestHandler(app)
  app.prepare().then(() => {
    const server = express()
    // compress all requests
    if (isProd) {
      server.use(compression());
    }
    server.use(express.static(path.join(__dirname, '/.next')));
    // Caches the static files for a year.
    server.use('/', express.static(__dirname + '/public/', { maxAge: oneYear }));

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({
      extended: false
    }));
    server.use(cookieParser());
    server.use((req, res, next) => {
      // console.log("server ", new Date())
      res.cookie('locale', 'vi', { expires: 0, path: '/' });

      const i18nCookie = req.cookies.i18n;
      let i18n;
      if (typeof i18nCookie !== 'undefined') {
        i18n = deserialize(decryptedString(i18nCookie, PASS));
        // console.log("i18n: %o", i18n)
        try {
          i18n = JSON.parse(i18n)
          // console.log("i18n: %o", i18n.lang)
        } catch (error) {
          i18n = null;
        }
      }

      // const locale = accept.language(accept.languages(supportedLanguages)) || 'en';
      const locale = i18n && i18n.lang || 'vi';
      // console.log("i18n: %o || locale: ", i18n, locale)
      req.locale = locale
      req.localeDataScript = getLocaleDataScript(locale)
      req.messages = getMessages(locale)
      // console.log("i18n: %o, locale: %o", i18n, locale, Object.values(req.messages).length)
      next();
    })

    /* if (isProd) {
      server.get('*.js', function (req, res) {
        if (!new RegExp("styles").test(req.url) && !new RegExp("service-worker").test(req.url)) {
          try {
            res.set('Content-Encoding', 'gzip');
            res.setHeader('Vary', 'Accept-Encoding');
            res.setHeader('Cache-Control', '.next, max-age=512000');
            res.set('Content-Type', 'text/javascript');
            req.url = `${req.url}.gz`;
          } catch (e) {
          }
        }
        if (new RegExp("service-worker").test(req.url)) {
          const parsedUrl = parse(req.url, true)
          const { pathname } = parsedUrl
          if (pathname === '/service-worker.js') {
            // console.log("server parsedUrl %o pathname %o", join(__dirname, '.next', pathname), pathname)
            const filePath = join(__dirname, '.next', pathname)
            app.serveStatic(req, res, filePath)
          }
        } else {
          return handler(req, res)
        }
      });
      server.get('*.css', function (req, res) {
        try {
          res.set('Content-Encoding', 'gzip');
          res.setHeader('Vary', 'Accept-Encoding');
          res.setHeader('Cache-Control', '.next, max-age=512000');
          res.set('Content-Type', 'text/css');
          req.url = `${req.url}.gz`;
        } catch (e) {
        }
        return handler(req, res)
      });
    } */

    Router.forEachPrettyPattern((page, pattern, defaultParams) =>
      server.get(pattern, (req, res) =>
        app.render(
          req,
          res,
          `/${page}`,
          Object.assign({}, defaultParams, req.query, req.params)
        )
      )
    )

    /* FAKE API MOCK DATA */
    // const mockTest = true;
    // if (!isProd || mockTest) {
    //   let mockRoutes = []
    //   const basename = path.basename(__filename)
    //   const mockDir = `${__dirname}/mock`;
    //   fs.readdirSync(mockDir).filter(function (file) {
    //     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    //   }).forEach(function (file) {
    //     // console.log("file: ", file)
    //     var model = require(path.join(mockDir, file));
    //     // console.log("model: ", model)
    //     // mockRoutes.push({ [file.split('.js')[0]] : model })
    //     Object.keys(model).forEach(item => {
    //       const itemMethod = item.split(" ")[0];
    //       const itemUrl = item.split(" ")[1];
    //       const itemFuntion = model[item];
    //       // console.log("item %o | itemMethod: %o | itemUrl: %o |  itemFuntion: %o", item, itemMethod, itemUrl, itemFuntion)
    //       if (itemMethod === "GET") {
    //         if (typeof itemFuntion === 'function')
    //           server.get(itemUrl, itemFuntion)
    //         else {
    //           server.get(itemUrl, (req, res) => {
    //             res.send(itemFuntion)
    //           })
    //         }
    //       } else if (itemMethod === "POST") {
    //         server.post(itemUrl, itemFuntion)
    //       } else if (itemMethod === "PUT") {
    //         server.put(itemUrl, itemFuntion)
    //       } else if (itemMethod === "PATCH") {
    //         server.patch(itemUrl, itemFuntion)
    //       } else if (itemMethod === "DELETE") {
    //         server.delete(itemUrl, itemFuntion)
    //       }
    //     })
    //   });
    // }
    /* END FAKE API MOCK DATA */

    server.get('*', (req, res) => {
      return handler(req, res)
    })

    const faviconOptions = {
      root: __dirname + '/static/img/'
    };
    server.get('/favicon.ico', (req, res) => (
      res.status(200).sendFile('favicon.ico', faviconOptions)
    ));

    /* if (port === 80) {
      server.listen(err => {
        if (err) throw err
        console.log(`> Ready on http://localhost`)
      })
    } else { */
    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
    // }
  })
} catch (error) {
  console.log(error)
}
