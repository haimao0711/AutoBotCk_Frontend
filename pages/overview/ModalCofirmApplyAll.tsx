import React, { useState, useEffect } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Button from '../../components/bootstrap/Button';
import ListStockApply from './ListStockApply';
import { authService } from '@services/index';

interface Props {
	isOpen: boolean;
	selectedSymbols: StockItem[];
	setSelectedSymbols: React.Dispatch<React.SetStateAction<StockItem[]>>;
	onConfirm: () => void;
	onCancel: () => void;
	mode: 'following' | 'trading';
}
type StockItem = {
	stock_id: string;
	stock_name: string;
	level: string;
	current_price: string;
};

const ConfirmApplyAllModal: React.FC<Props> = ({
	isOpen,
	selectedSymbols,
	setSelectedSymbols,
	onConfirm,
	onCancel,
	mode,
}) => {
	const [userConfigs, setUserConfigs] = useState<any>([]);

	useEffect(() => {
		const fetchUserConfigs = async () => {
			try {
				const data = await authService.getUserConfigs();
				if (data) {
					const sortedConfigs = [...data].sort((a, b) =>
						a.stock_name.localeCompare(b.stock_name, 'vi', { sensitivity: 'base' }),
					);
					setUserConfigs(sortedConfigs);
				}
			} catch (err) {
				console.error('Failed to fetch userConfigs:', err);
			}
		};

		fetchUserConfigs();
	}, []);

	return (
		<Modal isOpen={isOpen} setIsOpen={onCancel} size='xl'>
			<ModalHeader setIsOpen={onCancel}>
				<ModalTitle id='apply-all'>CẬP NHẬT HÀNG LOẠT</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<ListStockApply
					allSymbols={userConfigs}
					selectedSymbols={selectedSymbols}
					setSelectedSymbols={setSelectedSymbols}
				/>
				<div className='mt-3'>
					Bạn có chắc chắn muốn áp dụng cấu hình hiện tại cho biểu đồ
					<strong>{mode === 'following' ? ' theo dõi ' : ' hành động '}</strong>
					của tất cả các mã cổ phiếu đã chọn không?
				</div>

				<div className='d-flex justify-content-center gap-3 mt-4'>
					<Button color='success' icon='CheckCircle' onClick={onConfirm}>
						Xác nhận
					</Button>
					<Button color='primary' icon='Cancel' onClick={onCancel}>
						Hủy
					</Button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default ConfirmApplyAllModal;
