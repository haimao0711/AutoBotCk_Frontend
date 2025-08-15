import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';

interface IDetailtModalProps {
	isOpen: {
		data: any;
		toggle: boolean;
	};
	setIsOpen(...args: unknown[]): unknown;
	handleApproveTransaction: any;
	handleRejectTransaction: any;
}
const DetailtModal: FC<IDetailtModalProps> = ({
	isOpen,
	setIsOpen,
	handleApproveTransaction,
	handleRejectTransaction,
}) => {
	return (
		<Modal
			isOpen={isOpen?.toggle}
			setIsOpen={(e) =>
				setIsOpen((prev: any) => ({
					...prev,
					toggle: e,
				}))
			}
			size='xl'
			titleId={isOpen?.data?.id?.toString()}>
			<ModalHeader
				setIsOpen={(e) =>
					setIsOpen((prev: any) => ({
						...prev,
						toggle: e,
					}))
				}
				className='p-4'>
				<ModalTitle id={isOpen?.data?.id}>{'Transaction detailt'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4 pb-5'>
				<div className='row g-4'>
					<FormGroup label='Action' className='col-md-6'>
						<Input value={isOpen?.data?.action} disabled />
					</FormGroup>
					<FormGroup label='Amount' className='col-md-6'>
						<Input value={isOpen?.data?.amount} disabled />
					</FormGroup>
					<FormGroup label='From' className='col-md-6'>
						<Input value={isOpen?.data?.fromAddress} disabled />
					</FormGroup>
					<FormGroup label='To' className='col-md-6'>
						<Input value={isOpen?.data?.toAddress} disabled />
					</FormGroup>
					<FormGroup label='Time' className='col-md-6'>
						<Input value={isOpen?.data?.time} disabled />
					</FormGroup>
					<FormGroup label='Status' className='col-md-6'>
						<Input value={isOpen?.data?.status} disabled />
					</FormGroup>
				</div>

				<div className='d-flex align-items-center justify-content-center mt-5'>
					<Button
						className='mr-3'
						color='primary'
						icon='TaskAlt'
						tag='a'
						onClick={() => handleApproveTransaction(isOpen?.data)}>
						Approval transaction
					</Button>

					<Button
						color='danger'
						icon='Close'
						tag='a'
						onClick={() => handleRejectTransaction(isOpen?.data)}>
						Refuse transaction
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};
DetailtModal.propTypes = {
	isOpen: PropTypes.any.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	handleApproveTransaction: PropTypes.any.isRequired,
	handleRejectTransaction: PropTypes.any.isRequired,
};

export default DetailtModal;
