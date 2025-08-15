import React, { useRef, useContext, useEffect, FC, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import showNotification from '../../components/extras/showNotification';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Input from '@components/bootstrap/forms/Input';

import FormGroup from '@components/bootstrap/forms/FormGroup';
import Spinner from '@components/bootstrap/Spinner';
import Button from '@components/bootstrap/Button';
import Select from '@components/bootstrap/forms/Select';
import USERS from '@common/data/userDummyData';
import Option from '@components/bootstrap/Option';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';

import {
	// useGetAccountVps,
	useGetCreateConfig,
	useGetCreateConfigRun,
	useGetTemplateConfig,
	useGetUpdateApiStock,
} from '@hooks/useGetCreateConfig';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import { authService } from '@services/index';
import styled from 'styled-components';
import { AddAPhoto, AddBox } from '@components/icon/material-icons';
import SearchStock from '@components/SearchStock';
import Label from '@components/bootstrap/forms/Label';
import FormItem from '@components/FormItem';
import { AccountType, AccountVPS } from '../../type/accounts-type';
interface IOptions {
	isOpen: boolean;
	isBuy: boolean;
	isSell: boolean;
}
interface IFormProps {
	isExistStock: boolean;
	stocks: any;
	isOpen: boolean;
	isBlockBuy: boolean;
	isBlockSell: boolean;
	isOptions: IOptions;
	setIsOpenEdit(...args: unknown[]): unknown;
	setInfo(...args: unknown[]): unknown;
	setIsOpenDelete(...args: unknown[]): unknown;
	setIsOptions(...args: unknown[]): unknown;
}

const FormStyled = styled.div``;

export const times = ['M1', 'M5', 'M15', 'H1', 'D1', 'W1'];
const CHECK_ALL_OBJECT: { [key: string]: boolean } = {
	statusList: true,
	provinceList: true,
	districtList: true,
	wardList: true,
	employeeList: true,
	approveStatusList: true,
	priceQuotationList: true,
	priceGroupList: true,
};

const Form: FC<IFormProps> = ({
	isExistStock,
	setIsOpenEdit,
	isOpen,
	stocks,
	isBlockBuy,
	isBlockSell,
	setInfo,
	setIsOpenDelete,
	isOptions,
	setIsOptions,
}) => {
	const { addToast } = useToasts();
	const createConfig = useGetCreateConfig();
	const createConfigRun = useGetCreateConfigRun();
	const getTemplate = useGetTemplateConfig();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);
	const [accountsVps, setAccountVps] = useState<AccountType[] | any[]>([]);
	const [arrayStocks, setArrayStocks] = useState([]);
	const [isEdit, setIsEdit] = useState<any>();
	// const getAccountVps = useGetAccountVps();
	const [currentId, setCurrentId] = useState<any>();
	const [currentChart, setCurrentChart] = useState('M1');
	const [currentChartTrading, setCurrentChartTrading] = useState('M1');
	// const [balance, setBalance] = useState<any>(0);
	const [activeAdd, setActiveAdd] = useState<any>(false);
	const [searchType, setSearchType] = useState('symbol');
	const [searchKey, setSearchKey] = useState<string>();
	const [isSearch, setIsSearch] = useState(false);
	const [arrStocksOrigin, setArrayStocksOrigin] = useState([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [arrConfig, setArrayConfig] = useState<any>([]);
	const [arrRender, setArrayRender] = useState([]);
	const [arrSearch, setArraySearch] = useState([]);
	const [amountBuy, setAmountBuy] = useState('');
	const [keyStockSearch, setKeyStockSearch] = useState('');
	const [isTemplate, setIsTemplate] = useState(false);
	const [percentTrade, setPercentTrade] = useState(0);
	const [percentBuy, setPercentBuy] = useState(0);
	const [sortKey, setSortKey] = useState<string>('stock_name');
	const sortKeyRef = useRef(sortKey);

	// Cập nhật sortKeyRef mỗi khi sortKey thay đổi
	useEffect(() => {
		sortKeyRef.current = sortKey;
	}, [sortKey]);

	const handleSearch = () => {
		setCurrentPage(1);
		const newArr = arrConfig?.filter(function (item: any) {
			if (searchType === 'symbol') {
				console.log('Tìm theo mã cổ phiếu (symbol):', keyStockSearch);
				return (
					item?.account_vps
						?.toString()
						.toLocaleLowerCase()
						.includes(keyStockSearch && keyStockSearch?.toLocaleLowerCase()) ||
					item?.stock_name
						?.toString()
						.toLocaleLowerCase()
						.includes(keyStockSearch && keyStockSearch.toLocaleLowerCase())
				);
			} else if (searchType === 'volume') {
				return item?.volume_to_buy == keyStockSearch;
			} else if (searchType === 'level') {
				return item?.level == keyStockSearch;
			}
		});
		setArraySearch(newArr);
		keyStockSearch
			? setArrayRender(newArr?.slice((currentPage - 1) * perPage, currentPage * perPage))
			: setArrayRender(arrConfig?.slice((currentPage - 1) * perPage, currentPage * perPage));
		setIsSearch(true);
	};
	const handleRefresh = () => {
		setKeyStockSearch('');
		setIsSearch(false);
		setArraySearch([]);
		setArrayRender(arrConfig?.slice(0, perPage));
	};
	const updateConfig = useGetUpdateApiStock();
	// Xử lý sắp xếp
	const sortArrHandle = (arr: any, sortKey: string) => {
		const sorted = [...arr];

		sorted.sort((a, b) => {
			const valA = a[sortKey];
			const valB = b[sortKey];
			if (sortKey === 'stock_name') {
				return String(valA).localeCompare(String(valB), 'vi', { sensitivity: 'base' });
			}

			if (['level', 'current_price'].includes(sortKey)) {
				return Number(valA) - Number(valB);
			}
			if (['current_profit'].includes(sortKey)) {
				return (
					Number(String(valB).replace(/%$/, '')) - Number(String(valA).replace(/%$/, ''))
				);
			}
			return Number(valB) - Number(valA);
		});

		return sorted;
	};

	useEffect(() => {
		setArrayConfig((prevArr: any) => {
			const newArr = sortArrHandle(prevArr, sortKey);
			return newArr;
		});
	}, [sortKey]);

	const handleSaveConfig = async (
		stock_id: string,
		is_block_buy: boolean,
		is_block_sell: boolean,
	) => {
		const data = {
			stock_id: stock_id,
			is_block_buy: is_block_buy,
			is_block_sell: is_block_sell,
		};
		setIsLoadingStatus(true);
		updateConfig(
			data,
			async (res: any) => {
				const dataRes = res.data;
				// console.log('data res: ', dataRes);
				setArrayConfig(() =>
					arrConfig.map((item: any) =>
						item.stock_id == dataRes.stock_id
							? {
									...item,
									is_block_buy: dataRes.is_block_buy,
									is_block_sell: dataRes.is_block_sell,
							  }
							: item,
					),
				);
				setIsLoadingStatus(false);
				addToast(
					<Toasts
						title='Update notifications'
						iconColor='success'
						icon='TaskAlt'
						isDismiss>
						Update config successfully
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			},
			(res: any) => {
				setIsLoadingStatus(false);
				addToast(
					<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
						{res?.message}
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			},
		);
	};
	useEffect(() => {
		async function fetchData() {
			const template = await getTemplate;
			setIsTemplate(JSON.stringify(template) !== '{}' ? true : false);
		}
		fetchData();
	}, [getTemplate]);
	const { setValues, ...formik } = useFormik({
		initialValues: {
			...stocks,
			checkedAll: false,
			checked: [],
		},
		onSubmit: async (values) => {
			// if (values?.checked?.length > 0) {
			if (isTemplate) {
				const mappedArray = values.checked.map((value: any) => ({
					account_id: value,
				}));
				const data = {
					chart_following: currentChart,
					chart_trading: currentChartTrading,
					stock_id: currentId,
					vpses: mappedArray,
				};
				setIsLoading(true);
				createConfigRun(
					data,
					async (res: any) => {
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								iconColor='success'
								icon='TaskAlt'
								isDismiss>
								Tạo cài đặt cho mã cổ phiếu thành công
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
						setValues({
							id_config: '',
							timeRunning: '',
							id: '',
							id_account: '',
						});
						const { userConfigs } = await authService.getConfig();
						const sortedUserConfigs = sortArrHandle(userConfigs, sortKey);
						if (isExistStock && sortedUserConfigs) {
							const filteredConfigs = sortedUserConfigs.filter(
								(item: any) => Number(item.volume_buy) > 0,
							);
							setArrayConfig(filteredConfigs);
						} else {
							setArrayConfig(sortedUserConfigs);
						}
					},
					(res: any) => {
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								icon='Cancel'
								iconColor='danger'
								isDismiss>
								{res?.message}
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
					},
				);
			} else {
				addToast(
					<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
						Vui lòng tạo cấu hình trước khi lưu cài đặt này
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			}
		},
	});
	// Selected Event
	useEffect(() => {
		if (stocks) setValues({ ...stocks });
		return () => {};
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setValues, stocks]);

	// Get list stock config
	useEffect(() => {
		async function fetchData() {
			const { stocks, userConfigs } = await authService.getConfig();
			const currentSortKey = sortKeyRef.current;
			const sortedUserConfigs = sortArrHandle(userConfigs, currentSortKey);
			if (isExistStock && sortedUserConfigs) {
				const filteredConfigs = sortedUserConfigs.filter(
					(item: any) => Number(item.volume_buy) > 0,
				);
				if (!isSearch) {
					setArrayConfig(filteredConfigs);
				}
			} else {
				if (!isSearch) {
					setArrayConfig(sortedUserConfigs);
				}
			}
			setArrayStocks(stocks ? stocks?.slice(0, 10) : []);
			setArrayStocksOrigin(stocks);
		}
		fetchData();
		const intervalId = setInterval(fetchData, 20000);
		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isBlockBuy, isBlockSell]);

	useEffect(() => {
		const newArr = arrStocksOrigin?.filter(function (item: any) {
			return (
				item?.name
					?.toString()
					.toLocaleLowerCase()
					.includes(searchKey && searchKey?.toLocaleLowerCase()) ||
				item?.symbol
					?.toString()
					.toLocaleLowerCase()
					.includes(searchKey && searchKey.toLocaleLowerCase())
			);
		});
		searchKey && setArrayStocks(newArr);
	}, [searchKey, arrStocksOrigin]);

	useEffect(() => {
		if (!formik?.values.checkedAll) {
			setValues({ ...formik?.values, checked: [] });
		} else {
			const arrIndex = accountsVps?.map((item: any) => {
				return item?.id.toString();
			});
			setValues({ ...formik?.values, checked: [...arrIndex] });
		}
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik?.values.checkedAll, setValues, accountsVps]);

	const paginateArray = useCallback(() => {
		if (isSearch) {
			setArrayRender(arrSearch?.slice((currentPage - 1) * perPage, currentPage * perPage));
		} else {
			setArrayRender(arrConfig?.slice((currentPage - 1) * perPage, currentPage * perPage));
		}
	}, [isSearch, arrSearch, currentPage, perPage, arrConfig]);
	useEffect(() => {
		paginateArray();
	}, [paginateArray]);
	const removePercentage = (input: any) => {
		if (typeof input !== 'string') {
			input = String(input);
		}
		return parseFloat(input.replace('%', '').trim());
	};
	// Tổng volume_to_buy nếu volume_buy > 0
	const sumVolumeNeedBuy = (arrConfig?: any[]): number => {
		if (!Array.isArray(arrConfig)) return 0;
		return arrConfig.reduce(
			(sum, item) =>
				sum + (Number(item?.volume_buy) > 0 ? Number(item?.volume_to_buy ?? 0) : 0),
			0,
		);
	};
	// Tính tổng volume_buy
	const sumVolumeBuy = (arrConfig?: any[]): number => {
		if (!Array.isArray(arrConfig)) return 0;
		return arrConfig.reduce((sum, item) => sum + Number(item?.volume_buy ?? 0), 0);
	};

	// Tính tổng volume_trade
	const sumVolumeTrade = (arrConfig?: any[]): number => {
		if (!Array.isArray(arrConfig)) return 0;
		return arrConfig.reduce((sum, item) => sum + Number(item?.volume_trade ?? 0), 0);
	};

	// Tính phần trăm (tránh chia cho 0)
	const percent = (a: number, b: number): number => {
		if (!b) return 0;
		return Math.round((a / b) * 100);
	};
	useEffect(() => {
		const buy = sumVolumeBuy(arrConfig);
		const trade = sumVolumeTrade(arrConfig);
		const needBuy = sumVolumeNeedBuy(arrConfig);
		// tránh chia cho 0
		const percentTrade = buy > 0 ? percent(trade, buy) : 0;
		const percentBuy = needBuy > 0 ? percent(buy, needBuy) : 0;
		setPercentTrade(percentTrade);
		setPercentBuy(percentBuy);
	}, [arrConfig]);
	return (
		<Card>
			<FormStyled>
				<div className='col-12'></div>
				<CardBody className='abc'>
					<form className='row g-3 align-items-center mb-4'>
						<div className='d-flex align-items-center'>
							<label htmlFor='sortOption' className='me-2 fw-bold mb-0'>
								Sắp xếp theo:
							</label>
							<select
								id='sortKey'
								value={sortKey}
								onChange={(e) => setSortKey(e.target.value)}
								className='form-select form-select-sm'
								style={{ minWidth: '180px', width: 'auto' }}>
								<option value='stock_name'>ABC</option>
								<option value='level'>Level</option>
								<option value='volume_to_buy'>Khối lượng mua dự kiến</option>
								<option value='volume_buy'>Khối lượng đã mua</option>
								<option value='volume_trade'>Khối lượng đã về</option>
								<option value='current_price'>Giá hiện tại</option>
								<option value='current_profit'>Lời/lỗ</option>
							</select>
						</div>
						<div className='col-8 col-md-3 col-lg-2'>
							<FormItem label='Tìm kiếm theo'>
								<select
									className='form-control'
									style={{ minHeight: '48px' }}
									value={searchType}
									onChange={(e) => setSearchType(e.target.value)}>
									<option value='symbol'>Mã cổ phiếu</option>
									<option value='volume'>Khối lượng mua dự kiến</option>
									<option value='level'>Level</option>
								</select>
							</FormItem>
						</div>

						<div className='col-8 col-md-3 col-lg-3'>
							<FormItem
								label={
									searchType === 'symbol'
										? 'Mã cổ phiếu'
										: searchType === 'volume'
										? 'Khối lượng'
										: 'Level'
								}>
								<Input
									id='search'
									type={searchType === 'symbol' ? 'text' : 'number'}
									placeholder={
										searchType === 'symbol'
											? 'Chọn mã cổ phiếu'
											: searchType === 'volume'
											? 'Chọn khối lượng'
											: 'Chọn level'
									}
									autoComplete='search'
									value={keyStockSearch}
									onChange={(e: any) => setKeyStockSearch(e.target.value)}
									style={{ minHeight: '48px' }}
									onFocus={() => {
										formik.setErrors({});
									}}
								/>
							</FormItem>
						</div>

						<div className='col-6 col-md-3 col-lg-2 d-flex align-self-end justify-content-md-end '>
							<FormGroup className='w-100'>
								<Button
									color='primary'
									className='w-100'
									style={{ minHeight: '48px' }}
									rounded={1}
									onClick={handleSearch}>
									Tìm kiếm
								</Button>
							</FormGroup>
						</div>

						<div className='col-6 col-md-3 col-lg-2 d-flex align-self-end justify-content-md-start'>
							<FormGroup className='w-100'>
								<Button
									color='light'
									className='w-100'
									style={{ minHeight: '48px' }}
									size='lg'
									rounded={1}
									onClick={handleRefresh}>
									Làm mới
								</Button>
							</FormGroup>
						</div>
					</form>
					<div className='row g-4'>
						<div className='col-lg-12'>
							<FormGroup className='col-12 ' id='id_account'>
								<table
									style={{
										display: 'block',
										maxHeight: '1200px',
										overflow: 'scroll',
									}}
									className='table table-modern table-hover table-account'>
									<thead>
										<tr>
											<th>STT</th>
											<th>MÃ CHỨNG KHOÁN </th>
											<th>TÀI KHOẢN VPS</th>
											<th>KHỐI LƯỢNG MUA DỰ KIẾN </th>
											<th>LEVEL</th>
											<th>
												KHỐI LƯỢNG ĐÃ MUA
												<span
													style={{
														color: '#02FF00',
														whiteSpace: 'nowrap',
													}}>
													{` (${percentBuy} %)`}
												</span>
											</th>
											<th>
												KHỐI LƯỢNG ĐÃ VỀ
												<span
													style={{
														color: '#02FF00',
														whiteSpace: 'nowrap',
													}}>
													{` (${percentTrade} %)`}
												</span>
											</th>
											<th>GIÁ HIỆN TẠI </th>
											<th>GIÁ VỐN</th>
											<th>LỜI / LỖ </th>
											<th>MUA TỰ ĐỘNG</th>
											<th>BÁN TỰ ĐỘNG</th>
											<th>MUA TAY</th>
											<th>BÁN TAY</th>
											<th>TUỲ CHỌN</th>
										</tr>
									</thead>
									<tbody>
										{arrRender?.map((item: any, index: any) => (
											<tr key={item?.id}>
												<th>{index + 1 + (currentPage - 1) * perPage}</th>
												<th
													style={
														removePercentage(item?.current_profit) > 0
															? { color: '#02FF00' }
															: { color: '#FF3737' }
													}>
													{item?.stock_name}{' '}
												</th>
												<th>{item?.account_vps}</th>
												<th
													style={
														isEdit == item?.id ? { padding: '0' } : {}
													}>
													{isEdit == item?.id ? (
														<input
															type='number'
															placeholder='Số lượng cổ phiếu'
															autoComplete='volume'
															min={0}
															onChange={(e: any) => {
																setAmountBuy(e.target.value);
															}}
															value={amountBuy}
															style={{ width: '100%' }}
														/>
													) : (
														Number(item?.volume_to_buy).toLocaleString()
													)}
												</th>
												<th> {item?.level} </th>
												<th>{Number(item?.volume_buy).toLocaleString()}</th>
												<th>
													{Number(item?.volume_trade).toLocaleString()}
												</th>
												<th style={{ color: '#FFD900' }}>
													{Number(item?.current_price).toFixed(2)}
												</th>
												<th>{Number(item?.aver_price_buy).toFixed(2)}</th>
												<th
													style={
														removePercentage(item?.current_profit) > 0
															? { color: '#02FF00' }
															: { color: '#F32F35' }
													}>
													{item?.current_profit}
												</th>
												<th>
													<Button
														style={{
															backgroundColor: item?.is_block_buy
																? '#a24022'
																: '#5FD068',
															color: item?.is_block_buy
																? '#f5f5f5 '
																: '#f5f5f5',
														}}
														onClick={() => {
															handleSaveConfig(
																item?.stock_id,
																!item?.is_block_buy,
																item?.is_block_sell,
															);
														}}>
														{item?.is_block_buy ? 'OFF' : 'ON'}
													</Button>
												</th>
												<th>
													<Button
														style={{
															backgroundColor: item?.is_block_sell
																? '#a24022'
																: '#5FD068',
															color: item?.is_block_sell
																? '#f5f5f5 '
																: '#f5f5f5',
														}}
														onClick={() => {
															handleSaveConfig(
																item?.stock_id,
																item?.is_block_buy,
																!item?.is_block_sell,
															);
														}}>
														{/* {isLoadingStatus && (
															<Spinner isSmall inButton />
														)} */}
														{item?.is_block_sell ? 'OFF' : 'ON'}
													</Button>
												</th>
												<th>
													<Button
														icon={isLoading ? undefined : 'Run'}
														style={{
															backgroundColor: item?.is_buy_hand
																? '#5FD068' // dark green
																: '#a24022', // dark red
															color: item?.is_buy_hand
																? '#f5f5f5'
																: '#f5f5f5 ',
														}}
														onClick={() => {
															setIsOpenDelete(true);
															setInfo(item);
															setIsOpenEdit(false);
															setIsOptions({
																isOpen: true,
																isBuy: true,
																isSell: false,
																isTrade: !!item?.is_buy_hand,
															});
														}}>
														{isLoading && <Spinner isSmall inButton />}
														{item?.is_buy_hand ? 'ON' : 'OFF'}
													</Button>
												</th>
												<th>
													<Button
														icon={isLoading ? undefined : 'Run'}
														style={{
															backgroundColor: item?.is_sell_hand
																? '#5FD068' // dark green
																: '#a24022', // dark red
															color: item?.is_sell_hand
																? '#f5f5f5'
																: '#f5f5f5  ',
														}}
														onClick={() => {
															setIsOpenDelete(true);
															setInfo(item);
															setIsOpenEdit(false);
															setIsOptions({
																isOpen: true,
																isBuy: false,
																isSell: true,
																isTrade: !!item?.is_sell_hand,
															});
														}}>
														{isLoading && <Spinner isSmall inButton />}
														{item?.is_sell_hand ? 'ON' : 'OFF'}
													</Button>
												</th>

												<th>
													<div style={{ display: 'flex', gap: '10px' }}>
														<Button
															icon={isLoading ? undefined : 'Run'}
															isLight
															color={'warning'}
															onClick={() => {
																setIsOpenEdit(true);
																setInfo(item);
																setIsOpenDelete(true);

																setIsOptions({
																	isOpen: false,
																	isBuy: false, //
																	isSell: false, //
																});
															}}>
															{isLoading && (
																<Spinner isSmall inButton />
															)}
															Sửa
														</Button>

														<Button
															icon={isLoading ? undefined : 'Run'}
															isLight
															color={'danger'}
															onClick={() => {
																setInfo(item);
																setIsOpenDelete(true);
																setIsOpenEdit(false);
																setIsOptions({
																	isOpen: false,
																	isBuy: false, //
																	isSell: false, //
																});
															}}>
															{isLoading && (
																<Spinner isSmall inButton />
															)}
															Xoá
														</Button>
													</div>
												</th>
											</tr>
										))}
									</tbody>
								</table>
							</FormGroup>
						</div>
					</div>
				</CardBody>
				<PaginationButtons
					data={arrConfig}
					label='customers'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
				{!isExistStock && (
					<div className='d-flex fs-4 my-4 gap-2'>
						<p>{activeAdd ? 'Vui lòng nhập thông tin' : 'Thêm mã chứng khoán'}</p>
						{!activeAdd && <AddBox onClick={() => setActiveAdd(true)} />}
					</div>
				)}
				{activeAdd && (
					<div className='col-12'>
						<div className=' col-12'>
							<div className='col-12 my-3 d-flex flex-wrap gap-4'>
								<div className='col-xl-3 col-12'>
									<SearchStock
										currentId={currentId}
										setCurrentId={setCurrentId}
										formik={formik}
										dataList={arrayStocks}
										searchKey={searchKey}
										setSearchKey={setSearchKey}
										label='Mã cổ phiếu'
										placeholder='Chọn mã cổ phiếu'
										selectKey='id_config'
									/>
								</div>

								<div className='col-xl-3 col-12'>
									<FormGroup
										className=' col-12'
										id='id_config'
										label='Chọn chart theo dõi'>
										<Select
											id='id_config'
											className='col-lg-4 '
											ariaLabel='Board select'
											placeholder='Chọn chart'
											onChange={(e: any) => setCurrentChart(e.target.value)}
											value={currentChart}>
											{times?.map((item: any) => {
												return (
													<Option key={item} value={item}>
														{item}
													</Option>
												);
											})}
										</Select>
									</FormGroup>
								</div>
								<div className='col-xl-3 col-12'>
									<FormGroup
										className=' col-12'
										id='id_config_trading'
										label='Chọn chart hành động'>
										<Select
											id='id_config_trading'
											className='col-lg-4 '
											ariaLabel='Board select'
											placeholder='Chọn chart'
											onChange={(e: any) =>
												setCurrentChartTrading(e.target.value)
											}
											value={currentChartTrading}>
											{times?.map((item: any) => {
												return (
													<Option key={item} value={item}>
														{item}
													</Option>
												);
											})}
										</Select>
									</FormGroup>
								</div>
							</div>
						</div>
					</div>
				)}
				{activeAdd && (
					<div className='d-flex justify-content-end mt-3 mb-3'>
						<Button
							className='ml-3'
							icon={isLoading ? undefined : 'Run'}
							isLight
							size='lg'
							color={'danger'}
							onClick={() => setActiveAdd(false)}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading ? 'Saving' : 'Huỷ'}
						</Button>
						<Button
							className='ml-3'
							icon={isLoading ? undefined : 'Run'}
							isLight
							color={'success'}
							size='lg'
							onClick={formik?.handleSubmit}
							// isDisable={!(formik?.values?.checked?.length > 0 && currentId)}
							isDisable={!currentId}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading ? 'Saving' : 'Lưu'}
						</Button>
					</div>
				)}
			</FormStyled>
		</Card>
	);
};

export default Form;
