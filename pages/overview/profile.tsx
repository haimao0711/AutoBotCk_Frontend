import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Card, { CardBody } from '@components/bootstrap/Card';
import Avatar from '@components/Avatar';
import Icon from '@components/icon/Icon';
import ThemeContext from '@context/themeContext';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '@components/bootstrap/Dropdown';
import ConfigContext from '@context/configContext';
import AuthContext from '@context/authContext';
import Button from '@components/bootstrap/Button';
import EditProfileModal from '../account/EditProfileModal';
import ChangePassBotModal from '../account/ChangePassBotModal';
import Cookies from 'js-cookie';
import { API_BASE_URL, AuthCache } from '@constants/index';

const Profile = ({ totalStocksPurchased = 0 }: { totalStocksPurchased?: number }) => {
	const { mobileDesign } = useContext(ThemeContext);
	const config = useContext(ConfigContext);
	const router = useRouter();
	const [isEditProfile, setIsEditProfile] = useState(false);
	const [isChangePassBot, setIsChangePassBot] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const {
		userName,
		email,
		isLogin,
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

	const toggleDropdown = () => setDropdownOpen((prev) => !prev);
	const handleEditProfileModal = () => {
		setIsEditProfile(!isEditProfile);
	};
	const handleChangePassBotModal = () => {
		setIsChangePassBot(!isChangePassBot);
	};
	const authTokenCache = Cookies.get(AuthCache.AUTH_TOKEN_CACHE);
	// Cookies.get(AuthCache.AUTH_REFRESH_TOKEN_CACHE);
	// Cookies.get(AuthCache.AUTH_API_KEY);
	// console.log('check  profile  ', profile);
	return (
		<Card stretch style={{ width: !mobileDesign ? 'max-content' : '' }}>
			<CardBody className='d-flex align-items-center flex-column flex-lg-row gap-4'>
				<EditProfileModal isOpen={isEditProfile} setIsOpen={handleEditProfileModal} />
				<ChangePassBotModal isOpen={isChangePassBot} setIsOpen={handleChangePassBotModal} />
				{profile.src && (
					<div className='flex flex-col items-center justify-center'>
						<Avatar
							src={profile.src}
							className='rounded-circle'
							shadow='sm'
							size={110}
						/>
						{authTokenCache && (
							<Dropdown isOpen={dropdownOpen} direction='down'>
								<DropdownToggle>
									<div className='flex items-center justify-center text-blue-500 hover:text-blue-700 cursor-pointer'>
										<Icon
											icon='edit'
											size='md'
											color='primary'
											className='ms-3'
										/>
										<span className='ml-1 text-sm font-medium'>Chỉnh sửa</span>
									</div>
								</DropdownToggle>

								<DropdownMenu className='w-64'>
									<DropdownItem onClick={handleEditProfileModal}>
										Chỉnh sửa thông tin tài khoản VPS
									</DropdownItem>
									<DropdownItem onClick={handleChangePassBotModal}>
										Đổi mật khẩu bot
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						)}
					</div>
				)}

				{authTokenCache ? (
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
						<div className='text-secondary'>
							<Icon icon='MonetizationOn' className='btn-icon' />
							<span className='font-medium'>Tổng tài sản:</span>
							<span className='ml-2 text-success'>
								<strong>
									{Number(profile?.totalEquity).toLocaleString('vi-VN') + ' '}
								</strong>
								VND
							</span>
						</div>
						<div className='text-secondary'>
							<Icon icon='MonetizationOn' className='btn-icon' />
							<span className='font-medium'>Sức mua tối thiểu:</span>
							<span className='ml-2 text-success'>
								<strong>
									{Number(profile?.cashAvailable).toLocaleString('vi-VN') + ' '}
								</strong>
								VND
							</span>
						</div>
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
						<div className='text-secondary'>
							<Icon icon='ShoppingCart' className='btn-icon' /> Số cổ phiếu đã mua:
							<span className='font-bold text-success ps-3'>
								<strong> {totalStocksPurchased}</strong>
							</span>
						</div>
						{profile?.limitNumberStocks && (
							<div className='text-secondary'>
								<Icon icon='ShoppingCart' className='btn-icon' /> Giới hạn số cổ phiếu tối đa:
								<span className='font-bold text-danger ps-3'>
									<strong> {profile?.limitNumberStocks}</strong>
								</span>
							</div>
						)}
						{profile?.limitTotalMarketValue && (
							<div className='text-secondary'>
								<Icon icon='MonetizationOn' className='btn-icon' /> Giới hạn giá trị cổ phiếu tối đa:
								<span className='font-bold text-danger ps-3'>
									<strong>
										{Number(profile?.limitTotalMarketValue).toLocaleString('vi-VN') + ' '}
									</strong>
									VND
								</span>
							</div>
						)}
					</div>
				) : (
					<Card
						className='text-center 
						shadow-sm border-0'
						style={{ maxWidth: '400px', margin: '0 auto' }}>
						<CardBody>
							<p className='text-muted fs-5 mb-3'>Bạn chưa đăng nhập?</p>
							<Button
								style={{
									backgroundColor: '#0d6efd',
									color: '#fff',
									padding: '10px 20px',
									borderRadius: '5px',
								}}
								className='w-100 fw-semibold'
								onClick={() =>
								(window.location.href =
									'https://autobotchungkhoan.pro.vn/auth/login')
								}>
								Đăng nhập ngay
							</Button>
						</CardBody>
					</Card>
				)}
			</CardBody>
		</Card>
	);
};

export default Profile;
