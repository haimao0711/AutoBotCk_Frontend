import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { useGetAccountVpsDetails, useGetUpdateAccountVps } from '@hooks/useGetCreateConfig';
import { Visibility, VisibilityOff } from '@components/icon/material-icons';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	accountId: number;
}

interface IValues {
	name: string;
	email: string;
	password: string;
	pre_password: string;
	otp: boolean;
	used_margin_account: boolean;
	amount_margin_account: string;
	used_normal_account: boolean;
	amount_normal_account: string;
	limits: number;
}

interface IValidate {
	email: string;
	nav: string;
}

const EditAccountModal: FC<IAddAccountModalProps> = ({ isOpen, setIsOpen, accountId }) => {
	const { addToast } = useToasts();
	const [hiddenPassword, setHiddenPassword] = useState(true);
	const [hiddenPrePassword, setHiddenPrePassword] = useState(true);
	const cancelModal: any = (value: boolean) => {
		setIsOpen(value);
		formik.resetForm();
		formik.setTouched({}, false);
	};
	const { data, error, loading, getData: getAccountVpsDetials } = useGetAccountVpsDetails();
	const updateUser = useGetUpdateAccountVps();
	const { setValues, ...formik } = useFormik({
		initialValues: {
			name: data?.alias,
			email: data?.name,
			password: '',
			pre_password: '',
			otp: data?.is_need_otp || false,
			used_margin_account: data?.margin_account.valid || false,
			amount_margin_account: data?.margin_account?.amount || 0,
			used_normal_account: data?.normal_account.valid || false,
			amount_normal_account: data?.normal_account?.amount || 0,
			limits: data?.limits || 0,
		},
		validate: (values: IValues) => {
			const errors: IValidate | any = {};

			if (!values?.email || values?.email?.length < 6) {
				errors.email = 'Tài khoản tối thiếu 6 kí tự';
			}
			if (values.pre_password && values.pre_password != values.password) {
				errors.pre_password = 'Nhập lại mật khẩu không trùng khớp';
			}
			if (values.used_normal_account && !values.amount_normal_account) {
				errors.amount = 'Vui lòng nhập số tiền cấp tài khoản thường';
			}

			if (values.used_margin_account && !values.amount_margin_account) {
				errors.amount_bot = 'Vui lòng nhập số tiền cấp cho tài khoản margin';
			}

			return errors;
		},
		onSubmit: (values) => {
			const baseData: any = {
				account_id: data?.id,
				account_password: values?.password ? values?.password : data?.account_pasword,
				account_alias_name: values?.name,
				account_exchange: 'vps',
				limits: values?.limits,
			};

			baseData['normal_account'] = {
				valid: values.used_normal_account,
				amount: values.amount_normal_account,
			};
			baseData['margin_account'] = {
				valid: values.used_margin_account,
				amount: values.amount_margin_account,
			};

			updateUser(
				baseData,
				(data: any) => {
					if (data) {
						addToast(
							<Toasts
								title='Create notifications'
								iconColor='success'
								icon='TaskAlt'
								isDismiss>
								Cập nhật tài khoản thành công
							</Toasts>,
							{
								autoDismiss: true,
							},
						);
						setTimeout('1000');
						cancelModal(false);
						setIsOpen(false);
					}
				},
				(data: any) => {
					addToast(
						<Toasts
							title='Create notifications'
							icon='Cancel'
							iconColor='danger'
							isDismiss>
							Cập nhật tài khoản thất bại
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
				},
			);
		},
	});

	const handleChange = (event: any) => {
		const { value } = event.target;
		if (value === '' || /^[0-9]*$/.test(value)) {
			formik.handleChange(event);
		}
	};

	useEffect(() => {
		getAccountVpsDetials({ id: accountId });
	}, [getAccountVpsDetials, accountId, isOpen]);

	useEffect(() => {
		if (data) {
			setValues({
				name: data?.alias,
				email: data?.name,
				password: '',
				pre_password: '',
				otp: data?.is_need_otp || false,
				used_margin_account: data?.margin_account.valid || false,
				amount_margin_account: data?.margin_account?.amount || 0,
				used_normal_account: data?.normal_account.valid || false,
				amount_normal_account: data?.normal_account?.amount || 0,
				limits: data?.limits || 0,
			});
		}
	}, [data, setValues]);

	if (loading) {
		return (
			<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
				<ModalHeader setIsOpen={cancelModal} className='p-4'>
					<ModalTitle id='add-account'>{'Chỉnh sửa thông tin tài khoản VPS'}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4 pb-5 modal-create-account'>"Loading..."</ModalBody>
			</Modal>
		);
	}

	// if (error) {
	// 	addToast(
	// 		<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
	// 			Đã xảy ra lỗi, vui lòng thử lại
	// 		</Toasts>,
	// 		{
	// 			autoDismiss: true,
	// 		},
	// 	);
	// 	return (
	// 		<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
	// 			<ModalHeader setIsOpen={cancelModal} className='p-4'>
	// 				<ModalTitle id='add-account'>{'Chỉnh sửa thông tin tài khoản VPS'}</ModalTitle>
	// 			</ModalHeader>
	// 			<ModalBody className='px-4 pb-5 modal-create-account'>"Loading..."</ModalBody>
	// 		</Modal>
	// 	);
	// }

	return (
		<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
			<ModalHeader setIsOpen={cancelModal} className='p-4'>
				<ModalTitle id='add-account'>{'Chỉnh sửa thông tin tài khoản VPS'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4 pb-5 modal-create-account'>
				<div className='row g-4 px-4	'>
					<div className='col-md-6'>
						<FormGroup label='Tên tài khoản'>
							<Input
								id='name'
								placeholder='Vui lòng nhập tên tài khoản'
								autoComplete='additional-name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values?.name}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Tài khoản'>
							<Input
								id='email'
								placeholder='Vui lòng nhập số tài khoản'
								autoComplete='additional-name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values.email}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
								disabled={true}
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Mật khẩu tài khoản VPS'>
							<div className='position-relative' style={{ minHeight: '54px' }}>
								<Input
									placeholder='Vui lòng nhập mật khẩu vps'
									type={hiddenPassword ? 'password' : 'text'}
									id='password'
									autoComplete='additional-name'
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values.password}
									isValid={formik?.isValid}
									isTouched={formik?.touched.password}
									invalidFeedback={formik?.errors.password}
									validFeedback='Looks good!'
								/>
								{hiddenPassword ? (
									<Visibility
										onClick={() => setHiddenPassword(false)}
										style={{
											fontSize: '20px',
											transform: 'translate(-50%, -50%)',
											position: 'absolute',
											right: '32px',
											top: '32%',
											cursor: 'pointer',
										}}
									/>
								) : (
									<VisibilityOff
										onClick={() => setHiddenPassword(true)}
										style={{
											fontSize: '20px',
											transform: 'translate(-50%, -50%)',
											position: 'absolute',
											right: '32px',
											top: '32%',
											cursor: 'pointer',
										}}
									/>
								)}
							</div>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Nhập lại mật khẩu tài khoản VPS'>
							<div className='position-relative' style={{ minHeight: '54px' }}>
								<Input
									placeholder='Vui lòng nhập lại mật khẩu VPS'
									type={hiddenPrePassword ? 'password' : 'text'}
									id='pre_password'
									autoComplete='additional-name'
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values.pre_password}
									isValid={formik?.isValid}
									isTouched={formik?.touched.pre_password}
									invalidFeedback={formik?.errors.pre_password}
									validFeedback='Looks good!'
								/>
								{hiddenPrePassword ? (
									<Visibility
										onClick={() => setHiddenPrePassword(false)}
										style={{
											fontSize: '20px',
											transform: 'translate(-50%, -50%)',
											position: 'absolute',
											right: '32px',
											top: '32%',
											cursor: 'pointer',
										}}
									/>
								) : (
									<VisibilityOff
										onClick={() => setHiddenPrePassword(true)}
										style={{
											fontSize: '20px',
											transform: 'translate(-50%, -50%)',
											position: 'absolute',
											right: '32px',
											top: '32%',
											cursor: 'pointer',
										}}
									/>
								)}
							</div>
						</FormGroup>
					</div>

					<div className='col-md-6'>
						<FormGroup label='Sử dụng tài khoản thường' className='col-lg-3 col-6 mb-4'>
							<Checks
								id='used_normal_account'
								type='switch'
								label='Active'
								onChange={formik?.handleChange}
								checked={formik?.values.used_normal_account}
								ariaLabel='status'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						{formik?.values.used_normal_account ? (
							<FormGroup label='Tiền cấp tài khoản thường'>
								<Input
									id='amount_normal_account'
									type='number'
									placeholder='Nhập số tiền cấp tài khoản'
									autoComplete='additional-name'
									onChange={handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values.amount_normal_account}
									isValid={formik?.isValid}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						) : (
							<div style={{ display: 'none' }}></div>
						)}
					</div>
					<div className='col-md-6'>
						<FormGroup label='Sử dụng tài khoản margin' className='col-lg-3 col-6 mb-4'>
							<Checks
								id='used_margin_account'
								type='switch'
								label='Active'
								onChange={formik?.handleChange}
								checked={formik?.values.used_margin_account}
								ariaLabel='status'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						{formik?.values.used_margin_account ? (
							<FormGroup label='Tiền cấp tài khoản margin'>
								<Input
									id='amount_margin_account'
									type='number'
									placeholder='Nhập số tiền cấp tài khoản'
									autoComplete='additional-name'
									onChange={handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values.amount_margin_account}
									isValid={formik?.isValid}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						) : (
							<div style={{ display: 'none' }}></div>
						)}
					</div>
					<div className='col-md-6'>
						<FormGroup label='Số mã cổ phiếu tối đa mua'>
							<Input
								id='limits'
								type='number'
								placeholder='Nhập số mã cổ phiếu'
								autoComplete='additional-name'
								onChange={handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values.limits}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
				</div>

				<div className='d-flex align-items-center justify-content-center mt-5'>
					<Button color='primary' icon='TaskAlt' onClick={formik?.handleSubmit}>
						{'Chỉnh sửa tài khoản'}
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default EditAccountModal;
