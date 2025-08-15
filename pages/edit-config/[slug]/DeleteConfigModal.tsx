import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Label from '@components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '@components/bootstrap/forms/Checks';
import { useFormik } from 'formik';
import Toasts from '@components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';
import { useGetCreateUser } from '@hooks/useGetCreateUser';
import Spinner from '@components/bootstrap/Spinner';
import { authService } from '@services/index';
import { useRouter } from 'next/router';
import { useGetDeleteConfig } from '@hooks/useGetCreateConfig';

interface IDeleteConfigProps {
	stocks: any;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

interface IValues {
	name: string;
	volume: number;
	amount_per_volume: number;
	take_profit: number;
	stop_loss: number;
	max_rsi: number;
	min_rsi: number;
	max_stoch_rsi: number;
	min_stoch_rsi: number;
}

interface IValidate {
	email?: string;
	password?: string;
	confirmPassword?: string;
	role?: string;
	firstName?: string;
	lastName?: string;
	otp?: string;
}

const DeleteConfig: FC<IDeleteConfigProps> = ({ stocks, isOpen, setIsOpen }) => {
	const { addToast } = useToasts();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const daleteConfig = useGetDeleteConfig();

	const cancelModal: any = (value: boolean) => {
		setIsOpen(false);
		formik.resetForm();
		formik.setTouched({}, false);
	};
	const router = useRouter();
	const { slug } = router.query;
	const createUser = useGetCreateUser();

	const { setValues, ...formik } = useFormik({
		initialValues: {
			...stocks,
		},

		onSubmit: (values) => {
			setIsLoading(true);
			cancelModal(false);
			daleteConfig(
				{ stock_id: stocks?.stock?.id, account_name: '' },
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
					router.push('/manager-config');
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
		},
	});

	// Selected Event
	useEffect(() => {
		async function fetchData() {}
		fetchData();
	}, [slug, setValues]);

	return (
		<Modal isOpen={isOpen} setIsOpen={cancelModal} size='xl'>
			<ModalHeader setIsOpen={cancelModal} className='p-4'>
				<ModalTitle id='add-account'>{`Xoá cấu hình cổ phiếu ${stocks?.stock?.symbol}`}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4 pb-5 modal-create-account'>
				<div className='row g-4'>
					<div className='col-lg-12'>
						<FormGroup id='name' label='Mã cổ phiếu' isFloating>
							<Input
								type='text'
								placeholder='100'
								autoComplete='name'
								onChange={formik?.handleChange}
								onBlur={formik?.handleBlur}
								value={stocks?.stock?.symbol}
								isValid={formik?.isValid}
								validFeedback='Looks good!'
								disabled
							/>
						</FormGroup>
					</div>
				</div>

				<div className='d-flex align-items-center justify-content-center mt-3'>
					<Button
						className='ml-3'
						icon={isLoading ? undefined : 'Save'}
						isLight
						color={'danger'}
						isDisable={isLoading}
						onClick={formik?.handleSubmit}>
						{isLoading && <Spinner isSmall inButton />}
						{isLoading ? 'Deleting' : 'Xoá'}
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default DeleteConfig;
