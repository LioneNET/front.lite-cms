import { Button, Typography } from "antd";
import { React } from "react";
import CategoryAddFormModal from "./CategoryAddFormModal";

/*
    Модифицирует каждый заголовок меню.
    Вызывается при рендере заголовка в дереве
*/

const CategoryTitle = ({ isEdit, item, setModalContent }) => {

  const { Text } = Typography

  if (isEdit) {
    return <>
      <Text strong>{item.title}</Text>
      <Button type='link' onClick={() => setModalContent(
        <CategoryAddFormModal
          mode='update'
          setModalContent={setModalContent}
          title='Изменить'
          categoryItem={item} />
      )}>
        Редактировать
      </Button>
      <Button type='link' onClick={() => setModalContent(
        <CategoryAddFormModal
          mode='add'
          categoryItem={{ ...item, title: '', alias: '', image: '' }}
          setModalContent={setModalContent}
          title='Создать' />)
      }>
        Добавить
      </Button>
    </>
  } else {
    return <>
      {item.title}
    </>
  }
}

export default CategoryTitle