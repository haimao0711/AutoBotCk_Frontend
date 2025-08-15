import React, { FC, useCallback, useEffect, useState, useContext } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import { useFormik } from 'formik';
import Toasts from '@components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';
import Icon from '@components/icon/Icon';
import { Visibility, VisibilityOff } from '@components/icon/material-icons';
import AuthContext from '@context/authContext';
import authServices from '@services/auth.services';
import md5 from 'crypto-js/md5';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen: () => void;
}

const ChangePassBotModal: FC<IAddAccountModalProps> = ({ isOpen, setIsOpen }) => {
	const { addToast } = useToasts();
	const { userName } = useContext(AuthContext);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const toggleOldPassword = () => setShowOldPassword((prev) => !prev);
	const togglePassword = () => setShowPassword((prev) => !prev);
	const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
	interface IValues {
		userName: string;
		oldPassword: string;
		newPassword?: string;
		confirmPassword?: string;
	}
	const { setValues, ...formik } = useFormik({
		initialValues: {
			userName: userName,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		validate: (values) => {
			const errors: Partial<IValues> = {};
			if (!values.oldPassword) {
				errors.oldPassword = 'Không được bỏ trống';
			}
			if (!values.newPassword) {
				errors.newPassword = 'Không được bỏ trống';
			}
			if (values.newPassword && values.newPassword.length < 8) {
				errors.newPassword = 'Mật khẩu phải tối thiểu 8 ký tự';
			}

			if (values.newPassword !== values.confirmPassword) {
				errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
			}

			return errors;
		},
		validateOnMount: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			const baseData: any = {
				old_password: values?.oldPassword,
				new_password: values.newPassword,
			};
			console.log('check data change password bot: ', baseData);
			try {
				const resUpdate = await authServices.changePassBot(baseData);
				if (resUpdate) {
					addToast(
						<Toasts title='Thông báo' iconColor='success' icon='TaskAlt' isDismiss>
							Đổi mật khẩu Bot thành công
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
					setTimeout(() => {
						setIsOpen; // đóng modal
					}, 1000);
				} else {
					addToast(
						<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
							Đổi mật khẩu Bot thất bại
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
				}
			} catch (error: any) {
				const errorMsg = error?.error?.message || 'Đã xảy ra lỗi không xác định';

				addToast(
					<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
						{errorMsg}
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			}
		},
	});

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg'>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id='change-pass-bot'>{'Đổi mật khẩu bot'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4 pb-5 modal-create-account'>
				<div className='row g-4 px-4	'>
					<div className='col-md-6'>
						<FormGroup label='Tên tài khoản'>
							<Input
								id='userame'
								placeholder='Vui lòng nhập tên tài khoản'
								autoComplete='additional-name'
								// onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={formik?.values?.userName}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Mật khẩu cũ'>
							<div className='position-relative'>
								<Input
									id='oldPassword'
									type={showOldPassword ? 'text' : 'password'}
									name='oldPassword'
									placeholder='********'
									autoComplete='old-password'
									value={formik?.values.oldPassword}
									isTouched={formik?.touched.oldPassword}
									invalidFeedback={formik?.errors.oldPassword}
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									validFeedback='Looks good!'
								/>
								<button
									type='button'
									onClick={toggleOldPassword}
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
										icon={showOldPassword ? 'Visibility' : 'VisibilityOff'}
										className='btn-icon'
									/>
								</button>
							</div>
						</FormGroup>
					</div>
					<div className='col-md-6'>
						<FormGroup label='Mật khẩu mới'>
							<div className='position-relative'>
								<Input
									id='newPassword'
									type={showPassword ? 'text' : 'password'}
									name='newPassword'
									placeholder='********'
									autoComplete='new-password'
									value={formik?.values.newPassword}
									isTouched={formik?.touched.newPassword}
									invalidFeedback={formik?.errors.newPassword}
									isValid={formik?.isValid}
									onChange={formik?.handleChange}
									onBlur={formik?.handleBlur}
									validFeedback='Looks good!'
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
						<FormGroup label='Nhập lại mật mới'>
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
									validFeedback='Looks good!'
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

export default ChangePassBotModal;
