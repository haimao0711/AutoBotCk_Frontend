import React, { FC, useCallback, useEffect, useState, useContext } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import { useFormik } from 'formik';
import Toasts from '@components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';
import { Visibility, VisibilityOff } from '@components/icon/material-icons';
import AuthContext from '@context/authContext';
import authServices from '@services/auth.services';
import md5 from 'crypto-js/md5';
import Icon from '@components/icon/Icon';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen: () => void;
}

interface IValidate {
	email: string;
	nav: string;
}

const EditProfileModal: FC<IAddAccountModalProps> = ({ isOpen, setIsOpen }) => {
	const { addToast } = useToasts();
	const { userName, accountName, accountNum, limitNumberStocks } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const togglePassword = () => setShowPassword((prev) => !prev);
	const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
	interface IValues {
		userName: string;
		accountName: string;
		accountNum: string;
		limitNumberStocks: number;
		accountPassword?: string;
		confirmPassword?: string;
	}
	const { setValues, ...formik } = useFormik({
		initialValues: {
			userName: userName,
			accountName: accountName,
			accountNum: accountNum,
			limitNumberStocks: limitNumberStocks,
			accountPassword: '',
			confirmPassword: '',
		},
		validate: (values) => {
			const errors: Partial<IValues> = {};

			if (values.accountPassword && values.accountPassword.length < 8) {
				errors.accountPassword = 'Mật khẩu phải tối thiểu 8 ký tự';
			}

			if (values.accountPassword !== values.confirmPassword) {
				errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			const baseData: any = {
				name: values?.accountName,
				account_num: values?.accountNum,
				limit_number_stocks: values?.limitNumberStocks,
				account_password: md5(values.accountPassword).toString(),
			};

			try {
				const resUpdate = await authServices.updateProfile(baseData);

				if (resUpdate) {
					addToast(
						<Toasts title='Thông báo' iconColor='success' icon='TaskAlt' isDismiss>
							Cập nhật tài khoản thành công
						</Toasts>,
						{ autoDismiss: true },
					);
					setTimeout(() => {
						setIsOpen;
					}, 500);
				} else {
					addToast(
						<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
							Cập nhật tài khoản thất bại
						</Toasts>,
						{ autoDismiss: true },
					);
				}
			} catch (error: any) {
				const errorMsg = error?.error?.message || 'Đã xảy ra lỗi không xác định';

				addToast(
					<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
						{errorMsg}
					</Toasts>,
					{ autoDismiss: true },
				);
			}
		},
	});
	useEffect(() => {
		setValues({
			userName: userName || '',
			accountName: accountName || '',
			accountNum: accountNum || '',
			limitNumberStocks: limitNumberStocks || '0',
			accountPassword: '',
			confirmPassword: '',
		});
	}, [userName, accountName, accountNum, limitNumberStocks, setValues]);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id='edit-profile'>{'Chỉnh sửa thông tin tài khoản VPS'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4 pb-5 modal-create-account'>
				<div className='row g-4 px-4	'>
					<div className='col-md-6'>
						<FormGroup label='Tên tài khoản'>
							<Input
								id='userame'
								placeholder='Vui lòng nhập tên tài khoản'
								autoComplete='additional-name'
								onBlur={formik?.handleBlur}
								value={formik?.values?.userName}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Tài khoản VPS'>
							<Input
								id='accountName'
								placeholder='Vui lòng nhập số tài khoản'
								autoComplete='additional-name'
								onBlur={formik?.handleBlur}
								value={formik?.values.accountName}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Loại tài khoản VPS'>
							<div className='position-relative' style={{ minHeight: '54px' }}>
								<Input
									placeholder='Vui lòng nhập loại tài khoản VPS'
									id='accountName'
									autoComplete='additional-name'
									// onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									value={formik?.values.accountNum}
									isValid={formik?.isValid}
									validFeedback='Looks good!'
								/>
							</div>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Giới hạn số mã cổ phiếu tối đa'>
							<Input
								id='limitNumberStocks'
								type='number'
								placeholder='Nhập số mã cổ phiếu'
								autoComplete='additional-name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values.limitNumberStocks}
								isValid={formik?.isValid}
								isTouched={formik?.touched.limitNumberStocks}
								invalidFeedback={formik?.errors.limitNumberStocks}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Cập nhật mật khẩu tài khoản VPS'>
							<div className='position-relative'>
								<Input
									id='accountPassword'
									type={showPassword ? 'text' : 'password'}
									name='accountPassword'
									placeholder='********'
									autoComplete='new-password'
									value={formik?.values.accountPassword}
									isTouched={formik?.touched.accountPassword}
									invalidFeedback={formik?.errors.accountPassword}
									isValid={formik?.isValid}
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
								/>
								<button
									type='button'
									onClick={togglePassword}
									style={{
										position: 'absolute',
										right: '36px',
										top: '25%',
										background: 'transparent',
										border: 'none',
										padding: 0,
										cursor: 'pointer',
										lineHeight: 0,
									}}>
									<Icon
										icon={showPassword ? 'Visibility' : 'VisibilityOff'}
										className='btn-icon'
									/>
								</button>
							</div>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Nhập lại mật khẩu cập nhật'>
							<div className='position-relative'>
								<Input
									id='confirmPassword'
									type={showConfirmPassword ? 'text' : 'password'}
									name='confirmPassword'
									placeholder='********'
									autoComplete='new-password'
									value={formik.values.confirmPassword}
									isTouched={formik.touched.confirmPassword}
									invalidFeedback={formik.errors.confirmPassword}
									isValid={formik.isValid}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<button
									type='button'
									onClick={toggleConfirmPassword}
									style={{
										position: 'absolute',
										right: '36px',
										top: '25%',
										background: 'transparent',
										border: 'none',
										padding: 0,
										cursor: 'pointer',
										lineHeight: 0,
									}}>
									<Icon
										icon={showConfirmPassword ? 'Visibility' : 'VisibilityOff'}
										className='btn-icon'
									/>
								</button>
							</div>
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

export default EditProfileModal;
