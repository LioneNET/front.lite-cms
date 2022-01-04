import { DownOutlined } from '@ant-design/icons';
import { Layout, notification, Space, Menu, Dropdown, Modal, Table, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFileManager from './useFileManager';
import { bytesToSize } from '../../../utils';
import FMBreadcrumbs from './FMBreadcrumbs';
import Uploader from './Uploader';
import MWPlace from '../../../utils/WMPlace';
import DirForm from './DirForm';

const FileManager = () => {

  //включить выбор файлов и директорий
  const [selectable, setSelectable] = useState(false)
  //выбраные файлы
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  //модальное окно
  const [modalContent, setModalContent] = useState(false)
  //пути директорий
  const [breadCrumbs, setBreadCrumbs] = useState([])
  //состояние файлов и директорий
  const [fileData, setFileData] = useState([])
  const [state, setState] = useState({
    pagination: {
      current: 1,
      pageSize: 15,
    },
  })

  const fileItems = useSelector(state => state.files.fileItems)
  const isLoading = useSelector(state => state.files.isLoading)
  const error = useSelector(state => state.files.error)
  
  const { getFiles, deleteFile } = useFileManager()

  useEffect(() => {
    getFiles()
  }, [])

  //отслеживаем ошибки
  useEffect(() => {
    if (error?.error) {
      notification['error']({
        message: 'Ошибка',
        description: error.message,
      })
    }
  }, [error])

  //отслеживаем fileItems
  useEffect(() => {
    const { items, total } = fileItems
    setFileData(items)
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        total,
      },
    })
  }, [isLoading])

  //подтвердить удаление
  const deleteHandler = () => {
    let temp = []
    for (let i in selectedRowKeys) {
      let item = fileData.filter(item => item.id === selectedRowKeys[i])[0]
      temp.push({
        id: item.item.name,
        type: item.item.item_type
      })
    }
    deleteFile({
      items: temp,
      current_path: getPath()
    })
    setSelectedRowKeys([])
  }

  //клик по пунктам меню
  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'uploadForm':
        setSelectable(false)
        setModalContent(<Uploader
          path={getPath()}
          setModalContent={setModalContent} />)
        break;
      case 'choose':
        setSelectable(!selectable)
        setSelectedRowKeys([])
        break;
      case 'delete':
        Modal.confirm({
          title: 'Удалить файлы',
          okText: 'Удалить',
          cancelText: 'Отмена',
          content: `Удалить выбраные: ${selectedRowKeys.length}?`,
          onOk: deleteHandler
        })
        break;
      case 'dirCreate':
        console.log('dirCreate')
        setModalContent(<DirForm
          onDirectory={onDirectory}
          path={getPath()}
          setModalContent={setModalContent} />)
        break;
      case 'rename':
        let item = fileData.filter(item => item.id === selectedRowKeys[0])[0];
        console.log(item)
        setModalContent(<DirForm
          onDirectory={onDirectory}
          item={item.item}
          path={getPath()}
          setModalContent={setModalContent} />)
        break;
      default:
        break;
    }
  }

  //после создания или изменения директории
  const onDirectory = () => {
    console.log('directory rename')
    setSelectedRowKeys([])
  }

  //перейти в директорию
  const switchDirectory = (item) => {
    let path = item.name
    if (breadCrumbs.length > 0) {
      path = getPath().concat('/', path)
    }
    setBreadCrumbs([...breadCrumbs, { name: item.name, path }])
    setSelectedRowKeys([])
    getFiles({ path: path })
  }


  //клик по хлебным крошкам
  const setCrumbs = dirPath => {
    let tempArr = []
    let path = ''

    if (isLoading) {
      message.warn('Идет загрузка')
      return;
    }

    for (let i in breadCrumbs) {
      tempArr.push({
        name: breadCrumbs[i].name,
        path: breadCrumbs[i].path
      })
      if (breadCrumbs[i].path === dirPath) {
        path = dirPath
        break;
      }
    }
    if (dirPath === null) {
      setBreadCrumbs([])
    } else {
      setBreadCrumbs(tempArr)
    }
    setSelectedRowKeys([])
    getFiles({ path })
  }

  //заголовки таблицы
  const columns = [
    {
      title: 'Название',
      dataIndex: 'item',
      render: item => {
        if (item.item_type === 'folder') {
          return <Button type='link'
            style={{ padding: 0 }}
            onClick={() => switchDirectory(item)}>{item.name}
          </Button>
        } else {
          return item.name
        }
      }
    },
    {
      title: 'Превью',
      dataIndex: 'prev',
      width: '20%'
    },
    {
      title: 'Размер',
      dataIndex: 'size',
      width: '20%',
      render: item => bytesToSize(item)
    },
    {
      title: 'Расширение',
      dataIndex: 'type',
      width: '30%',
    },
  ]

  //манипуляции с таблицей
  const handleTableChange = (pagination, filters, sorter) => {
    setState({
      ...state,
      pagination,
      sortField: sorter.field,
      sortOrder: sorter.order
    })
  }

  //добаить в список
  const onSelectChange = (selectedKeys) => {
    console.log('selectedKeys', selectedKeys)
    setSelectedRowKeys(selectedKeys)
  }

  //текущий путь
  const getPath = () => {
    return breadCrumbs[breadCrumbs.length - 1]?.path ?? ''
  }

  //правила
  const dirRenameRul = () => {
    if (selectedRowKeys.length === 1) {
      let file = fileData.filter(item => item.id === selectedRowKeys[0])
      console.log('file', file)
      if (file && file[0].item.item_type === 'folder') {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  const menuFile = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="uploadForm" disabled={selectedRowKeys.length > 0}>Загрузить</Menu.Item>
      <Menu.Item key="delete" disabled={selectedRowKeys.length === 0}>Удалить</Menu.Item>
      <Menu.Item key="rename" disabled={dirRenameRul()}>Переименовать</Menu.Item>
      <Menu.Item key="dirCreate" disabled={selectedRowKeys.length > 0}>Добавить директорию</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="choose">Выбрать</Menu.Item>
    </Menu>
  )

  return (
    <Layout className='main-place'>

      <Space className='my-space'>
        <Dropdown overlay={menuFile}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Файл
            <DownOutlined />
          </a>
        </Dropdown>
      </Space>
      <MWPlace content={modalContent} />
      <Space className='my-space'>
        <FMBreadcrumbs dirs={breadCrumbs} setCrumbs={setCrumbs} />
      </Space>

      <Table
        rowSelection={selectable ? {
          selectedRowKeys,
          type: 'checkbox',
          onChange: onSelectChange
        } : false}
        columns={columns}
        rowKey={record => record.id}
        dataSource={fileData}
        pagination={state.pagination}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ y: 580 }}
      />
    </Layout>
  )
}

export default FileManager