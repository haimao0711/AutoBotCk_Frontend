import Icon from '../../components/icon/Icon';
import dayjs from 'dayjs';
import useDarkMode from '../../hooks/useDarkMode';
import { useContext, useEffect, FC, useState, useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import showNotification from '../../components/extras/showNotification';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Input from '../../components/bootstrap/forms/Input';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Spinner from '@components/bootstrap/Spinner';
import Button from '@components/bootstrap/Button';
import Select from '@components/bootstrap/forms/Select';
import USERS from '@common/data/userDummyData';
import Option from '@components/bootstrap/Option';
import ConfigContext from '@context/configContext';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import { useRouter } from 'next/router';
import { authService } from '@services/index';
import Checks from '@components/bootstrap/forms/Checks';
import { useGetCreateTemplateConfig, useGetUpdateTemplate } from '@hooks/useGetCreateConfig';
import styled from 'styled-components';
import VNIndex from './vnindex';
import Stock from './stock';
import CustomConfig from './custom';
import ModalPrioritize from './prioritize';
import { IBaseConfig, IErrorBaseConfig, IPriorityBase } from './interface';
import { initialValuesBaseConfig } from '../../utils/initialValue';
import { transformConfigData } from '../../utils/transform';

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

type FormType = {
	title: string;
	config: IBaseConfig | undefined;
	setConfig: (config: any) => void;
	setRefetch: (refetch: boolean) => void;
};

export const handleChange = (e: any, formik: any) => {
	const { value } = e.target;

	if (/^-?\d*\.?\d*$/.test(value)) {
		formik?.handleChange(e);
	}
};

const FormConfig = ({ title, config, setRefetch }: FormType) => {
	const router = useRouter();
	const { addToast } = useToasts();
	const createConfig = useGetCreateTemplateConfig();
	const updateConfig = useGetUpdateTemplate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmitFormik = useCallback(
		(values: IBaseConfig) => {
			const data = transformConfigData(values);
			if (config) {
				updateConfig(
					data,
					(data: any) => {
						console.log('check data config update: ', data);
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								iconColor='success'
								icon='TaskAlt'
								isDismiss>
								Cập nhật cài đặt thành công
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
						setRefetch(true);
					},
					(data: any) => {
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								icon='Cancel'
								iconColor='danger'
								isDismiss>
								Cập nhật cài đặt thất bại, vui lòng kiểm tra thông tin
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
					},
				);
			} else {
				createConfig(
					data,
					(data: any) => {
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								iconColor='success'
								icon='TaskAlt'
								isDismiss>
								Created successfully
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
						setRefetch(true);
					},
					(data: any) => {
						setIsLoading(false);
						addToast(
							<Toasts
								title='Create notifications'
								icon='Cancel'
								iconColor='danger'
								isDismiss>
								{data?.error?.message}
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
					},
				);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[config, createConfig, updateConfig],
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
						? 'col-xl-9  col-12'
						: 'col-12'
				}>
				<Card>
					<CardHeader>
						<CardLabel icon='Edit' iconColor='warning'>
							<ButtonBack>
								<CardTitle>
									{title}{' '}
									<Button
										className='ml-3 button-absolute'
										isLight
										color={'warning'}
										style={{ top: '18px', width: '172px' }}
										isDisable={isLoading}
										onClick={() => router.push('/overview')}>
										Quay lại trang chủ
									</Button>
								</CardTitle>
							</ButtonBack>
						</CardLabel>{' '}
					</CardHeader>
					<FormStyled>
						<CardBody className='abc'>
							<div className='row g-4'>
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
								<BoxShadowStyled>
									<CustomConfig formik={formik} />
								</BoxShadowStyled>
							</div>

							<div className='d-flex justify-content-end mt-3'>
								<Button
									className='ml-3'
									icon={isLoading ? undefined : 'Save'}
									isLight
									color={'success'}
									isDisable={isLoading}
									onClick={formik?.handleSubmit}>
									{isLoading && <Spinner isSmall inButton />}
									{config ? 'Sửa' : 'Thêm'}
								</Button>
							</div>
						</CardBody>
					</FormStyled>
				</Card>
			</div>
			<div className='col-xl-3 col-12'>
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
	);
};

export default FormConfig;
