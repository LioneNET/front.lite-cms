import { Input, Modal } from 'antd';
import useFileManager from './useFileManager';
import { useState } from 'react';


const DirForm = ({ item = null, path, setModalContent, onDirectory = () => { } }) => {
  const [dirName, setDirName] = useState(item?.name ?? '')
  const { createDirectory, renameDirectory } = useFileManager()
  const apply = () => {
    if (item === null) {
      console.log('set name')
      createDirectory({
        path,
        name: dirName
      })
    } else {
      console.log('rename')
      renameDirectory({
        old_name: item.name,
        name: dirName,
        path
      })
    }
    onDirectory()
    setModalContent(false)
  }

  return (
    <Modal
      visible={true}
      title='Создайте директорию'
      okText='Создать'
      cancelText='Отмена'
      onOk={apply}
      onCancel={() => setModalContent(false)}
    >
      <Input
        placeholder='Имя директории'
        defaultValue={item && item.name}
        onChange={e => setDirName(e.target.value)} />
    </Modal>
  )
}

export default DirForm