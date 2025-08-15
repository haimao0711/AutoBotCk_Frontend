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
	useGetAccountVps,
	useGetCreateAccountVps,
	useGetUpdateAccountVps,
} from '@hooks/useGetCreateConfig';
import { authService } from '@services/index';

interface IAddAccountModalProps {
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	account?: any;
}

interface IValues {
	account: string;
	otp: number;
}

interface IValidate {
	account: string;
	otp: string;
}

const ModalConfirm: FC<IAddAccountModalProps> = ({ isOpen, setIsOpen, account }) => {
	const { addToast } = useToasts();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listAccount, setListAccount] = useState([]);
	const cancelModal: any = (value: boolean) => {
		setIsOpen(value);
		formik.resetForm();
		formik.setTouched({}, false);
	};

	useEffect(() => {
		async function fetchAccount() {
			setListAccount(account);
		}
		fetchAccount();

		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { setValues, ...formik } = useFormik({
		initialValues: {
			account: '',
			otp: 0,
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
		onSubmit: async (values) => {
			const data = {
				vps_account: account?.account_name,
				otp: values.otp,
			};
			// authService.updateOtp(data);
			const respon = await authService.updateOtp(data);
			if (!respon.status_code) {
				console.log('respon', respon);
				addToast(
					<Toasts
						title='Create notifications'
						iconColor='success'
						icon='TaskAlt'
						isDismiss>
						Gửi mã OTP thành công
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
						{respon.errors.message}
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			}
		},
	});

	return (
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
								value={formik?.values.account || account?.account_name}
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
								type='number'
								placeholder='Mã OTP'
								min={0}
								max={999999}
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
	);
};

export default ModalConfirm;
