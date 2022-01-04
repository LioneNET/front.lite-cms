import { Alert, Button, message, Modal, Progress } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import serverConfig from '../../../useOnServer/serverConfig';
import { getStrDate, makeID } from '../../../utils';
import useFileManager from './useFileManager';

const Uploader = ({ path, setModalContent }) => {

  const accessToken = useSelector(state => state.auth.userData?.token)
  const [files, setFiles] = useState([])
  const [isProcess, setIsProcess] = useState(false)
  const { getFiles } = useFileManager()
  const fileRef = useRef(null)

  //отслеживаем загрузку всех файлов
  useEffect(() => {
    let count = 0
    for (let i in files) {
      if (files[i].progress === 100) {
        count++
        if (count === files.length) {
          getFiles({ path })
          .then(()=>{
            setModalContent(false)
          })
        }
      }
    }
  }, [files])

  const uploading_process = item => {

    let file = fileRef.current.files[item.index]
    let num = 1
    let loaded = 0
    let chunk_size = (1024 * 1024 * 5)
    let total = file.size;
    let max_chunk_size = chunk_size > total ? total : chunk_size
    let reader = new FileReader()
    let blob = file.slice(loaded, max_chunk_size)
    let num_chunks = Math.ceil(total / max_chunk_size)
    let random_name = getStrDate() + "_" + makeID(5)

    if (total > 1024 * 1024 * 1024) {
      message.error(`Размер файла "${item.name}" превышает 1гб`);
      setIsProcess(false)
      return
    }

    reader.readAsArrayBuffer(blob)
    reader.onload = e => {
      let fd = new FormData()
      fd.append('file', new File([reader.result], random_name + "_." + file.name.substr(file.name.lastIndexOf('.') + 1)))
      fd.append('loaded', loaded)
      fd.append('num', num)
      fd.append('num_chunks', num_chunks)
      fd.append('file_size', total)
      fd.append('path', path)
      const myUploadProgress = () => (progress) => {
        let percentage = Math.floor((progress.loaded * 100) / progress.total)
        let temp = [...files]
        for (let i in temp) {
          if (temp[i].uid === item.uid) {
            temp[i].subProgress = percentage
            break;
          }
        }
        setFiles(temp)
      }

      const config = {
        onUploadProgress: myUploadProgress(),
        maxContentLength: 1024 * 1024 * 5,
        maxBodyLength: 1024 * 1024 * 5,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      }

      axios.post(`${serverConfig.baseUrl}/file/upload`, fd, config)
        .then(response => {
          let progress = Math.ceil((num / num_chunks) * 100)
          num++
          loaded += max_chunk_size
          console.log('file upload progress: ', progress)
          if (loaded < total) {
            blob = file.slice(loaded, loaded + max_chunk_size)
            reader.readAsArrayBuffer(blob)
          } else {
            loaded = total
          }

          let temp = [...files]
          for (let i in temp) {
            if (temp[i].uid === item.uid) {
              temp[i].progress = progress
              break;
            }
          }
          setFiles(temp)
        }).catch(error => {
          console.log(error)
        })
    }

  }

  //выбрать файлы
  const chooseFiles = () => {
    fileRef.current.file = []
    fileRef.current.type = ''
    fileRef.current.type = 'file'
    fileRef.current.multiple = true
    fileRef.current.click()
  }

  //изменить список файлов
  const fileChooesHandler = (e) => {
    let items = Array.from(e.target.files)
    let temp = []
    if (items.length > 5) {
      message.warning('Максимально можно загрузить до 5 файлов!')
      items = items.slice(0, 5)
    }
    for (let i in items) {
      temp.push({
        index: i,
        name: items[i].name,
        size: items[i].size,
        uid: makeID(),
        progress: 0,
        subProgress: 0,
      })
    }
    setFiles(temp)
  }

  //удалить из загружаемых файлов
  const removeFromList = item => {
    if (isProcess) {
      message.info('Нельзя отменить')
      return;
    }
    setFiles([...files.filter(i => i.uid !== item.uid)])
  }

  //закрытие формы загрузки
  const onCloseModal = () => {
    if (!isProcess) {
      setModalContent(false)
    } else {
      message.warning("Дождитесь окончания загрузки!")
    }
  }

  //начать загрузку
  const onStartLoad = () => {
    if (isProcess) {
      message.info('Процес уже запущен!')
      return;
    }
    setIsProcess(true)
    //для каждого файла
    files.forEach(item => {
      uploading_process(item)
    })
  }

  return (
    <Modal
      title='Загрузка файлов'
      onCancel={onCloseModal}
      onOk={onStartLoad}
      cancelText='Отмена'
      okText='Загрузить'
      okButtonProps={{
        disabled: !files.length
      }}
      cancelButtonProps={{
        disabled: isProcess
      }}
      visible={true}>
      {files.map((item) => {
        return <Alert
          className='upload-list-form'
          key={item.uid}
          message={<>
            <p style={{ margin: 0 }}>{item.name}</p>
            <Progress percent={item.progress} />
            <Progress percent={item.subProgress} size="small" status="active" />
          </>}
          type="success"
          closable={!isProcess}
          afterClose={() => removeFromList(item)} />
      })}

      <input
        onChange={fileChooesHandler}
        type='file'
        ref={fileRef}
        style={{ display: 'none' }} />

      <Button
        disabled={isProcess}
        onClick={chooseFiles}>Выбрать</Button>
    </Modal>
  )
}


export default Uploader