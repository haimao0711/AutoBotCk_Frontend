import React, { FC, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import AuthContext from '@context/authContext';
import { useFormik } from 'formik';
import Toasts from '@components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';

import { authService } from '@services/index';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	account?: any;
	isTrading: boolean;
	onChangeStatusTrading: () => void;
}

interface IValues {
	account: string;
	otp: string;
}

interface IValidate {
	account: string;
	otp: string;
}

const ModalConfirm: FC<IAddAccountModalProps> = ({
	isOpen,
	setIsOpen,
	account,
	isTrading,
	onChangeStatusTrading,
}) => {
	const { addToast } = useToasts();
	const { accountNum } = useContext(AuthContext);
	const cancelModal: any = (value: boolean) => {
		setIsOpen(value);
		formik.resetForm();
		formik.setTouched({}, false);
	};

	const onSubmit = async (values: any) => {
		const data = {
			vps_account: account?.account_name,
			otp: values.otp,
			isTrading,
		};
		// authService.updateOtp(data);
		const respon = await authService.updateOtp(data);
		if (respon.data.status == 1) {
			onChangeStatusTrading();
			addToast(
				<Toasts title='Create notifications' iconColor='success' icon='TaskAlt' isDismiss>
					Gửi mã OTP thành công!
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
			setTimeout('1000');
			cancelModal(false);
		} else if (respon.data.status == 2) {
			onChangeStatusTrading();
			addToast(
				<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
					{respon.data.message || respon.errors.message}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
			setTimeout('1000');
			cancelModal(false);
		} else {
			addToast(
				<Toasts title='Create notifications' icon='Cancel' iconColor='danger' isDismiss>
					{respon.data.message || respon.errors.message}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
			setTimeout('1000');
			cancelModal(false);
		}
	};
	const { setValues, ...formik } = useFormik({
		initialValues: {
			account: '',
			otp: '',
		},
		validate: (values: IValues) => {
			const errors: IValidate | any = {};
			if (!values?.otp.toString().length) {
				errors.otp = 'Vui lòng nhập mã OTP';
			}
			if (values?.otp.toString().length !== 6) {
				errors.otp = 'Vui lòng nhập đúng 6 số của mã OTP';
			}
			return errors;
		},
		onSubmit: onSubmit,
	});
	return (
		<div>
			{!isTrading ? (
				<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
					<ModalHeader setIsOpen={cancelModal} className='p-4'>
						<ModalTitle id='add-account'>Confirm OTP</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4 pb-5 modal-create-account'>
						<div className='row g-4'>
							<div className='col-md-6'>
								<FormGroup id='account' label='Tài khoản' isFloating>
									<Input
										placeholder='text'
										autoComplete='additional-name'
										onChange={formik?.handleChange}
										onBlur={formik?.handleBlur}
										value={accountNum}
										isValid={formik?.isValid}
										isTouched={formik?.touched.account}
										invalidFeedback={formik?.errors.account}
										validFeedback='Looks good!'
										disabled={true}
									/>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup id='otp' label='Mã OTP' isFloating>
									<Input
										type='text'
										placeholder='Mã OTP'
										autoComplete='additional-name'
										onChange={formik?.handleChange}
										onBlur={formik?.handleBlur}
										value={formik?.values.otp}
										isValid={formik?.isValid}
										isTouched={formik?.touched.otp}
										invalidFeedback={formik?.errors.otp}
									/>
								</FormGroup>
							</div>
						</div>

						<div className='d-flex align-items-center justify-content-center mt-5'>
							<Button color='primary' icon='TaskAlt' onClick={formik?.handleSubmit}>
								Confirm
							</Button>
						</div>
					</ModalBody>
				</Modal>
			) : (
				<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
					<ModalHeader setIsOpen={cancelModal} className='p-4'>
						<ModalTitle id='add-account'>Cancel Trading</ModalTitle>
					</ModalHeader>
					<ModalBody className='px-4 pb-5 modal-create-account'>
						<div> Bạn có xác nhận dừng trading không?</div>
						<div className='d-flex align-items-center justify-content-center mt-5 gap-3'>
							<Button
								color='primary'
								icon='CheckCircle'
								onClick={(e) => {
									onSubmit(e);
								}}>
								Yes
							</Button>
							<Button color='primary' icon='Cancel' onClick={setIsOpen}>
								No
							</Button>
						</div>
					</ModalBody>
				</Modal>
			)}
		</div>
	);
};

export default ModalConfirm;
