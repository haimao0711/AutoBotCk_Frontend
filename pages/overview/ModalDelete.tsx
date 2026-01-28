import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import Label from '@components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '@components/bootstrap/forms/Checks';
import { useFormik } from 'formik';
import Toasts from '@components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';
import { useGetCreateUser } from '@hooks/useGetCreateUser';
import {
	getAccountVpsApi,
	useGetStopTrade,
	useGetBuy,
	useGetCreateAccountVps,
	useGetDeleteConfigTemplate,
	useGetSell,
	useGetUpdateAccountVps,
	useGetUpdateApiStock,
} from '@hooks/useGetCreateConfig';
import { authService } from '@services/index';
import { useRouter } from 'next/router';
import { AccountVPS } from '../../type/accounts-type';
import { DEFAULT_INIT_LEVEL } from '@constants/default.value';

interface IValues {
	account: string;
	otp: number;
}

const ModalDelete: FC<any> = ({
	isOpenEdit,
	isOpen,
	setIsOpen,
	info,
	options,
	setIsOptions,
	getData,
}) => {
	const { addToast } = useToasts();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const daleteConfig = useGetDeleteConfigTemplate();
	const stopTradeFast = useGetStopTrade();
	const buyFast = useGetBuy();
	const sellFast = useGetSell();
	const [listAccount, setListAccount] = useState<AccountVPS[]>([]);
	const [amountBuy, setAmountBuy] = useState('');
	const [level, setLevel] = useState(DEFAULT_INIT_LEVEL);
	const [marginPercentage, setMarginPercentage] = useState(0);
	const [amountActiveBuy, setAmountActiveBuy] = useState('');
	const [cutLoss, setCutLoss] = useState(false);
	const [takeProfit, setTakeProfit] = useState(false);
	const [activeBuy, setActiveBuy] = useState(false);
	const [volumeSell, setVolumeSell] = useState('all');
	const [isUseChartAction, setIsUseChartAction] = useState(true);
	const [isCheckFollowing, setIsCheckFollowing] = useState(false);
	// const getAccountVps = useGetAccountVps();

	const updateConfig = useGetUpdateApiStock();
	const cancelModal: any = (value: boolean) => {
		setIsOpen(value);
		formik.resetForm();
		formik.setTouched({}, false);
	};

	const createUser = useGetCreateAccountVps();

	useEffect(() => {
		async function fetchAccount() {
			const accounts = await getAccountVpsApi();
			setListAccount(accounts);
		}
		fetchAccount();
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSaveConfig = async () => {
		const data = {
			stock_id: info?.stock_id,
			is_block_buy: info?.is_block_buy,
			is_block_sell: info?.is_block_sell,
			is_use_price_to_buy: activeBuy, // TRẠNG THÁI GÍA KÍCH HOẠT LỆNH MUA
			price_to_buy_now: amountActiveBuy, // GIÁ KÍCH HOẠT LỆNH MUA
			is_use_stoploss: cutLoss, // TRẠNG THÁI CUT LOSS
			is_use_takeprofit: takeProfit, // TRẠNG THÁI CHẶN LÃI
			is_update_volume_buy: true,
			volume_to_buy: amountBuy, // KHỐI LƯỢNG MUA DỰ KIẾN
			level: level,
			margin_percentage: marginPercentage,
		};

		updateConfig(
			data,
			async (res: any) => {
				setIsLoading(false);
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
				setIsOpen(false);
				if (getData) {
					getData();
				}
			},
			(res: any) => {
				setIsLoading(false);
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
	const { setValues, ...formik } = useFormik({
		initialValues: {
			account: '',
			otp: 0,
		},
		onSubmit: async (values) => {
			console.log('check options: ', options);
			if (options?.isOpen) {
				const data = {
					stock_name: info?.stock_name,
					stock_id: info?.stock_id,
					account_name: info?.account_vps,
					is_buy_hand: options?.isBuy,
					is_sell_hand: options?.isSell,
					volume_sell: volumeSell,
					is_use_chart_action: isUseChartAction,
				};
				if (options?.isTrade) {
					stopTradeFast(
						data,
						async (res: any) => {
							setIsLoading(false);
							addToast(
								<Toasts
									title='Update notifications'
									iconColor='success'
									icon='TaskAlt'
									isDismiss>
									Dừng mua/bán tay thành công
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
							setIsOpen(false);
							if (getData) {
								getData();
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
									{res?.data?.message}
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
						},
					);
				} else if (options?.isBuy) {
					buyFast(
						data,
						async (res: any) => {
							setIsLoading(false);
							addToast(
								<Toasts
									title='Update notifications'
									iconColor='success'
									icon='TaskAlt'
									isDismiss>
									Đang tiến hành mua cổ phiếu
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
							setIsOpen(false);
							if (getData) {
								getData();
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
									{res?.data?.message}
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
						},
					);
				} else {
					sellFast(
						data,
						async (res: any) => {
							setIsLoading(false);
							addToast(
								<Toasts
									title='Update notifications'
									iconColor='success'
									icon='TaskAlt'
									isDismiss>
									Đang tiến hành bán cổ phiếu
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
							setIsOpen(false);
							if (getData) {
								getData();
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
									{res?.data?.message}
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
						},
					);
				}
			} else {
				if (isOpenEdit) {
					handleSaveConfig();
				} else {
					const data = {
						stock_id: info?.stock_id,
						account_name: info?.account_vps,
					};
					daleteConfig(
						data,
						(data: any) => {
							setIsLoading(false);
							addToast(
								<Toasts
									title='Create notifications'
									iconColor='success'
									icon='TaskAlt'
									isDismiss>
									Delete config successfully
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
							setIsOpen(false);
							if (getData) {
								getData();
							}
						},
						(data: any) => {
							setIsLoading(false);
							addToast(
								<Toasts
									title='Create notifications'
									icon='Cancel'
									iconColor='danger'
									isDismiss>
									Configurations updated failed
								</Toasts>,
								{
									autoDismiss: true,
								},
							);
						},
					);
				}
			}
			setIsOpen(false);
		},
	});

	const handleMarginPercentage = (value: number) => {
		if (value > 100) {
			value = 100;
		}
		if (value < 0) {
			value = 0;
		}
		setMarginPercentage(value);
	};

	useEffect(() => {
		async function fetchData() {
			setAmountBuy(info?.volume_to_buy);
			setActiveBuy(info?.is_use_price_to_buy);
			setAmountActiveBuy(info?.price_to_buy_now);
			setCutLoss(info?.is_use_stoploss);
			setTakeProfit(info?.is_use_takeprofit);
			setLevel(info?.level);
		}
		fetchData();
	}, [setIsOpen, info]);

	useEffect(() => {
		if (isOpen) {
			setIsUseChartAction(true);
		}
	}, [isOpen]);
	return (
		<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
			<ModalHeader setIsOpen={cancelModal} className='p-4'>
				{options?.isOpen ? (
					<ModalTitle id='add-account'>
						Xác nhận {options?.isTrade ? 'Hủy Mua/Bán' : options?.isBuy ? 'Mua' : 'Bán'}{' '}
					</ModalTitle>
				) : (
					<ModalTitle id='add-account'>
						Xác nhận {isOpenEdit ? 'chỉnh sửa' : 'xoá'}{' '}
					</ModalTitle>
				)}
			</ModalHeader>
			<ModalBody className='px-4 pb-5 modal-create-account'>
				<div className='row g-4'>
					<div className='col-md-6'>
						<FormGroup id='account_name' label='Mã chứng khoán' isFloating>
							<Input
								style={{ color: 'green' }}
								placeholder='text'
								autoComplete='additional-name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={info?.stock_name}
								isValid={formik?.isValid}
								isTouched={formik?.touched.account}
								invalidFeedback={formik?.errors.account}
								validFeedback='Looks good!'
								disabled={true}
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup id='account_num' label='Tài khoản VPS' isFloating>
							<Input
								type='text'
								placeholder='Mã OTP'
								autoComplete='additional-name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={info?.account_vps}
								isValid={formik?.isValid}
								isTouched={formik?.touched.otp}
								invalidFeedback={formik?.errors.otp}
								disabled={true}
							/>
						</FormGroup>
					</div>
					{options?.isOpen && options?.isSell && !options?.isTrade && (
						<>
							<div>
								<FormGroup id='volume_sell'>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label
											htmlFor='volume_sell'
											style={{ minWidth: '150px', marginBottom: 0 }}>
											Khối lượng cần bán
										</label>
										<div
											style={{
												position: 'relative',
												display: 'inline-block',
											}}>
											<select
												id='volume_sell'
												className='form-control'
												style={{
													appearance: 'none',
													WebkitAppearance: 'none',
													MozAppearance: 'none',
													paddingRight: '30px',
													minWidth: '110px',
													width: 'auto',
												}}
												value={volumeSell}
												onChange={(e) => setVolumeSell(e.target.value)}>
												<option value='all'>Bán hết</option>
												<option value='half'>Bán một nửa</option>
											</select>
											<span
												style={{
													position: 'absolute',
													right: '6px',
													top: '50%',
													transform: 'translateY(-50%)',
													pointerEvents: 'none',
													fontSize: '12px',
													color: '#666',
												}}>
												▼
											</span>
										</div>
									</div>
								</FormGroup>
							</div>
							<div>
								<FormGroup id='sell_method'>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label
											htmlFor='sell_method'
											style={{ minWidth: '150px', marginBottom: 0 }}>
											Chọn hình thức bán
										</label>
										<div
											style={{
												position: 'relative',
												display: 'inline-block',
											}}>
											<select
												id='sell_method'
												className='form-control'
												style={{
													appearance: 'none',
													WebkitAppearance: 'none',
													MozAppearance: 'none',
													paddingRight: '30px',
													minWidth: '110px',
													width: 'auto',
												}}
												value={isUseChartAction ? 'chart' : 'immediate'}
												onChange={(e) =>
													setIsUseChartAction(e.target.value === 'chart')
												}>
												<option value='chart'>Bán theo Chart</option>
												<option value='immediate'>Bán ngay</option>
											</select>
											<span
												style={{
													position: 'absolute',
													right: '6px',
													top: '50%',
													transform: 'translateY(-50%)',
													pointerEvents: 'none',
													fontSize: '12px',
													color: '#666',
												}}>
												▼
											</span>
										</div>
									</div>
								</FormGroup>
							</div>
						</>
					)}
					{options?.isOpen && options?.isBuy && !options?.isTrade && (
						<>
							<div className='col-12'>
								<FormGroup id='buy_method'>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label
											htmlFor='buy_method'
											style={{ minWidth: '150px', marginBottom: 0 }}>
											Chọn hình thức mua
										</label>
										<div
											style={{
												position: 'relative',
												display: 'inline-block',
											}}>
											<select
												id='buy_method'
												className='form-control'
												style={{
													appearance: 'none',
													WebkitAppearance: 'none',
													MozAppearance: 'none',
													paddingRight: '30px',
													minWidth: '110px',
													width: 'auto',
												}}
												value={isUseChartAction ? 'chart' : 'immediate'}
												onChange={(e) =>
													setIsUseChartAction(e.target.value === 'chart')
												}>
												<option value='chart'>Mua theo Chart</option>
												<option value='immediate'>Mua ngay</option>
											</select>
											<span
												style={{
													position: 'absolute',
													right: '6px',
													top: '50%',
													transform: 'translateY(-50%)',
													pointerEvents: 'none',
													fontSize: '12px',
													color: '#666',
												}}>
												▼
											</span>
										</div>
									</div>
								</FormGroup>
							</div>
						</>
					)}
					{isOpenEdit && (
						<>

							<div className='col-md-6'>
								<FormGroup id='account' label='KHỐI LƯỢNG MUA DỰ KIẾN ' isFloating>
									<Input
										type='number'
										placeholder='Số lượng'
										autoComplete='volume'
										min={0}
										onChange={(e: any) => {
											setAmountBuy(e.target.value);
										}}
										value={amountBuy}
										style={{ width: '100%' }}
									/>
								</FormGroup>
							</div>


							<div className='col-md-6'>
								<FormGroup id='otp' label='LEVEL' isFloating>
									<Input
										type='number'
										placeholder='Level'
										autoComplete='level'
										min={0}
										onChange={(e: any) => {
											setLevel(e.target.value);
										}}
										style={{ width: '100%' }}
										value={level}
									/>
								</FormGroup>
							</div>

							<div className='col-md-6'>
								<Button
									icon={isLoading ? undefined : 'Run'}
									isLight
									color={'warning'}
									className='mb-3 col-12'
									onClick={() => {
										router.push(`/edit-config/following?id=` + info?.stock_id);
									}}>
									Theo dõi điều kiện mua bán
								</Button>
							</div>
							<div className='col-md-6'>
								<Button
									color='warning'
									className='mb-3 col-12'
									isLight
									onClick={() => {
										router.push(`/edit-config/trading?id=` + info?.stock_id);
									}}>
									Theo dõi hành động mua bán
								</Button>
							</div>
						</>
					)}
				</div>
				<div className='d-flex align-items-center justify-content-center mt-5'>
					<Button color='primary' icon='TaskAlt' onClick={formik?.handleSubmit}>
						Confirm
					</Button>
				</div>
			</ModalBody >
		</Modal >
	);
};

export default ModalDelete;
