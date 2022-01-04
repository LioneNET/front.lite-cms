import { Breadcrumb, Button } from "antd"
import { HomeOutlined } from '@ant-design/icons';

const FMBreadcrumbs = ({ dirs, setCrumbs }) => {

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <HomeOutlined />
        <Button type='link'
          style={{ padding: '0px 5px' }}
          onClick={() => setCrumbs(null)}>
          uploads
        </Button>
      </Breadcrumb.Item>
      {dirs.map(item => {
        return <Breadcrumb.Item key={item.path}>
          <Button type='link'
            style={{ padding: '0px 5px' }}
            onClick={() => setCrumbs(item.path)}>
            {item.name}
          </Button>
        </Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
}

export default FMBreadcrumbs