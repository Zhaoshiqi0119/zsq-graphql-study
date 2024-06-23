import React from 'react'
import { NavLink, Outlet, useRoutes } from 'react-router-dom'
import "./index.css"
import router from './router/router'
import {  Row, Col } from 'antd';
import { Suspense } from 'react';
import {RecoilRoot} from 'recoil';

export default function App() {
	const element = useRoutes(router)
	return (
		<div>
			<RecoilRoot>
				<Suspense fallback={<div>Loading...</div>}>
					{element}
				</Suspense>
			</RecoilRoot>
		</div>
	)
}
