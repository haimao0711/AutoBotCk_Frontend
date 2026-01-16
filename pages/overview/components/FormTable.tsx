import Icon from '../../../components/icon/Icon';
import dayjs from 'dayjs';
import useDarkMode from '../../../hooks/useDarkMode';
import { useContext, useEffect, FC, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import showNotification from '../../../components/extras/showNotification';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Input from '@components/bootstrap/forms/Input';

import FormGroup from '@components/bootstrap/forms/FormGroup';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '@layout/SubHeader/SubHeader';
import Spinner from '@components/bootstrap/Spinner';
import Button from '@components/bootstrap/Button';
import Select from '@components/bootstrap/forms/Select';
import USERS from '@common/data/userDummyData';
import Option from '@components/bootstrap/Option';
import ConfigContext from '@context/configContext';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';

import {
	getAccountVpsApi,
	useGetCreateConfig,
	useGetCreateConfigRun,
	getTemplateConfigApi,
	useGetUpdateApiStock,
} from '@hooks/useGetCreateConfig';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '@components/bootstrap/Dropdown';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import { authService } from '@services/index';
import Checks from '@components/bootstrap/forms/Checks';
import { compactAmount, compactBalance } from '@helpers/helpers';
import styled from 'styled-components';
import { AddAPhoto, AddBox } from '@components/icon/material-icons';
import SearchStock from '@components/SearchStock';
import Label from '@components/bootstrap/forms/Label';
import FormItem from '@components/FormItem';
import { AccountType, AccountVPS } from '../../../type/accounts-type';
interface IFormProps {
	stocks: any;
	isOpen: boolean;
	setIsOpenEdit(...args: unknown[]): unknown;
	setInfo(...args: unknown[]): unknown;
	setIsOpenDelete(...args: unknown[]): unknown;
	setIsOptions(...args: unknown[]): unknown;
}
const FormStyled = styled.div``;

export const times = ['M1', 'M5', 'M15', 'H1', 'D1'];
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

const FormTable: FC<IFormProps> = ({
	setIsOpenEdit,
	isOpen,
	stocks,
	setInfo,
	setIsOpenDelete,
	setIsOptions,
}) => {
	const { addToast } = useToasts();
	const createConfig = useGetCreateConfig();
	const createConfigRun = useGetCreateConfigRun();
	// const getTemplate = useGetTemplateConfig();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [accountsVps, setAccountVps] = useState<AccountType[] | any[]>([]);
	const [arrayStocks, setArrayStocks] = useState([]);
	const [arrConfig, setArrayConfig] = useState<any>([]);
	const [isEdit, setIsEdit] = useState<any>();
	// const getAccountVps = useGetAccountVps();
	const [currentId, setCurrentId] = useState<any>();
	const [currentChart, setCurrentChart] = useState('M1');
	const [currentChartTrading, setCurrentChartTrading] = useState('M1');
	const [balance, setBalance] = useState<any>(0);
	const [activeAdd, setActiveAdd] = useState<any>(false);
	const [searchKey, setSearchKey] = useState<string>();
	const [filterMenu, setFilterMenu] = useState(false);
	const [arrStocksOrigin, setArrayStocksOrigin] = useState([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [arrRender, setArrayRender] = useState([]);

	const [amountBuy, setAmountBuy] = useState('');
	const [keyStockSearch, setKeyStockSearch] = useState('');
	const [isTemplate, setIsTemplate] = useState(false);
	const handleSearch = () => {
		const newArr = arrConfig?.filter(function (item: any) {
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
		});
		keyStockSearch
			? setArrayRender(newArr?.slice(0, perPage))
			: setArrayRender(arrConfig?.slice(0, perPage));
	};
	const handleRefresh = () => {
		setKeyStockSearch('');
		setArrayRender(arrConfig?.slice(0, perPage));
	};

	useEffect(() => {
		async function fetchData() {
			const template = await getTemplateConfigApi();
			setIsTemplate(JSON.stringify(template) !== '{}' ? true : false);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { setValues, ...formik } = useFormik({
		initialValues: {
			...stocks,
			checkedAll: false,
			checked: [],
		},
		onSubmit: async (values) => {
			if (values?.checked?.length > 0) {
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
							setArrayConfig(userConfigs);
							setArrayRender(userConfigs?.slice(0, perPage));
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
						<Toasts
							title='Create notifications'
							icon='Cancel'
							iconColor='danger'
							isDismiss>
							Vui lòng tạo cấu hình trước khi lưu cài đặt này
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
				}
			} else {
				addToast(
					<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
						Vui lòng chọn tài khoản
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			}
		},
	});

	const transformData = useCallback((accounts: AccountVPS[]) => {
		return accounts.flatMap((user) => {
			const accounts = [];
			if (user.margin_account) {
				accounts.push({ ...user.margin_account, type: 'margin', main_account: user.id });
			}
			if (user.normal_account) {
				accounts.push({ ...user.normal_account, type: 'normal', main_account: user.id });
			}
			return accounts;
		});
	}, []);

	useEffect(() => {
		async function fetchStocks() {
			const stocks = await authService.getStocks();
			setArrayStocks(stocks ? stocks?.slice(0, 10) : []);
			setArrayStocksOrigin(stocks);
		}

		async function fetchData() {
			const { userConfigs } = await authService.getConfig();

			const buyedConfigs = userConfigs?.filter(
				(config: any) =>
					config?.trading_status === 'waiting_to_sell' ||
					config?.trading_status === 'buying_processing',
			);

			const accounts = await getAccountVpsApi();

			if (accounts) {
				setAccountVps(transformData(accounts));
			}
			setArrayConfig(buyedConfigs);
			setArrayRender(buyedConfigs?.slice(0, perPage));
		}
		fetchStocks();
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const account: any =
			accountsVps?.length > 0 &&
			accountsVps?.find((account: any) => account?.id == formik?.values.id_account);
		setBalance(account?.nav);
	}, [formik?.values.id_account, accountsVps]);

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

	useEffect(() => {
		if (formik?.values?.checked?.length != accountsVps?.length) {
			setValues({ ...formik?.values, checkedAll: false });
		}
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik?.values?.checked, setValues, accountsVps]);

	useEffect(() => {
		setArrayRender(arrConfig?.slice((currentPage - 1) * perPage, currentPage * perPage));
	}, [currentPage, perPage, arrConfig]);

	return (
		<Card>
			<FormStyled>
				<div className='col-12'></div>
				<CardBody className='abc'>
					<form className='d-flex gap-4 mb-4'>
						<div className='col-lg-8 col-12'>
							<FormItem label='Tìm kiếm'>
								<Input
									id='search'
									type='text'
									placeholder='Tìm kiếm theo mã cổ phiếu, tên cổ phiếu, tài khoản VPS,...'
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

						<div className='col-lg-2 d-flex col-12  align-items-end justify-content-end'>
							<FormGroup className='col-8'>
								<Button
									color='primary'
									className='w-100  '
									style={{ minHeight: '48px' }}
									rounded={1}
									onClick={handleSearch}>
									Tìm kiếm
								</Button>
							</FormGroup>
						</div>
						<div className='col-lg-2 d-flex col-12  align-items-end'>
							<FormGroup className='col-8'>
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
											<th>TỈ LỆ MARGIN </th>
											<th>LEVEL CẤU HÌNH</th>
											<th>GIÁ HIỆN TẠI </th>
											<th>SỐ CP TỐI ĐA CÓ THỂ MUA </th>
											<th>KHỐI LƯỢNG MUA DỰ KIẾN </th>
											<th>TRẠNG THÁI MUA / BÁN</th>
											<th>TỔNG KHỐI LƯỢNG ĐÃ MUA </th>
											<th>KLGD</th>
											<th>GIÁ VỐN</th>
											<th>LỜI / LỖ </th>
											<th>GIÁ CUT LOSS</th>
											<th>TRẠNG THÁI CUT LOSS</th>
											<th>GIÁ CHẶN LÃI</th>
											<th>TRẠNG THÁI CHẶN LÃI</th>
											<th>TRẠNG THÁI GIÁ KÍCH HOẠT LỆNH MUA </th>
											<th>GIÁ KÍCH HOẠT LỆNH MUA </th>
											<th>TUỲ CHỌN</th>
											<th>MUA / BÁN</th>
										</tr>
									</thead>
									<tbody>
										{arrRender?.map((item: any, index: any) => (
											<tr key={item?.id}>
												<th>{index + (currentPage - 1) * perPage}</th>
												<th style={{ color: 'green' }}>
													{item?.stock_name}{' '}
												</th>
												<th>{item?.account_vps}</th>

												<th>{(item?.stock_margin).toFixed(0)} % </th>
												<th>{item?.level}</th>
												<th style={{ color: 'green' }}>
													{Number(item?.current_price).toFixed(2)}
												</th>
												<th>
													{Number(item?.max_volume_buy).toLocaleString()}
												</th>
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
												<th
													style={
														item?.status_pid == 'Buying'
															? { color: 'green' }
															: item?.status_pid == 'Selling'
															? { color: 'red' }
															: {}
													}>
													{item?.status_pid}
												</th>
												<th>{Number(item?.volume_buy).toLocaleString()}</th>
												<th>
													{Number(item?.volume_trade).toLocaleString()}
												</th>
												<th>{Number(item?.aver_price_buy).toFixed(2)}</th>
												<th
													style={
														item?.current_profit > 0
															? { color: 'green' }
															: { color: 'red' }
													}>
													{Number(item?.current_profit).toLocaleString()}
												</th>
												<th>{Number(item?.price_stoploss).toFixed(2)}</th>
												<th>{item?.is_use_stoploss ? 'True' : 'False'}</th>
												<th>{Number(item?.price_profit).toFixed(2)}</th>
												<th>
													{item?.is_use_takeprofit ? 'True' : 'False'}
												</th>
												<th>
													{item?.is_use_price_to_buy ? 'True' : 'False'}
												</th>
												<th
													style={
														isEdit == item?.id ? { padding: '0' } : {}
													}>
													{Number(item?.price_to_buy_now).toFixed(2)}
												</th>
												<th>
													<>
														<Button
															icon={isLoading ? undefined : 'Run'}
															isLight
															color={'warning'}
															className='mb-3'
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
													</>
												</th>
												<th>
													<>
														<Button
															icon={isLoading ? undefined : 'Run'}
															isLight
															color={'danger'}
															onClick={() => {
																setIsOpenDelete(true);
																setInfo(item);
																setIsOpenEdit(false);

																setIsOptions({
																	isOpen: true,
																	isBuy: false, //
																	isSell: true, //
																});
															}}>
															{isLoading && (
																<Spinner isSmall inButton />
															)}
															Bán
														</Button>
													</>
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

						<div className='col-lg-12'>
							<FormGroup className='col-12 overflow-auto' id='id_account'>
								<table
									style={{ minWidth: '1000px' }}
									className='table table-modern table-hover table-account'>
									<thead>
										<tr>
											<th>id</th>
											<th>Tài khoản</th>
											<th>Số tiền được cấp</th>
											<th>Trạng thái</th>
										</tr>
									</thead>
									<tbody>
										{accountsVps?.map((item: any) => (
											<tr key={item?.id}>
												<td>{item?.id}</td>
												<td>{item?.name}</td>
												<td>{compactBalance(item?.nav)}</td>

												<td>
													<label className='align-items-center d-flex gap-4'>
														<input
															name='checked'
															type='checkbox'
															onChange={formik.handleChange}
															checked={
																formik?.values?.checked?.indexOf(
																	item?.id.toString(),
																) != -1
															}
															value={item?.id}
														/>
														Active
													</label>
												</td>
											</tr>
										))}

										<tr>
											<td />
											<td />
											<td>Chọn tất cả</td>
											<td>
												<FormGroup>
													<Checks
														id='checkedAll'
														type='switch'
														label='Active'
														style={{
															display: 'flex',
															alignItems: 'center',
														}}
														onChange={formik.handleChange}
														checked={formik?.values.checkedAll}
														ariaLabel='status'
													/>
												</FormGroup>
											</td>
										</tr>
									</tbody>
								</table>
							</FormGroup>
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
							isDisable={!(formik?.values?.checked?.length > 0 && currentId)}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading ? 'Saving' : 'Lưu'}
						</Button>
					</div>
				)}
			</FormStyled>
		</Card>
	);
};

export default FormTable;
