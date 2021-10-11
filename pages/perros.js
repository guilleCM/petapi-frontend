import React, { useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import { arrayOf, object } from 'prop-types';
import {
  Badge, Card, Col, Row, List, Typography,
  Descriptions, Form, Button, Select, Modal,
} from 'antd';
import {
  DownOutlined, UpOutlined, PhoneFilled,
  MailFilled, EnvironmentFilled,
} from '@ant-design/icons';

import PageLayout from '../components/layout';
import { API_ENDPOINT } from '../constants';

import styles from './perros.module.css';

const { Text } = Typography;

const { Option } = Select;

const sex = {
  0: 'Desconocido',
  1: 'Macho',
  2: 'Hembra',
};
const size = {
  0: 'Desconocido',
  1: 'Pequeño',
  2: 'Mediano',
  3: 'Grande',
};
const coat = {
  0: 'Desconocido',
  1: 'Corto',
  2: 'Largo',
};
const age = {
  0: 'Todos',
  1: 'Adulto',
  2: 'Cachorro',
};
const sexType = {
  0: 'Todos',
  1: 'Macho',
  2: 'Hembra',
};

function handleChange(value) {
  console.log(`selected ${value}`);
}

const filterFormInitialValues = {
  race: '0',
  size: '0',
  age: '0',
  sex: '0',
  coat_type: '0',
};

function infoCEPAD() {
  Modal.info({
    title: 'Adoptar en CEPAD',
    content: (
      <div>
        <p>
          <PhoneFilled />
          {' '}
          871 71 97 72
        </p>
        <p>
          <MailFilled />
          {' '}
          veterinari@cepad.es
        </p>
        <p>
          <EnvironmentFilled />
          {' '}
          Carretera Palma a Sineu, km 15.700 Camí de Son Sancho s/n 07142 Santa Eugenia
        </p>
        <p>Para reservar o ir a conocer al animal se puede poner en contacto con el CEPAD (Centro de Protección de Animales Domésticos), en el teléfono 871 71 97 72, y consultar una cita.</p>
      </div>
    ),
    onOk() {},
  });
}

function infoSonReus() {
  Modal.info({
    title: 'Adoptar en Son Reus',
    content: (
      <div>
        <p>
          <PhoneFilled />
          {' '}
          971 43 86 95
        </p>
        <p>
          <MailFilled />
          {' '}
          centreproteccioanimal@palma.cat
        </p>
        <p>
          <EnvironmentFilled />
          {' '}
          Camino  de Son Reus, s/n 07120 Palma (Illes Balears)
        </p>
        <p>Para reservar o ir a conocer al animal se puede poner en contacto con el CSMPA (Centro Sanitario Municipal de Protección Animal) de Son Reus, en el teléfono 971 43 86 95, y consultar una cita.</p>
      </div>
    ),
    onOk() {},
  });
}

function Perros({ sourceData }) {
  const unique_races_mother = [ ...new Set(sourceData.map((item) => item.race_mother)) ];
  const unique_races_parent = [ ...new Set(sourceData.map((item) => item.race_parent)) ];
  const unique_races = [ ...new Set([ ...unique_races_mother, ...unique_races_parent ]) ];
  const [ filteredData, setFilteredData ] = useState(undefined);
  const [ expand, setExpand ] = useState(true);
  const [ form ] = Form.useForm();
  const onApplyFilter = (values) => {
    let newFilteredData = JSON.parse(JSON.stringify(sourceData));
    // eslint-disable-next-line no-restricted-syntax
    for (const filterProp of Object.keys(values)) {
      if (values[filterProp] !== '0') {
        switch (filterProp) {
          case 'race':
            newFilteredData = sourceData.filter((dog) => dog.race_mother.indexOf(values[filterProp]) >= 0 || dog.race_parent.indexOf(values[filterProp]) >= 0);
            break;
          case 'age':
            // eslint-disable-next-line no-case-declarations
            const isPuppy = values[filterProp] === '2';
            newFilteredData = sourceData.filter((dog) => dog.is_puppy === isPuppy);
            break;
          default:
            newFilteredData = sourceData.filter((dog) => dog[filterProp] === Number(values[filterProp]));
            break;
        }
      }
    }
    setFilteredData(newFilteredData);
    setExpand(true);
  };
  const onReset = () => {
    form.resetFields();
    setFilteredData(undefined);
  };
  const formCols = {
    xs: 24,
    sm: 24,
    md: 8,
  };
  return (
    <PageLayout>
      <Head>
        <title>Perros en adopción</title>
      </Head>
      <div className="site-card-wrapper">
        <Row style={{
          position: 'sticky', top: 0, zIndex: 20, background: '#f0f2f5', borderBottom: '1px solid #b4b4b4',
        }}
        >
          <Col span={24} style={{ padding: 20 }} className={expand ? styles.dogsFormHidden : styles.dogsFormShow}>
            <Text strong>Filtrar por:</Text>
            <Form
              layout="inline"
              form={form}
              name="filterDogsForm"
              initialValues={filterFormInitialValues}
              onFinish={onApplyFilter}
              className={styles.dogsForm}
            >
              <Form.Item label="Raza" name="race">
                <Select style={{ width: 200 }} onChange={handleChange}>
                  <Option key="Todas" value="0">Todas</Option>
                  {unique_races.map((val) => <Option key={val} value={val}>{val}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Tamaño" name="size">
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {Object.keys(size).map((val) => <Option key={val} value={val}>{val !== '0' ? size[val] : 'Todos'}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Edad" name="age">
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {Object.keys(age).map((val) => <Option key={val} value={val}>{age[val]}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Sexo" name="sex">
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {Object.keys(sexType).map((val) => <Option key={val} value={val}>{sexType[val]}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Pelaje" name="coat_type">
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {Object.keys(coat).map((val) => <Option key={val} value={val}>{val !== '0' ? coat[val] : 'Todos'}</Option>)}
                </Select>
              </Form.Item>

              <Col span={24}>
                <Button className={styles.dogsFormBtn} type="primary" htmlType="submit">Aplicar filtros</Button>
                <Button htmlType="button" onClick={onReset}>Borrar filtros</Button>
              </Col>
            </Form>
          </Col>
          <div className={styles.collapseFiltersContainer}>
            <Button
              type="link"
              className={styles.collapseFilters}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <DownOutlined /> : <UpOutlined />}
              {expand ? <span>Mostrar filtros</span> : <span>Ocultar filtros</span>}
            </Button>
          </div>
        </Row>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          style={{ padding: 20 }}
          header={<div>{filteredData ? `${filteredData.length} perros filtrados de ${sourceData.length} perros` : `${sourceData.length} perros encontrados`}</div>}
          dataSource={filteredData || sourceData}
          renderItem={(dog) => (
            <List.Item>
              <Badge.Ribbon
                className={styles.adoptRibbon}
                text={(
                  <Button onClick={dog.channel === 'CEPAD' ? infoCEPAD : infoSonReus} type="primary" value="small">
                    Adoptar
                  </Button>
                )}
              >
                <Card
                  key={dog.id}
                  cover={(
                    <>
                      <img
                        alt={dog.id}
                        src={`${API_ENDPOINT}/${dog.media[0]}`}
                        className={styles.dogCardCover}
                      />
                      <img
                        alt={`${dog.id} background`}
                        src={`${API_ENDPOINT}/${dog.media[0].replace('static/', 'static/thumb-')}`}
                        className={styles.dogCardCoverBg}
                      />
                    </>
                  )}
                  size="small"
                  className={styles.dogCardCoverContainer}
                >
                  <Descriptions
                    style={{ textTransform: 'capitalize' }}
                    bordered
                    size="small"
                    column={{
                      xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1,
                    }}
                  >
                    <Descriptions.Item label="Raza">
                      {dog.race_mother === dog.race_parent ?
                        dog.race_mother : (
                          <>
                            {dog.race_mother}
                            {' '}
                            /
                            <br />
                            {dog.race_parent}
                          </>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tamaño">{size[dog.size]}</Descriptions.Item>
                    <Descriptions.Item label="Edad">{dog.is_puppy ? 'Cachorro' : 'Adulto'}</Descriptions.Item>
                    <Descriptions.Item label="Sexo">{sex[dog.sex]}</Descriptions.Item>
                    <Descriptions.Item label="Pelaje">{coat[dog.coat_type]}</Descriptions.Item>
                    <Descriptions.Item label="Nombre">{dog.name !== '' ? dog.name : 'Por definir'}</Descriptions.Item>
                    <Descriptions.Item label="Entrada">{moment(dog.channel_creation_date).format('DD-MM-YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Lugar">{dog.channel}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
        />
      </div>
    </PageLayout>
  );
}

Perros.propTypes = {
  sourceData: arrayOf([ object ]),
};
Perros.defaultProps = {
  sourceData: [],
};

export async function getServerSideProps(context) {
  const res = await fetch(`${API_ENDPOINT}/api/dogs`);
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

export default Perros;
