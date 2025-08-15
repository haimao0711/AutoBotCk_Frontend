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
import { useGetCreateAccountVps, useGetUpdateAccountVps } from '@hooks/useGetCreateConfig';
import { Visibility, VisibilityOff } from '@components/icon/material-icons';
import { authService } from '@services/index';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
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
}

interface IValidate {
	email: string;
	nav: string;
}

const AddAccountModal: FC<IAddAccountModalProps> = ({ isOpen, setIsOpen }) => {
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hiddenPassword, setHiddenPassword] = useState(true);
	const [hiddenPrePassword, setHiddenPrePassword] = useState(true);
	const cancelModal: any = (value: boolean) => {
		setIsOpen(value);
		formik.resetForm();
		formik.setTouched({}, false);
	};
	const createUser = useGetCreateAccountVps();
	const { setValues, ...formik } = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			pre_password: '',
			otp: false,
			used_margin_account: false,
			amount_margin_account: '',
			used_normal_account: false,
			amount_normal_account: '',
		},
		validate: (values: IValues) => {
			const errors: IValidate | any = {};

			if (!values?.email || values?.email?.length < 6) {
				errors.email = 'Tài khoản tối thiếu 6 kí tự';
			}
			if (!values.pre_password) {
				errors.pre_password = 'Vui lòng nhập lại mật khẩu';
			}
			if (values.pre_password && values.pre_password != values.password) {
				errors.pre_password = 'Nhập lại mật khẩu không trùng khớp';
			}

			if (!values.password) {
				errors.password = 'Vui lòng nhập mật khẩu';
			}
			if (!values.amount_normal_account) {
				errors.amount = 'Vui lòng nhập số tiền cấp tài khoản thường';
			}

			if (!values.amount_margin_account) {
				errors.amount_bot = 'Vui lòng nhập số tiền cấp cho tài khoản margin';
			}

			return errors;
		},
		onSubmit: (values) => {
			const data = {
				account_name: values.email,
				account_password: values.password,
				is_need_otp: values.otp ? values.otp : false,
				account_alias_name: values.name,
				margin_account: {
					valid: values.used_margin_account,
					amount: values.amount_margin_account,
				},
				normal_account: {
					valid: values.used_normal_account,
					amount: values.amount_normal_account,
				},
				account_exchange: 'vps',
			};

			createUser(
				data,
				(data: any) => {
					if (data) {
						setIsLoading(false);

						addToast(
							<Toasts
								title='Create notifications'
								iconColor='success'
								icon='TaskAlt'
								isDismiss>
								Thêm tài khoản thành công
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
					setIsLoading(false);
					addToast(
						<Toasts
							title='Create notifications'
							icon='Cancel'
							iconColor='danger'
							isDismiss>
							Thêm tài khoản thất bại
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
		// Kiểm tra nếu giá trị nhập vào là số dương
		if (value === '' || /^[0-9]*$/.test(value)) {
			formik.handleChange(event);
		}
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
			<ModalHeader setIsOpen={cancelModal} className='p-4'>
				<ModalTitle id='add-account'>Thêm tài khoản mới</ModalTitle>
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
								value={formik?.values.name}
								isValid={formik?.isValid}
								isTouched={formik?.touched.name}
								invalidFeedback={formik?.errors.name}
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
								isTouched={formik?.touched.email}
								invalidFeedback={formik?.errors.email}
								validFeedback='Looks good!'
								disabled={false}
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
									isTouched={formik?.touched.used_normal_account}
									invalidFeedback={formik?.errors.amount_normal_account}
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
									isTouched={formik?.touched.amount_margin_account}
									invalidFeedback={formik?.errors.amount_margin_account}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						) : (
							<div style={{ display: 'none' }}></div>
						)}
					</div>

					{/* <div className='col-md-6'>
						<FormGroup label='Sử dụng mã OTP' className='col-lg-3 col-6 mb-4'>
							<Checks
								id='otp'
								type='switch'
								label='Active'
								onChange={formik?.handleChange}
								checked={formik?.values.otp}
								ariaLabel='status'
							/>
						</FormGroup>
					</div> */}
					<div className='col-md-6'>
						<FormGroup label='Số mã cổ phiếu tối đa mua'>
							<Input
								id='amount_margin_account'
								type='number'
								placeholder='Nhập số mã cổ phiếu'
								autoComplete='additional-name'
								onChange={handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values.amount_margin_account}
								isValid={formik?.isValid}
								isTouched={formik?.touched.amount_margin_account}
								invalidFeedback={formik?.errors.amount_margin_account}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
				</div>

				<div className='d-flex align-items-center justify-content-center mt-5'>
					<Button color='primary' icon='TaskAlt' onClick={formik?.handleSubmit}>
						{'Thêm tài khoản'}
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default AddAccountModal;
