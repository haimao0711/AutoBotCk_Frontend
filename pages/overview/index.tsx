import React, { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import useDarkMode from '../../hooks/useDarkMode';
import Profile from './profile';
import Statics from './statics';
import TableActiveLog from './tableActiveLog';
import TradingView from './tradingView';
import RunBot from './runBots';
import ModalConfirm from './ModalCofirmSession';
import ModalDelete from './ModalDelete';
import TableData from './components/TableData';
import Button from '@components/bootstrap/Button';
import useUserLogin from '@hooks/useUserLogin';
import { authService } from '@services/index';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import AuthContext from '@context/authContext';
import styled from 'styled-components';

const StyledActionButton = styled(Button)`
	background-color: #4caf50;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	outline: none;

	&:hover {
		filter: brightness(1.2); /* Make it 20% brighter */
		box-shadow: 0 0 8px rgba(76, 175, 80, 0.4); /* Add subtle glow */
	}

	&:active {
		filter: brightness(0.9);
	}
`;
const Index: NextPage = () => {
	const { userName, email } = useUserLogin();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const { addToast } = useToasts();
	const [isOpen, setIsOpen] = useState(false);
	const [isBlockBuy, setIsBlockBuy] = useState(false);
	const [isBlockSell, setIsBlockSell] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
	const [info, setInfo] = useState();
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOptions, setIsOptions] = useState({
		isOpen: false,
		isBuy: false,
		isSell: false,
		isTrade: false,
	});
	const [userConfigs, setUserConfigs] = useState<any[]>([]);
	const [isTrading, setIsTrading] = useState(false);
	const {
		isLogin,
		setLimitNumberStocks,
		setLimitTotalMarketValue,
		setCashAvailable,
		setTotalMarketValue,
		setAccountName,
		setAccountNum,
		setTotalEquity,
	} = useContext(AuthContext);
	const handleChangeStatusTrading = () => {
		setIsTrading(!isTrading);
	};
	const handleSetIsOpen = () => {
		setIsOpen(!isOpen);
	};
	const handleStopTrade = async (type: string) => {
		const data =
			type === 'B'
				? {
					is_block_buy: !isBlockBuy,
					is_block_sell: isBlockSell,
					type: 'B',
				}
				: {
					is_block_buy: isBlockBuy,
					is_block_sell: !isBlockSell,
					type: 'S',
				};
		const response = await authService.openBlockTrading(data);
		if (response) {
			setIsBlockBuy(response?.is_block_buy);
			setIsBlockSell(response?.is_block_sell);
			addToast(
				<Toasts title='Create notifications' iconColor='success' icon='TaskAlt' isDismiss>
					{`Đổi trạng thái ${type === 'B' ? 'MUA' : 'BÁN'} thành công!`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		} else {
			addToast(
				<Toasts title='Create notifications' iconColor='danger' icon='Error' isDismiss>
					{`Đổi trạng thái ${type === 'B' ? 'MUA' : 'BÁN'} không thành công!`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		}
	};
	useEffect(() => {
		async function checkIsTrading() {
			try {
				const response = await authService.getIsTrading();
				// console.log('check response checkIsTrading: ', response);
				if (response) {
					setIsTrading(response.is_trading);
					setTotalEquity(response.total_equity);
					setCashAvailable(response.cash_available);
					setTotalMarketValue(response.total_market_value);
					setAccountName(response.account_name);
					setAccountNum(response.account_num);
					setLimitNumberStocks(response.limit_number_stocks);
					setLimitTotalMarketValue(response.limit_total_market_value);
				} else {
					setIsTrading(false);
				}
			} catch (error) {
				console.error('getIsTrading error:', error);
				setIsTrading(false);
			}
		}
		checkIsTrading();
		const intervalId = setInterval(checkIsTrading, 2000);
		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		async function getIsBlockBuy() {
			try {
				const response = await authService.getIsBlockBuy();
				if (response) {
					setIsBlockBuy(response?.is_block_buy);
					setIsBlockSell(response?.is_block_sell);
				}
			} catch (error) {
				console.error('getIsBlockBuy error:', error);
			}
		}
		getIsBlockBuy();
	}, []);

	const fetchConfigs = async () => {
		try {
			const { userConfigs } = await authService.getConfig();
			setUserConfigs(userConfigs);
		} catch (error) {
			console.error('fetchConfigs error:', error);
		}
	};

	useEffect(() => {
		fetchConfigs();
		const intervalId = setInterval(fetchConfigs, 3000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<PageWrapper className='page-overview'>
			<Head>
				<title>Overview</title>
			</Head>
			<ModalConfirm
				isOpen={isOpen}
				setIsOpen={handleSetIsOpen}
				account={'abc'}
				isTrading={isTrading}
				onChangeStatusTrading={handleChangeStatusTrading}
			/>
			<ModalDelete
				isOpen={isOpenDelete}
				isOpenEdit={isOpenEdit}
				info={info}
				setIsOpen={setIsOpenDelete}
				options={isOptions}
				setIsOptions={setIsOptions}
				getData={fetchConfigs}
			/>
			<Page>
				<div className='containerProfile'>
					<div className='wrap-profile'>
						<Profile
							totalStocksPurchased={
								userConfigs?.filter((item: any) => Number(item.volume_buy) > 0)
									.length || 0
							}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								marginBottom: '10px',
							}}>
							<h5>TRẠNG THÁI HOẠT ĐỘNG CỦA BOT</h5>
							<span>( Click để thay đổi trạng thái)</span>
						</div>
						<div className='topBuySell' style={{ display: 'flex', gap: '10px' }}>
							<StyledActionButton
								onClick={(e: any) => {
									setIsOpen(!isOpen);
								}}>
								{!isTrading ? 'Đang Dừng Bot' : 'Đang Chạy Bot'}
							</StyledActionButton>
							<StyledActionButton
								onClick={() => handleStopTrade('B')}>
								{isBlockBuy ? 'Đang chặn MUA' : 'Đang MUA'}
							</StyledActionButton>
							<StyledActionButton
								onClick={() => handleStopTrade('S')}>
								{isBlockSell ? 'Đang chặn BÁN' : 'Đang BÁN'}
							</StyledActionButton>
						</div>
					</div>
				</div>
				{/* <TradingView /> */}
				<div className='wrap-statics'>
					<RunBot
						isExistStock={true}
						setIsOpenEdit={setIsOpenEdit}
						isBlockBuy={isBlockBuy}
						isBlockSell={isBlockSell}
						setInfo={setInfo}
						isOpen={isOpenDelete}
						setIsOpenDelete={setIsOpenDelete}
						isOptions={isOptions}
						setIsOptions={setIsOptions}
						userConfigs={userConfigs}
					/>
				</div>
				<div className='wrap-statics'>
					<RunBot
						isExistStock={false}
						setIsOpenEdit={setIsOpenEdit}
						isBlockBuy={isBlockBuy}
						isBlockSell={isBlockSell}
						setInfo={setInfo}
						isOpen={isOpenDelete}
						setIsOpenDelete={setIsOpenDelete}
						isOptions={isOptions}
						setIsOptions={setIsOptions}
						userConfigs={userConfigs}
					/>
				</div>
				{/* <div className='wrap-statics'>
					<TableData
						setIsOpenEdit={setIsOpenEdit}
						setInfo={setInfo}
						isOpen={isOpenDelete}
						setIsOpenDelete={setIsOpenDelete}
						setIsOptions={setIsOptions}
					/>
				</div> */}

				{/* <div className='wrap-table_active_log'>
					<TableActiveLog />
				</div> */}
			</Page>
		</PageWrapper>
	);
};

export default Index;
