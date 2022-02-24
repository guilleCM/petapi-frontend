import { bool } from 'prop-types';
import Head from 'next/head';
import Link from 'next/link'
import {
  Result, Button,
} from 'antd';
import useTranslation from 'next-translate/useTranslation';

import PageLayout from '../components/layout';
import { API_ENDPOINT } from '../constants';

import styles from './index.module.css';


export default function Unsubscribe({ success }) {
  const { t } = useTranslation();
  return (
    <PageLayout withFooter={false}>
      <Head>
        <title>{t('home:metaTitle')}</title>
      </Head>
      <Result
        className={styles.unsubDiv}
        status={success ? "success" : "error"}
        title={success ? t('common:unsubscribeSuccess') : t('common:apiError')}
        extra={[
          <Button type="primary" key="console">
            <Link href="/">
              {t('common:goHome')}
            </Link>
          </Button>,
        ]}
      />
    </PageLayout>
  );
}

Unsubscribe.propTypes = {
  success: bool,
};
Unsubscribe.defaultProps = {
  success: false,
};

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const data = {
      active: false,
    }
    const res = await fetch(`${API_ENDPOINT}/api/subscribers/${query.email}?uuid=${query.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(res);
    const sourceData = await res.json();
    console.log(sourceData);
    return {
      props: {
        success: true,
      },
    };
  }
  catch (error) {
    return {
      props: {
        success: false,
      },
    };
  }
}
