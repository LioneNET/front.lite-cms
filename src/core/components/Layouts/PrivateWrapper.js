import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import mainNavigate from '../Navigate/main_navigate';

const { Header, Sider, Content } = Layout

const Wrapper = () => {

  const locParams = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const CollapsedIcon = () => {
    return (
      <div className='header-place'>
        <div className='collapsed-trigger' onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
    )
  }
  return (
    <Layout className='main-wrapper'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[locParams.pathname.substring(1)]}>
          {
            mainNavigate.map(item => {
              return (
                <Menu.Item
                  key={item.path}
                  icon={item.icon}>
                  <Link to={item.path}>
                    {item.title}
                  </Link>
                </Menu.Item>)
            })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <CollapsedIcon />
        </Header>
        <Content className='admin-content'>
          {locParams.pathname === '/' ? <Navigate to='/file' /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Wrapper