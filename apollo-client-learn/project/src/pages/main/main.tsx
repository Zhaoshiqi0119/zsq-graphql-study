import React from 'react'
import { useNavigate, Outlet, Navigate, useLocation, Route } from 'react-router-dom'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil'
import { Row, Col, Avatar } from 'antd'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './main.less'
import { userStore } from '../../store/user.ts';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{ key: '/main/about', label: '嵌套路由案例' },
	{ key: '/main/home', label: '主页' },
	{ key: '/main/tableFilter', label: '表格过滤小案例' },
	{ key: '/main/useStateTest', label: 'useStateTest' },
	{ key: '/main/useEffectTest', label: 'useEffectTest' },
	{ key: '/main/counter', label: 'recoil实现计数器' },
	{ key: '/main/search', label: '搜索案例,hook实现' },
	{ key: '/main/fileDownload', label: '文件下载案例，通过文件流' },
];
export default function () {
	const navigate = useNavigate();
	const location = useLocation();

	// 动态计算 defaultSelectedKeys
	const defaultSelectedKeys = [location.pathname];
	const onClick: MenuProps['onClick'] = (e) => {
		navigate(e.key)
	};

	const {username} = useRecoilValue(userStore)

	return (
		<div>
			<div className='main'>
				<div className="header">
					<Row>
						<Col className='header-left' span={10}>React学习案例</Col>
						<Col className='header-right' span={14}>
							<Avatar className='avater-box' size={48}/>
							<span className='username-box'>{username}</span>
						</Col>
					</Row>
				</div>

				<div className="main-inner" >
					<Row justify="start" gutter={[40, 0]}>
						<Menu className='menu-list'
							onClick={onClick}
							defaultSelectedKeys={defaultSelectedKeys}
							defaultOpenKeys={['sub1']}
							mode="inline"
							items={items}
						/>
						<Col span={18}>
							<div className="main-right-box">
								{/*注册路由*/}
								<div style={{ padding: "0px 50px" }}>
									<Outlet></Outlet>
								</div>
							</div>
						</Col>
					</Row>

				</div>
			</div>
		</div>
	)
}
