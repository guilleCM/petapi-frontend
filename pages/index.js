import { array } from 'prop-types';
import Head from 'next/head';
import Link from 'next/link'
import {
  Col, Row, List, Avatar, Button, Typography,
} from 'antd';
import Fade from 'react-reveal/Fade';
import useTranslation from 'next-translate/useTranslation';

import PageLayout from '../components/layout';
import SubscriberForm from '../components/subscribers';

import styles from './index.module.css';

const { Title } = Typography;


export default function Home({ sourceData }) {
  const { t } = useTranslation();
  const listPoints = [
    {
      title: t('home:howWorksItem0Title'),
      content: t('home:howWorksItem0Content'),
      img: '/undraw_pet_adoption.svg',
    },
    {
      title: t('home:howWorksItem1Title'),
      content: t('home:howWorksItem1Content'),
      img: '/undraw_newsletter.svg',
    },
    {
      title: t('home:howWorksItem2Title'),
      content: t('home:howWorksItem2Content'),
      img: '/undraw_mobile_app.svg',
    },
    {
      title: t('home:howWorksItem3Title'),
      content: t('home:howWorksItem3Content'),
      img: '/undraw_online_organizer.svg',
    },
  ];
  return (
    <PageLayout>
      <Head>
        <title>{t('home:metaTitle')}</title>
      </Head>
      <div className="site-card-wrapper">
        <Row className={styles.welcomeRow}>
          <Col className={styles.welcomeCol} span={24}>
            <div className={styles.welcomeWrapper}>
              <h1 className={styles.welcomeTitle}>{t('home:welcome')}</h1>
              <h3 className={styles.welcomeDescription}>{t('home:description')}</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 18, offset: 3 }} className={styles.explainAppCol}>
            <p></p>
            <Title className={styles.explainApp}>{t('home:aboutTitle')}</Title>
            <p className={styles.explainAppDescription}>
              {t('home:aboutDescription')}
            </p>
          </Col>
        </Row>
        <Row className={styles.explainPointsRow}>
          <Col xs={24} sm={24} md={24} lg={{ span: 18, offset: 3 }} className={styles.explainPointsCol}>
            <Title className={styles.explainPointsTitle}>{t('home:howWorksTitle')}</Title>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={listPoints}
              renderItem={(item, index) => (
                <Fade right={index % 2 === 0} left={index % 2 === 1}>
                  <List.Item
                    className={styles.helpList}
                    key={item.title}
                  >
                    {index % 2 === 0 && (
                      <img
                        className={styles.listImg}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                    {index % 2 === 1 && (
                      <img
                        className={styles.listImgMobileShow}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                    <div className={styles.helpListTextWrapper}>
                      <Title level={4}>{item.title}</Title>
                      <p>{item.content}</p>
                    </div>
                    {index % 2 === 1 && (
                      <img
                        className={styles.listImgMobileHidden}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                  </List.Item>
                </Fade>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={{ span: 18, offset: 3 }} className={styles.lastEntriesCol}>
            <Title className={styles.explainPointsTitle}>{t('home:lastDogsTitle')}</Title>
            <Fade top>
              <Avatar.Group className={styles.lastEntriesGroup}>
                {sourceData.map((dog) => (
                  <Avatar
                    className={styles.avatarEntrie}
                    size={{
                      xs: 150, sm: 150, md: 150, lg: 170, xl: 180, xxl: 200,
                    }}
                    key={dog.id}
                    src={`http://127.0.0.1:5000/${dog.media[0]}`}
                  />
                ))}
              </Avatar.Group>
            </Fade>
          </Col>
          <Col xs={{ span: 18, offset: 3 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} lg={{ span: 6, offset: 9 }} className={styles.goToAllDogsCol}>
            <Link href="/perros">
              <Button block type="primary" size="large">{t('home:lastDogsButton')}</Button>
            </Link>
          </Col>
        </Row>
        <Row className={styles.subRow}>
          <Col span={24}>
            <Title className={styles.subTitle}>{t('home:subscribeTitle')}</Title>
            <p className={styles.subDescription}></p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 6, offset: 12 }}>
            <SubscriberForm />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

Home.propTypes = {
  sourceData: array,
};
Home.defaultProps = {
  sourceData: [],
};

export async function getServerSideProps(context) {
  const res = await fetch('http://127.0.0.1:5000/api/dogs?limit=5');
  const sourceData = await res.json();
  if (!sourceData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sourceData,
    },
  };
}
