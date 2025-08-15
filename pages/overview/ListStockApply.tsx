'use client';

import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';

type StockItem = {
	stock_id: string;
	stock_name: string;
	level: string;
};

type ListStockApplyProps = {
	allSymbols?: StockItem[];
	selectedSymbols?: StockItem[];
	setSelectedSymbols: React.Dispatch<React.SetStateAction<StockItem[]>>;
};

const Wrapper = styled.div`
	max-height: 240px;
	overflow-y: auto;

	.form-check-label {
		cursor: pointer;
	}
`;

const ListStockApply: React.FC<ListStockApplyProps> = ({
	allSymbols = [],
	selectedSymbols = [],
	setSelectedSymbols,
}) => {
	const isAllSelected = selectedSymbols.length === allSymbols.length && allSymbols.length > 0;
	const [sortOption, setSortOption] = React.useState<'ABC' | 'Level'>('ABC');

	const sortedSymbols = React.useMemo(() => {
		const symbolsCopy = [...(allSymbols ?? [])];

		if (sortOption === 'ABC') {
			return symbolsCopy.sort((a, b) => a.stock_name.localeCompare(b.stock_name));
		} else {
			return symbolsCopy.sort((a, b) => Number(a.level) - Number(b.level));
		}
	}, [allSymbols, sortOption]);

	const toggleSymbol = (item: StockItem): void => {
		setSelectedSymbols((prev: StockItem[]) => {
			const exists = prev.some((s) => s.stock_id === item.stock_id);
			return exists
				? prev.filter((s) => s.stock_id !== item.stock_id)
				: [
						...prev,
						{ stock_id: item.stock_id, stock_name: item.stock_name, level: item.level },
				  ];
		});
	};

	const toggleSelectAll = (): void => {
		if (isAllSelected) {
			setSelectedSymbols([]);
		} else {
			setSelectedSymbols(
				allSymbols.map(({ stock_id, stock_name, level }) => ({
					stock_id,
					stock_name,
					level,
				})),
			);
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
					<div className='d-flex justify-content-between align-items-center mb-2'>
						<div className='form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='selectAll'
								checked={isAllSelected}
								onChange={toggleSelectAll}
							/>
							<label className='form-check-label fw-bold' htmlFor='selectAll'>
								Chọn tất cả
							</label>
						</div>
						<div className='d-flex align-items-center'>
							<label htmlFor='sortOption' className='me-2 fw-bold mb-0'>
								Sắp xếp theo:
							</label>
							<select
								id='sortOption'
								value={sortOption}
								onChange={(e) => setSortOption(e.target.value as 'ABC' | 'Level')}
								className='form-select form-select-sm'
								style={{ width: '100px' }}>
								<option value='ABC'>ABC</option>
								<option value='Level'>Level</option>
							</select>
						</div>
					</div>
					{(sortedSymbols ?? []).map((symbol) => (
						<div key={symbol.stock_id} className='form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id={`checkbox-${symbol.stock_id}`}
								checked={(selectedSymbols ?? []).some(
									(s) => s.stock_id === symbol.stock_id,
								)}
								onChange={() => toggleSymbol(symbol)}
							/>
							<label
								className='form-check-label d-flex justify-content-start align-items-center'
								htmlFor={`checkbox-${symbol.stock_id}`}
								title={`ID: ${symbol.stock_id}`}>
								<span className='me-1' style={{ width: '50px' }}>
									{symbol?.stock_name}
								</span>
								<span style={{ minWidth: '60px', textAlign: 'left' }}>
									Level: {symbol?.level}
								</span>
							</label>
						</div>
					))}
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
