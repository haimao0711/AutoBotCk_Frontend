import { useState, useCallback, useMemo } from 'react';
import Spinner from '@components/bootstrap/Spinner';
import Button from '@components/bootstrap/Button';
import Select from '@components/bootstrap/forms/Select';
import Option from '@components/bootstrap/Option';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import { useRouter } from 'next/router';
import Checks from '@components/bootstrap/forms/Checks';
import {
	useGetUpdateConfigRun,
	useGetUpdateAllConfigRun,
	useBatchUpdateConfigRun,
} from '@hooks/useGetCreateConfig';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import Input from '@components/bootstrap/forms/Input';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import ConfirmApplyAllModal from '../../overview/ModalCofirmApplyAll';
import VNIndex from '@components/FormConfig/vnindex';
import Stock from '@components/FormConfig/stock';
import CustomConfig from '@components/FormConfig/custom';
import CustomFollowingConfig from '@components/FormConfig/customFollowing';
import ModalPrioritize from '@components/FormConfig/prioritize';
import { IBaseConfig, IErrorBaseConfig, IPriorityBase } from '@components/FormConfig/interface';
import { initialValuesBaseConfig } from '../../../utils/initialValue';
import { transformConfigData } from '../../../utils//transform';
import { times, times_second } from '../../overview/form';

const FormStyled = styled.div`
	.rc-time-picker-panel,
	.rc-time-picker-panel-inner {
		color: red !important;
	}
	.form-check {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		.form-check-input {
			font-size: 21px;
		}
	}
	@media (max-width: 480px) {
		.card-body-mobile {
			padding: 0;
			.abc {
				padding: 8px;
			}
		}
		.form-check {
			display: flex;
			align-items: center;
		}
	}
`;

const BoxShadowStyled = styled.div`
	padding: 12px;
	border-radius: 12px;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
		rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
		rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const ButtonBack = styled.div`
	.button-absolute {
		position: absolute;
	}
	@media (max-width: 480px) {
		.card-title {
			font-size: 10px;
		}
	}
`;
type StockItem = {
	stock_id: string;
	stock_name: string;
	level: string;
};
type FormType = {
	title: string;
	config: IBaseConfig | undefined;
	setConfig: (config: any) => void;
	setRefetch: (refetch: boolean) => void;
};

export const handleChange = (e: any, formik: any) => {
	const { value } = e.target;
	if (/^\d*\.?\d*$/.test(value)) {
		formik?.handleChange(e);
	}
};

const FormConfig = ({ title, config, setRefetch }: FormType) => {
	const router = useRouter();
	const { slug, id } = router.query;
	const { addToast } = useToasts();
	const updateConfig = useGetUpdateConfigRun();
	const updateAllConfig = useGetUpdateAllConfigRun();
	const updateBatchUpConfig = useBatchUpdateConfigRun();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [submitMode, setSubmitMode] = useState<'single' | 'following' | 'trading'>('single');
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [selectedSymbols, setSelectedSymbols] = useState<StockItem[]>([]);

	const handleSubmitFormik = useCallback(
		(values: IBaseConfig) => {
			// Đảm bảo giá trị mặc định 'OFF' cho chart_second và chart_sell_second
			const valuesWithDefaults = {
				...values,
				base: {
					...values.base,
					chart_second: values.base.chart_second || 'OFF',
					chart_sell_second: values.base.chart_sell_second || 'OFF',
				},
			};
			const data = transformConfigData(valuesWithDefaults);
			if (!config) return;
			setIsLoading(true);
			const onSuccess = (data: any) => {
				setIsLoading(false);
				addToast(
					<Toasts
						title='Create notifications'
						iconColor='success'
						icon='TaskAlt'
						isDismiss>
						Cập nhật cài đặt thành công
					</Toasts>,
					{ autoDismiss: true },
				);
				setRefetch(true);
			};
			const onError = (data: any) => {
				setIsLoading(false);
				addToast(
					<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
						Cập nhật cài đặt thất bại, vui lòng kiểm tra thông tin
					</Toasts>,
					{ autoDismiss: true },
				);
			};
			if (submitMode === 'single') {
				updateConfig(data, onSuccess, onError);
			} else {
				// ✅ Xử lý batch update
				const payloadList = selectedSymbols.map((item) => ({
					...data,
					stock_id: item?.stock_id,
					stock_name: '',
				}));
				console.log('check payloadList: ', payloadList);
				// ✅ Gửi batch, mỗi batch 10 mã
				updateBatchUpConfig(payloadList, 10, onSuccess, onError);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[config, updateConfig, submitMode, selectedSymbols],
	);

	const validate = useCallback((values: IBaseConfig) => {
		const errors: IErrorBaseConfig | any = {};

		return errors;
	}, []);

	const initialFormik = useMemo(() => {
		if (config) {
			return config;
		}
		return initialValuesBaseConfig;
	}, [config]);

	const formik = useFormik<IBaseConfig>({
		initialValues: initialFormik,
		enableReinitialize: true,
		validate,
		onSubmit: handleSubmitFormik,
	});

	const handleUpdatePriority = useCallback(
		(prefix: 'vnindex' | 'stock', side: 'buy' | 'sell', key: string, newValue: boolean) => {
			formik.setFieldValue(
				`priority.${prefix}.${side}.${key}_sufficient_condition`,
				newValue,
			);
			formik.setFieldValue(`priority.${prefix}.${side}.${key}_necessary_condition`, newValue);
		},
		[formik],
	);

	return (
		<div className='d-flex flex-wrap'>
			{(submitMode === 'following' || submitMode === 'trading') && (
				<ConfirmApplyAllModal
					isOpen={isConfirmModalOpen}
					selectedSymbols={selectedSymbols}
					setSelectedSymbols={setSelectedSymbols}
					onConfirm={() => {
						setIsConfirmModalOpen(false);
						formik?.handleSubmit();
					}}
					onCancel={() => setIsConfirmModalOpen(false)}
					mode={submitMode}
				/>
			)}
			<div
				className={
					(config?.base.config_is_buy &&
						config?.base.config_is_sell &&
						config?.base.config_is_use_stock_config &&
						config?.base.config_is_use_vnindex_config) ||
					(formik?.values?.base.config_is_buy &&
						(formik?.values?.base.config_is_use_vnindex_config ||
							formik?.values?.base.config_is_use_stock_config)) ||
					(formik?.values?.base.config_is_sell &&
						(formik?.values?.base.config_is_use_vnindex_config ||
							formik?.values?.base.config_is_use_stock_config))
						? 'col-xl-8  col-12'
						: 'col-12'
				}>
				<Card>
					<CardHeader>
						<ButtonBack>
							<CardTitle>
								<div className='d-flex flex-column flex-sm-row justify-content-center align-items-center w-100 gap-3'>
									<CardLabel icon='Edit' iconColor='warning'>
										<div className='mb-1'>
											{`CHỈNH SỬA CẤU HÌNH ${
												slug === 'following' ? 'THEO DÕI' : 'HÀNH ĐỘNG'
											}`}
										</div>
									</CardLabel>
									<Button
										isLight
										color={'warning'}
										style={{
											width: '172px',
										}}
										isDisable={isLoading}
										onClick={() => router.push('/overview')}>
										Quay lại trang chủ
									</Button>
									<Button
										isLight
										color={'warning'}
										style={{ width: '172px' }}
										isDisable={isLoading}
										onClick={() => {
											router.push(
												`/edit-config/${
													slug === 'following' ? 'trading' : 'following'
												}?id=` + id,
											);
										}}>
										Cấu hình
										{slug === 'following' ? ' hành động' : ' theo dõi'}
									</Button>
								</div>
							</CardTitle>
						</ButtonBack>
					</CardHeader>
					<FormStyled>
						<CardBody className='abc'>
							<div className='row g-4'>
								<div className='col-lg-12 d-flex flex-wrap  gap-5 justify-content-start'>
									<FormGroup className='col-lg-3 col-12 mb-4' label='MÃ CỔ PHIẾU'>
										<Input
											id='base.stock_name'
											ariaLabel='Board select'
											placeholder='Chọn mã cổ phiếu'
											onChange={formik.handleChange}
											disabled
											value={formik.values.base.stock_name}
										/>
									</FormGroup>
									<FormGroup
										className='col-lg-3 col-12 mb-4'
										label='CHỌN CHART MUA'>
										<Select
											id='base.chart'
											ariaLabel='Board select'
											placeholder='Chọn chart'
											onChange={formik.handleChange}
											value={formik.values.base.chart}>
											{times?.map((item: any) => {
												return (
													<Option key={item} value={item}>
														{item}
													</Option>
												);
											})}
										</Select>
									</FormGroup>
									<FormGroup
										className='col-lg-3 col-12 mb-4'
										label='CHỌN CHART BÁN'>
										<Select
											id='base.chart_sell'
											ariaLabel='Board select'
											placeholder='Chọn chart'
											onChange={formik.handleChange}
											value={formik.values.base.chart_sell}>
											{times?.map((item: any) => {
												return (
													<Option key={item} value={item}>
														{item}
													</Option>
												);
											})}
										</Select>
									</FormGroup>
									<FormGroup
										label={`SỬ DỤNG CHART ${
											slug === 'following' ? 'THEO DÕI' : 'HÀNH ĐỘNG'
										} THỨ HAI`}
										className='col-lg-3 col-6 mb-4'>
										<Checks
											id='base.config_is_use_candle_second'
											type='switch'
											label='Active'
											onChange={formik.handleChange}
											checked={
												formik?.values.base.config_is_use_candle_second
											}
											ariaLabel='status'
										/>
									</FormGroup>
									{formik?.values.base.config_is_use_candle_second && (
										<>
											<FormGroup
												className='col-lg-3 col-12 mb-4'
												label='CHỌN CHART MUA THỨ HAI'>
												<Select
													id='base.chart_second'
													ariaLabel='Board select'
													placeholder='Chọn chart'
													onChange={formik.handleChange}
													value={
														formik.values.base.chart_second || 'OFF'
													}>
													{times_second?.map((item: any) => {
														return (
															<Option key={item} value={item}>
																{item}
															</Option>
														);
													})}
												</Select>
											</FormGroup>
											<FormGroup
												className='col-lg-3 col-12 mb-4'
												label='CHỌN CHART BÁN THỨ HAI'>
												<Select
													id='base.chart_sell_second'
													ariaLabel='Board select'
													placeholder='Chọn chart'
													onChange={formik.handleChange}
													value={
														formik.values.base.chart_sell_second ||
														'OFF'
													}>
													{times_second?.map((item: any) => {
														return (
															<Option key={item} value={item}>
																{item}
															</Option>
														);
													})}
												</Select>
											</FormGroup>
										</>
									)}
								</div>

								<BoxShadowStyled>
									<div className='col-12 d-flex flex-wrap justify-content-between'>
										<div className='col-12 d-flex flex-wrap flex-wrap align-items-end mb-4 justify-content-around'>
											<FormGroup
												label='SỬ DỤNG CẤU HÌNH VNINDEX'
												className='col-lg-3 col-6 mb-4'>
												<Checks
													id='base.config_is_use_vnindex_config'
													type='switch'
													label='Active'
													onChange={formik.handleChange}
													checked={
														formik?.values.base
															.config_is_use_vnindex_config
													}
													ariaLabel='status'
												/>
											</FormGroup>
											<FormGroup
												label='SỬ DỤNG CẤU HÌNH CỔ PHIẾU'
												className='col-lg-3 col-6 mb-4'>
												<Checks
													id='base.config_is_use_stock_config'
													type='switch'
													label='Active'
													onChange={formik.handleChange}
													checked={
														formik?.values.base
															.config_is_use_stock_config
													}
													ariaLabel='status'
												/>
											</FormGroup>
											<FormGroup
												label='ĐIỀU KIỆN MUA'
												className='col-lg-3 col-6 mb-4'>
												<Checks
													id='base.config_is_buy'
													type='switch'
													label='Active'
													onChange={formik.handleChange}
													checked={formik?.values.base.config_is_buy}
													ariaLabel='status'
												/>
											</FormGroup>
											<FormGroup
												label='ĐIỀU KIỆN BÁN'
												className='col-lg-3 col-6 mb-4'>
												<Checks
													id='base.config_is_sell'
													type='switch'
													label='Active'
													onChange={formik.handleChange}
													checked={formik?.values.base.config_is_sell}
													ariaLabel='status'
												/>
											</FormGroup>
										</div>
									</div>
								</BoxShadowStyled>

								{/* Config true and Buy true */}
								{formik?.values.base.config_is_use_vnindex_config && (
									<BoxShadowStyled>
										<VNIndex
											formik={formik}
											setValues={handleUpdatePriority}
											values={formik.values}
										/>
									</BoxShadowStyled>
								)}
								{formik?.values.base.config_is_use_stock_config && (
									<BoxShadowStyled>
										<Stock
											formik={formik}
											setValues={handleUpdatePriority}
											values={formik.values}
										/>
									</BoxShadowStyled>
								)}
								{slug === 'trading' && (
									<BoxShadowStyled>
										<CustomConfig formik={formik} />
									</BoxShadowStyled>
								)}
								{slug === 'following' && (
									<BoxShadowStyled>
										<CustomFollowingConfig formik={formik} />
									</BoxShadowStyled>
								)}
							</div>

							<div className='d-flex justify-content-end mt-3 gap-3'>
								<Button
									icon={isLoading ? undefined : 'Save'}
									isLight
									color={'success'}
									isDisable={isLoading}
									onClick={formik?.handleSubmit}>
									{isLoading && <Spinner isSmall inButton />}
									{config
										? `Cập nhật cho mã ${formik.values.base.stock_name}`
										: 'Thêm'}
								</Button>
								<Button
									icon={isLoading ? undefined : 'Save'}
									isLight
									color={'success'}
									isDisable={isLoading}
									onClick={() => {
										const chartType = config?.base?.chart_type;
										if (chartType === 'following' || chartType === 'trading') {
											setSubmitMode(chartType);
											setIsConfirmModalOpen(true);
										} else {
											setSubmitMode('single');
											formik?.handleSubmit();
										}
									}}>
									{isLoading && <Spinner isSmall inButton />}
									{config?.base?.chart_type == 'following'
										? `Cập nhật cho các mã khác`
										: 'Cập nhật cho các mã khác'}
								</Button>
							</div>
							<ButtonBack>
								<CardTitle>
									<div className='d-flex flex-sm-row  align-items-center w-100 gap-3 mt-3'>
										<Button
											isLight
											color={'warning'}
											style={{
												width: '172px',
											}}
											isDisable={isLoading}
											onClick={() => router.push('/overview')}>
											Quay lại trang chủ
										</Button>
										<Button
											isLight
											color={'warning'}
											style={{ width: '172px' }}
											isDisable={isLoading}
											onClick={() => {
												router.push(
													`/edit-config/${
														slug === 'following'
															? 'trading'
															: slug === 'trading'
															? 'following'
															: 'overview'
													}?id=` + id,
												);
											}}>
											Cấu hình
											{slug === 'following' ? ' hành động' : ' theo dõi'}
										</Button>
									</div>
								</CardTitle>
							</ButtonBack>
						</CardBody>
					</FormStyled>
				</Card>
			</div>
			<div className='col-xl-4 col-12'>
				<div
					style={{
						position: 'sticky',
						top: '20px',
						maxHeight: '80vh',
						overflow: 'auto',
					}}>
					{(config?.base.config_is_buy &&
						config?.base.config_is_sell &&
						config?.base.config_is_use_vnindex_config &&
						config?.base.config_is_use_stock_config) ||
					(formik?.values?.base.config_is_buy &&
						(formik?.values?.base.config_is_use_vnindex_config ||
							formik?.values?.base.config_is_use_stock_config)) ||
					(formik?.values?.base.config_is_sell &&
						(formik?.values?.base.config_is_use_vnindex_config ||
							formik?.values?.base.config_is_use_stock_config)) ? (
						<ModalPrioritize formik={formik} />
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default FormConfig;
