import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Layout, Row, Col, Menu,
} from 'antd';
import useTranslation from 'next-translate/useTranslation';

import 'antd/dist/antd.css';

import { HeartTwoTone } from '@ant-design/icons';

import styles from './style.module.css';

const { Header, Footer, Content } = Layout;

// eslint-disable-next-line react/prop-types
export default function PageLayout({ children }) {
  const { t } = useTranslation();
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    // eslint-disable-next-line no-undef
    OneSignal.push(() => {
      // eslint-disable-next-line no-undef
      OneSignal.init({
        appId: '578ce770-f935-45d6-b15d-46bd279908ff',
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
    // return () => {
    //   window.OneSignal = undefined;
    // };
  }, []);
  return (
    <Layout>
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        />
      </Head>
      <Header className={styles.appHeader}>
        <Link href="/">
          <img className={styles.logoHeader} src="/adoptallorca-inverse.png" alt="adoptallorca logo" />
        </Link>
        <Link href="/">
          <div className={styles.sloganHeader}>
            <img className={styles.sloganImg} src="/slogan-logo.png" alt="adoptallorca logo" />
          </div>
        </Link>
        <Menu className={styles.headMenu} theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link href="/perros" className={styles.hadMenuLi}>
              {t('common:dogList')}
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footerCol}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={{ span: 18, offset: 3 }}>
            <span className={styles.footerDescription}>
              {t('common:madeWith')}
              {' '}
              <HeartTwoTone twoToneColor="#eb2f96" />
              {' '}
              {t('common:by')}
              {' '}
              <a href="https://github.com/guilleCM">Guillermo Cirer</a>
            </span>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
