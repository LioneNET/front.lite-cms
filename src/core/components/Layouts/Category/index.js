import { Switch, Tree, Layout, Row, Col, Button, Space, Empty, Typography } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoryTitle from './CategoryTitle';
import CategoryAddFormModal from './CategoryAddFormModal';
import useCategory from './useCategory';
import MWPlace from './../../../utils/WMPlace';

const Categorys = () => {

  const { getCategorys } = useCategory()
  const [isEdit, setIsEdit] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const isLoading = useSelector(state => state.category.isLoading)
  const categoryes = useSelector(state => state.category.categoryItems)

  const { Text } = Typography

  useEffect(() => {
    getCategorys()
  }, [])

  return (
    <Layout className='main-place'>
      <Row>
        <Col span={24}>
          <Space className='my-space'>
            <Text strong>Изменить</Text>
            <Switch
              onChange={val => setIsEdit(val)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />} />
            <Button
              hidden={!isEdit}
              type='link'
              onClick={() => setModalContent(<CategoryAddFormModal
                mode='create'
                setModalContent={setModalContent}
                title='Создать' />)}
            >Добавить</Button>
          </Space>
          {/*модальные окна для меню*/}
          <MWPlace content={modalContent} />
          <Tree
            disabled={isLoading}
            blockNode
            treeData={categoryes}
            titleRender={item => <CategoryTitle
              item={item}
              isEdit={isEdit}
              setModalContent={setModalContent}
            />}
          />
          {!categoryes.length ? <Empty /> : false}
        </Col>
      </Row>
    </Layout>
  )
}

export default Categorys