/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useContext, useEffect, useState } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Icon from '../../components/icon/Icon';

import Page from '../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import ThemeContext from '@context/themeContext';
import { useGetListUser } from '@hooks/useGetListUser';
import { useToasts } from 'react-toast-notifications';
import ModalConfirm from '../overview/ModalCofirmOTP';
import AuthContext from '@context/authContext';
import EditAccountModal from './EditAccountModal';
import Avatar from '@components/Avatar';

const STATUS_LOGIN: { [key: string]: any } = {
	LoginSuccess: {
		label: 'Đăng nhập thành công',
		color: '#01AD43',
	},
	LoginFailed: {
		label: 'Đăng nhập thất bại',
		color: '#F2994A',
	},
	Active: {
		label: 'Đăng nhập thành công',
		color: '#01AD43',
	},
	NotActive: {
		label: 'Chưa kích hoạt tài khoản',
		color: '#ccc',
	},
	Logout: {
		label: 'Đăng xuất thành công',
		color: '#01AD43',
	},
};
const Index: NextPage = () => {
	const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
	const [accountId, setAccountId] = useState(-1);
	const { mobileDesign } = useContext(ThemeContext);
	const {
		userName,
		email,
		totalEquity,
		cashAvailable,
		totalMarketValue,
		accountName,
		accountNum,
		limitNumberStocks,
		limitTotalMarketValue,
	} = useContext(AuthContext);
	const profile = {
		userName,
		email,
		totalEquity,
		cashAvailable,
		totalMarketValue,
		accountName,
		accountNum,
		limitNumberStocks,
		limitTotalMarketValue,
		src: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
		color: 'danger',
	};
	console.log('check profile: ', profile);

	return (
		<PageWrapper className='page-account'>
			<Head>
				<title>Tài khoản</title>
			</Head>

			<Page>
				<Card stretch style={{ overflow: 'hidden' }}>
					<CardHeader>
						<CardLabel icon='AccountBox' iconColor='secondary'>
							<CardTitle>Tài khoản </CardTitle>
						</CardLabel>
					</CardHeader>
				</Card>
			</Page>
			<Card stretch style={{ width: !mobileDesign ? 'max-content' : '' }}>
				<CardBody className='d-flex align-items-center flex-column flex-lg-row gap-4'>
					{profile.src && (
						<div className='flex-shrink-0 '>
							<Avatar
								src={profile.src}
								className='rounded-circle'
								shadow='sm'
								size={110}
							/>
						</div>
					)}
					<div className='flex-grow-1'>
						<div className='fs-5 fw-bold mb-3 ' style={{ textAlign: 'center' }}>
							{profile?.userName}
						</div>
						{profile?.accountName && (
							<div className='text-secondary'>
								<Icon icon='AccountCircle' className='btn-icon' /> Tài khoản VPS:
								<span className='font-bold text-primary ps-3'>
									{profile?.accountName}
								</span>
							</div>
						)}
						{profile?.accountNum && (
							<div className='text-secondary'>
								<Icon icon='CreditCard' className='btn-icon' /> Loại tài khoản VPS:
								<span className='font-bold text-primary ps-3'>
									{profile?.accountNum}
								</span>
							</div>
						)}
						{profile.totalEquity && (
							<div className='text-secondary'>
								<Icon icon='MonetizationOn' className='btn-icon' />
								<span className='font-medium'>Tài sản ròng:</span>
								<span className='ml-2 text-success'>
									<strong>
										{Number(profile?.totalEquity).toLocaleString('vi-VN') + ' '}
									</strong>
									VND
								</span>
							</div>
						)}
						{profile.cashAvailable && (
							<div className='text-secondary'>
								<Icon icon='MonetizationOn' className='btn-icon' />
								<span className='font-medium'>Sức mua tối thiểu:</span>
								<span className='ml-2 text-success'>
									<strong>
										{Number(profile?.cashAvailable).toLocaleString('vi-VN') +
											' '}
									</strong>
									VND
								</span>
							</div>
						)}
						{profile.totalMarketValue && (
							<div className='text-secondary'>
								<Icon icon='MonetizationOn' className='btn-icon' />
								<span className='font-medium'>Giá trị cổ phiếu:</span>
								<span className='ml-2 text-success'>
									<strong>
										{Number(profile?.totalMarketValue).toLocaleString('vi-VN') +
											' '}
									</strong>
									VND
								</span>
							</div>
						)}
						{profile?.limitNumberStocks && (
							<div className='text-secondary'>
								<Icon icon='ShoppingCart' className='btn-icon' /> Giới hạn số cổ
								phiếu tối đa:
								<span className='font-bold text-danger ps-3'>
									<strong> {profile?.limitNumberStocks}</strong>
								</span>
							</div>
						)}
						{profile?.limitTotalMarketValue && (
							<div className='text-secondary'>
								<Icon icon='MonetizationOn' className='btn-icon' /> Giới hạn tổng giá trị mua tối đa:
								<span className='font-bold text-danger ps-3'>
									<strong>
										{Number(profile?.limitTotalMarketValue).toLocaleString('vi-VN') + ' '}
									</strong>
									VND
								</span>
							</div>
						)}
					</div>
				</CardBody>
			</Card>
			{/* <AddAccountModal setIsOpen={setToggleAddModal} isOpen={toggleAddModal} /> */}
			<EditAccountModal
				setIsOpen={setToggleEditModal}
				isOpen={toggleEditModal}
				accountId={accountId}
			/>
		</PageWrapper>
	);
};
export default Index;
