import React from 'react';
import { useRouter } from 'next/router';
import UserImage7 from '../../assets/img/wanna/wanna7.png';
import Card, { CardBody } from '@components/bootstrap/Card';
import Avatar from '@components/Avatar';
import Icon from '@components/icon/Icon';

const profile = {
	name: 'Mango',
	walletAddress: '0xaE156e0CAD3F08D782A4d3b94f31641A3D6003e4',
	email: 'tuitentho31@gmail.com',
	src: UserImage7,
	color: 'danger',
};

const TotalLP = () => {
	const router = useRouter();

	return (
		<Card stretch style={{ width: 'max-content' }}>
			<CardBody className='d-flex align-items-center'>
				{profile.src && (
					<div className='flex-shrink-0 mr-4'>
						<div className='fs-5 fw-bold'>Total LP</div>
					</div>
				)}
				<div className='flex-grow-1'>
					{profile.walletAddress && (
						<div className='text-muted'>
							<Icon icon='AccountBalanceWallet' className='btn-icon' /> 1.0000 OPV
						</div>
					)}
					{profile.email && (
						<div className='text-muted'>
							<Icon icon='CreditCard' className='btn-icon' /> 200 USDT
						</div>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default TotalLP;
