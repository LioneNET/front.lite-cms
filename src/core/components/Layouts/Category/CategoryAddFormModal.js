import { Button, Modal, Input, Select, Popover, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCategory from './useCategory';

const CategoryAddFormModal = ({ mode = 'create', categoryItem = null, title = '', setModalContent }) => {

  //редактируемые поля меню
  const [categoryEditFields, setCategoryEditFields] = useState({
    id: categoryItem?.key ?? null,
    name: categoryItem?.title ?? '',
    alias: categoryItem?.alias ?? '',
    image: categoryItem?.image ?? null,
    moveNodeToID: false
  })
  //пункты меню для выбора перемещения
  const [treeSelectCategories, setTreeSelectCategories] = useState([])

  //все пункты меню
  const categoryItems = useSelector(state => state.category.categoryItems)

  //чек загрузки меню
  const isLoading = useSelector(state => state.category.isLoading)

  //Вызываем экшны
  const { getCategorys, addCategory, deleteCategory } = useCategory()

  useEffect(() => {
    getCategorys()
  }, [])

  //подтвердить удаление    
  const DeletionConfirm = () => {
    deleteCategory({ id: categoryItem.key, mode: 'delete' })
    setModalContent(false)
  }

  //подтвердить изменения
  const EditingConfirm = () => {
    /*Логика сохранения изменения*/
    switch (mode) {
      case 'create':
        addCategory({ ...categoryEditFields, mode })
        break;
      case 'add':
        addCategory({ ...categoryEditFields, mode, id_parent: categoryItem.key })
        break;
      case 'update':
        addCategory({ ...categoryEditFields, mode })
        break;
      default:
        break;
    }
    setModalContent(false)
  }

  //отобразить в селекторе дерево меню
  const selectTreeRender = () => {
    const loop = (data) => {
      const treeData = []
      for (let i in data) {
        if (data[i].key === categoryItem.key) {
          continue;
        }
        treeData.push({
          title: data[i].title,
          value: data[i].key,
          children: loop(data[i].children)
        })
      }
      return treeData
    }
    if (!treeSelectCategories.length) {
      console.log('Сгенерировать дерево')
      setTreeSelectCategories(loop(categoryItems))
    }
  }

  //селектор перемещения меню
  const showMoveSelect = () => {
    if (mode === 'create' || mode === 'add') {
      return false
    }
    return (
      <TreeSelect
        className='mBottomDefault'
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeSelectCategories}
        placeholder="Выберите куда переместить"
        treeDefaultExpandAll
        onChange={id => {
          setCategoryEditFields({ ...categoryEditFields, moveNodeToID: id })
        }}
        onDropdownVisibleChange={selectTreeRender}
      />
    )
  }

  return (
    <Modal title={title}
      visible={true}
      confirmLoading={isLoading}
      onOk={EditingConfirm}
      onCancel={() => setModalContent(false)}>

      {showMoveSelect()}

      <Input defaultValue={categoryEditFields.name} placeholder='Название' className='mBottomDefault'
        onChange={val => setCategoryEditFields({ ...categoryEditFields, name: val.target.value })} />

      <Input defaultValue={categoryEditFields.alias} placeholder='Алиас' className='mBottomDefault'
        onChange={val => setCategoryEditFields({ ...categoryEditFields, alias: val.target.value })} />

      <Input defaultValue={categoryEditFields.image} placeholder='Ссылка на картинку' className='mBottomDefault'
        onChange={val => setCategoryEditFields({ ...categoryEditFields, image: val.target.value })} />

      <Popover
        content={<a onClick={DeletionConfirm}>Да</a>}
        title="Удалить?"
        trigger="click"
      >
        {
          mode === 'update' ? <Button className='mBottomDefault' type="primary" danger>Удалить</Button> : ''
        }
      </Popover>
    </Modal>
  )
}

export default CategoryAddFormModal