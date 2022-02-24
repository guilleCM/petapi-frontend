import { useState } from 'react';
import {
  Form, Input, Button, Alert,
} from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { API_ENDPOINT } from '../../constants';

import styles from './style.module.css';

const SubscriberForm = () => {
  const { t } = useTranslation();
  const [ form ] = Form.useForm();
  const [ isSubscribing, setSubscribing ] = useState(false);
  const [ isSubscribed, setSubscribed ] = useState(false);
  const onSubmit = (values) => {
    // console.log(values)
    // const res = await fetch('http://127.0.0.1:5000/api/dogs')
    // const sourceData = await res.json()
    setSubscribing(true);
    const url = `${API_ENDPOINT}/api/${values.email}`;
    // const data = values;
    fetch(url, {
      method: 'PUT', // or 'PUT'
      // mode: 'no-cors',
      body: JSON.stringify(values), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .catch((error) => {
        console.error('Error:', error);
        setSubscribing(false);
      })
      .then((response) => {
        console.log('Success:', response);
        setSubscribing(false);
        setSubscribed(true);
      });
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        size="large"
        onFinish={onSubmit}
      >
        <Form.Item label="Email:" className={styles.emailLabel} name="email">
          <Input placeholder="" type="email" required />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={isSubscribing}
          >
            {t('common:subscribe')}
          </Button>
        </Form.Item>
      </Form>
      {isSubscribed && (
        <Alert
          message={t('common:subscribeSuccess')}
          type="success"
          showIcon
          closable
          afterClose={() => setSubscribed(false)}
        />
      )}
    </>
  );
};

export default SubscriberForm;
