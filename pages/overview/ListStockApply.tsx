'use client';

import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';

type StockItem = {
	stock_id: string;
	stock_name: string;
	level: string;
	current_price: string;
	volume_buy?: number | string;
	volume_trade?: number | string;
};

type ListStockApplyProps = {
	allSymbols?: StockItem[];
	selectedSymbols?: StockItem[];
	setSelectedSymbols: React.Dispatch<React.SetStateAction<StockItem[]>>;
};

const Wrapper = styled.div`
	max-height: 240px;
	overflow-y: auto;

	@media (max-width: 768px) {
		max-height: 60vh;
	}

	.form-check-label {
		cursor: pointer;
	}
`;

const ListStockApply: React.FC<ListStockApplyProps> = ({
	allSymbols = [],
	selectedSymbols = [],
	setSelectedSymbols,
}) => {
	const [sortOption, setSortOption] = React.useState<'ABC' | 'Level' | 'Price' | 'Holding'>(
		'ABC',
	);

	const sortedSymbols = React.useMemo(() => {
		let symbolsCopy = [...(allSymbols ?? [])];

		if (sortOption === 'Holding') {
			symbolsCopy = symbolsCopy.filter(
				(item) => Number(item.volume_buy) > 0 || Number(item.volume_trade) > 0,
			);
		}

		if (sortOption === 'Level') {
			return symbolsCopy.sort((a, b) => Number(a.level) - Number(b.level));
		} else if (sortOption === 'Price') {
			return symbolsCopy.sort((a, b) => Number(a.current_price) - Number(b.current_price));
		} else {
			return symbolsCopy.sort((a, b) => a.stock_name.localeCompare(b.stock_name));
		}
	}, [allSymbols, sortOption]);

	const isAllSelected =
		sortedSymbols.length > 0 &&
		sortedSymbols.every((s) => selectedSymbols.some((sel) => sel.stock_id === s.stock_id));

	const toggleSymbol = (item: StockItem): void => {
		setSelectedSymbols((prev: StockItem[]) => {
			const exists = prev.some((s) => s.stock_id === item.stock_id);
			return exists
				? prev.filter((s) => s.stock_id !== item.stock_id)
				: [
					...prev,
					{
						stock_id: item.stock_id,
						stock_name: item.stock_name,
						level: item.level,
						current_price: item.current_price,
					},
				];
		});
	};

	const toggleSelectAll = (): void => {
		if (isAllSelected) {
			setSelectedSymbols((prev) =>
				prev.filter((p) => !sortedSymbols.some((s) => s.stock_id === p.stock_id)),
			);
		} else {
			setSelectedSymbols((prev) => {
				const newItems = sortedSymbols.filter(
					(s) => !prev.some((p) => p.stock_id === s.stock_id),
				);
				return [
					...prev,
					...newItems.map(({ stock_id, stock_name, level, current_price }) => ({
						stock_id,
						stock_name,
						level,
						current_price,
					})),
				];
			});
		}
	};

	return (
		<Card className='mb-4'>
			<CardHeader>
				<CardLabel icon='List' iconColor='info'>
					<CardTitle>Chọn mã cổ phiếu muốn cập nhật</CardTitle>
				</CardLabel>
			</CardHeader>

			<CardBody>
				<Wrapper className='border rounded p-3 mb-3'>
					<div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2 text-center'>
						<div className='form-check mb-0 d-flex align-items-center gap-2'>
							<input
								type='checkbox'
								className='form-check-input mt-0 border-secondary'
								id='selectAll'
								checked={isAllSelected}
								onChange={toggleSelectAll}
								style={{ width: '18px', height: '18px', cursor: 'pointer' }}
							/>
							<label className='form-check-label fw-bold' htmlFor='selectAll'>
								Chọn tất cả
							</label>
						</div>
						<div className='d-flex align-items-center justify-content-center'>
							<label htmlFor='sortOption' className='me-2 fw-bold mb-0'>
								Sắp xếp theo
							</label>
							<select
								id='sortOption'
								value={sortOption}
								onChange={(e) =>
									setSortOption(
										e.target.value as 'ABC' | 'Level' | 'Price' | 'Holding',
									)
								}
								className='form-select form-select-sm'
								style={{ width: '130px' }}>
								<option value='ABC'>ABC</option>
								<option value='Level'>Level</option>
								<option value='Price'>Giá hiện tại</option>
								<option value='Holding'>Danh mục nắm giữ</option>
							</select>
						</div>
					</div>

					<div className='border-top border-start border-secondary-subtle'>
						{/* Header Row */}
						<div className='d-flex align-items-center border-bottom border-secondary-subtle fw-bold text-muted'>
							<div
								className='border-end border-secondary-subtle d-flex justify-content-center align-items-center flex-shrink-0'
								style={{ width: '40px', height: '35px' }}>
								#
							</div>
							<span
								className='border-end border-secondary-subtle text-center py-1 flex-grow-1'
								style={{ flexBasis: '40%' }}>
								Mã cổ phiếu
							</span>
							<span
								className='border-end border-secondary-subtle text-center py-1 flex-grow-0'
								style={{ flexBasis: '20%', minWidth: '60px' }}>
								Level
							</span>
							<span
								className='text-center py-1 border-end border-secondary-subtle flex-grow-1'
								style={{ flexBasis: '40%' }}>
								Giá hiện tại
							</span>
						</div>

						{/* Items Row */}
						{(sortedSymbols ?? []).map((symbol) => (
							<div
								key={symbol.stock_id}
								className='d-flex align-items-center border-bottom border-secondary-subtle'>
								<div
									className='border-end border-secondary-subtle d-flex justify-content-center align-items-center flex-shrink-0'
									style={{ width: '40px', height: '35px' }}>
									<input
										type='checkbox'
										className='form-check-input mt-0 border-secondary'
										id={`checkbox-${symbol.stock_id}`}
										checked={(selectedSymbols ?? []).some(
											(s) => s.stock_id === symbol.stock_id,
										)}
										onChange={() => toggleSymbol(symbol)}
										style={{ width: '18px', height: '18px', cursor: 'pointer' }}
									/>
								</div>
								<label
									className='d-flex justify-content-start align-items-center mb-0 flex-grow-1'
									htmlFor={`checkbox-${symbol.stock_id}`}
									style={{ cursor: 'pointer' }}>
									<span
										className='border-end border-secondary-subtle text-center py-1 flex-grow-1'
										style={{ flexBasis: '40%' }}>
										{symbol?.stock_name}
									</span>
									<span
										className='border-end border-secondary-subtle text-center py-1 flex-grow-0'
										style={{ flexBasis: '20%', minWidth: '60px' }}>
										{symbol?.level}
									</span>
									<span
										className='text-center py-1 border-end border-secondary-subtle flex-grow-1'
										style={{ flexBasis: '40%' }}>
										{symbol?.current_price}
									</span>
								</label>
							</div>
						))}
					</div>
				</Wrapper>

				<div className='d-flex flex-wrap gap-2 border rounded p-2'>
					{selectedSymbols.length > 0 ? (
						(selectedSymbols ?? []).map((stock) => (
							<span key={stock.stock_id} className='badge bg-white text-success'>
								{stock.stock_name}
							</span>
						))
					) : (
						<span className='text-muted'>Chưa chọn mã nào</span>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default ListStockApply;
