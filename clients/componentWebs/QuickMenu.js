/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { Icon } from 'antd';
import Head from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const QuickMenu = ({ data, asPath }) => {
  const [runJS, setRunJS] = useState(false);
  const donmains = data && data.url;
  console.log('domains', donmains);
  const { places, siteProfiles } = data;
  const mobile = (siteProfiles && siteProfiles.hotline) || (places && places.mobile);
  const fbId =
    siteProfiles && siteProfiles.socialChannelFacebook && siteProfiles.socialChannelFacebook.link;
  const zaloId =
    siteProfiles && siteProfiles.socialChannelZalo && siteProfiles.socialChannelZalo.link;
  const appId = publicRuntimeConfig.FACEBOOK_APP_ID;
  const url = data && data.url && `https://${data.url}${asPath || ''}`;
  const zalo_share_button = `
    <div class="zalo-share-button" 
        data-oaid=${zaloId}
        data-layout="1"
        data-color="blue"
        data-href=${`${url}`}
        data-customize=false
    >
    </div>`;

  const zalo_chat_widget = `
    <div class="zalo-chat-widget"
        data-oaid=${zaloId} 
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="0" data-width="350" data-height="420"
    >
    </div>`;

  const facebook_chat_widget = `
    <div class="fb-customerchat"
        attribution=setup_tool
        theme_color="#0084ff"
        page_id=${fbId}
        logged_in_greeting="Bạn cần tư vấn gì?"
        logged_out_greeting="Bạn cần tư vấn gì?"
    >
    </div>`;

  function closeBoxShare() {
    const bg = document.querySelector('#BG-position');
    const box = document.querySelector('.box__button_share');
    const quickmenu = document.querySelector('.quick-menu');
    const sharefb = (box && box.querySelector('.fb-share-button')) || null;
    if (box && sharefb && bg && quickmenu) {
      sharefb.style.display = 'none';
      box.classList.remove('show');
      bg.style.display = 'none';
      quickmenu.style.zIndex = 9998;
    }
  }

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        setRunJS(true);
        const share = document.querySelector('#share__btn');
        const bg = document.querySelector('#BG-position');
        const close = document.querySelector('.close__box');
        const box = document.querySelector('.box__button_share');
        const quickmenu = document.querySelector('.quick-menu');
        share.addEventListener('click', () => {
          box.classList.add('show');
          const sharefb = box.querySelector('.fb-share-button');
          if (sharefb) {
            sharefb.style.display = 'block';
          }
          bg.style.display = 'block';
          quickmenu.style.zIndex = 2147483645;
        });
        bg.addEventListener('click', () => {
          closeBoxShare();
        });
        close.addEventListener('click', () => {
          closeBoxShare();
        });
      }
    },
    [data]
  );

  return (
    <>
      {runJS && (
        <Head>
          <script src="https://sp.zalo.me/plugins/sdk.js" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `   window.fbAsyncInit = function() {
                                        FB.init({
                                        xfbml            : false,
                                        version          : 'v8.0'
                                        });
                                    };

                                    (function(d, s, id) {
                                    var js, fjs = d.getElementsByTagName(s)[0];
                                    if (d.getElementById(id)) return;
                                    js = d.createElement(s); js.id = id;
                                    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                                    fjs.parentNode.insertBefore(js, fjs);
                                    }(document, 'script', 'facebook-jssdk'));`,
            }}
          />
          <script
            async
            defer
            crossOrigin="anonymous"
            src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v7.0&$appid=${appId}&autoLogAppEvents=1`}
            nonce="WDtLnfS5"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: siteProfiles && siteProfiles.chatbox }}
          />
        </Head>
      )}
      {fbId && (
        <div
          className="facebook-button-chat"
          dangerouslySetInnerHTML={{ __html: facebook_chat_widget }}
        />
      )}

      {zaloId && (
        <div className="zalo-button-chat" dangerouslySetInnerHTML={{ __html: zalo_chat_widget }} />
      )}

      <nav className="quick-menu shadow-box bg-white" style={{ zIndex: 9998 }}>
        <div
          id="BG-position"
          style={{
            position: 'fixed',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: '#9a8e8eb0',
            display: 'none',
          }}
        />
        <div className="box__button_share">
          <div
            className="close__box"
            style={{ position: 'absolute', top: '0px', right: 0, padding: '0 5px 5px' }}
          >
            <Icon type="close" style={{ fontSize: '15px' }} />
          </div>
          <div
            className="fb-share-button"
            data-href={`${url}`}
            data-layout="button"
            data-size="large"
          >
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
              className="fb-xfbml-parse-ignore"
            />
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            dangerouslySetInnerHTML={{ __html: zalo_share_button }}
          />
        </div>
        <ul
          className="gray-51 clearfix"
          style={{ margin: 0, display: 'flex', padding: 0, width: '100%' }}
        >
          <li className="w-full tc relative perfect-center">
            <a
              className="pd5 w-full gray-51 "
              href="https://webshop.com.vn/"
              title={donmains}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.421"
                height="19.41"
                viewBox="0 0 20.421 19.41"
              >
                <path
                  id="Path_1702"
                  data-name="Path 1702"
                  d="M20.078,21.3,10.916,12.95a1.042,1.042,0,0,0-1.411,0L.343,21.3a1.047,1.047,0,0,0,.705,1.821H2.512v8.365a.6.6,0,0,0,.6.6H8.134a.6.6,0,0,0,.6-.6V26.406h2.952v5.079a.6.6,0,0,0,.6.6h5.022a.6.6,0,0,0,.6-.6V23.12h1.464a1.047,1.047,0,0,0,.705-1.821Z"
                  transform="translate(0 -12.675)"
                  fill="#4b4b4b"
                />
              </svg>
            </a>
          </li>
          <li className="w-full tc relative perfect-center ">
            <a
              className="pd5 w-full gray-51 contact-box phone_ringing"
              title="Liên hệ"
              href={`tel:${mobile}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.011"
                height="18.968"
                viewBox="0 0 19.011 18.968"
              >
                <path
                  id="Path_1701"
                  data-name="Path 1701"
                  d="M387.014,281.264c.048-.315.084-.634.146-.948a4.135,4.135,0,0,1,.778-1.766,9.021,9.021,0,0,1,1.054-1.133,1.483,1.483,0,0,1,2.037.074q1.458,1.441,2.9,2.9a1.511,1.511,0,0,1-.013,2.18c-.433.45-.881.886-1.324,1.326a1.41,1.41,0,0,1-.15.12,13.893,13.893,0,0,0,6.607,6.608c.463-.468.938-.946,1.41-1.425a1.6,1.6,0,0,1,.843-.473,1.465,1.465,0,0,1,1.391.427q1.116,1.113,2.231,2.229c.22.22.441.434.656.658a1.5,1.5,0,0,1,.074,2.056,5.156,5.156,0,0,1-3.019,1.849,5.655,5.655,0,0,1-2.118-.074,13.925,13.925,0,0,1-5.236-2.306,25.078,25.078,0,0,1-4.294-3.836,20.523,20.523,0,0,1-2.621-3.426,9.394,9.394,0,0,1-1.26-3.343c-.034-.219-.062-.438-.092-.658Z"
                  transform="translate(-387.014 -277.048)"
                  fill="#d43d3d"
                />
              </svg>
            </a>
          </li>
          <li className="w-full tc relative perfect-center " style={{ zIndex: 2 }}>
            <div id="share__btn" title="Chia sẻ ngay">
              <svg xmlns="http://www.w3.org/2000/svg" width={17} height={19} viewBox="0 0 17 19">
                <path
                  id="Union_1"
                  data-name="Union 1"
                  d="M10.552,15.629a3.515,3.515,0,0,1,.086-.771l-5.131-2.98a3.146,3.146,0,0,1-2.283.993A3.3,3.3,0,0,1,0,9.5,3.3,3.3,0,0,1,3.224,6.129a3.146,3.146,0,0,1,2.283.993l5.131-2.98a3.515,3.515,0,0,1-.086-.771A3.3,3.3,0,0,1,13.776,0,3.3,3.3,0,0,1,17,3.371a3.3,3.3,0,0,1-3.224,3.371,3.146,3.146,0,0,1-2.283-.993L6.362,8.729a3.5,3.5,0,0,1,0,1.542l5.131,2.98a3.146,3.146,0,0,1,2.283-.993,3.374,3.374,0,0,1,0,6.742A3.3,3.3,0,0,1,10.552,15.629Z"
                  fill="#4b4b4b"
                />
              </svg>
            </div>
          </li>
          <li className="w-full tc relative perfect-center ">
            <a className="dung-thu perfect-center" href="/" title="">
              <span className="pd5 w-full gray-51 ar-new">
                {/* <Icon type="user-add" style={{ fontSize: '20px' }} /> */}
                Dùng thử
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default QuickMenu;
