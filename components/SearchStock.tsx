import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, { CardBody } from './bootstrap/Card';
import useDarkMode from '../hooks/useDarkMode';
import Select from './bootstrap/forms/Select';
import FormGroup from './bootstrap/forms/FormGroup';
import Option from './bootstrap/Option';
import Dropdown, { DropdownMenu, DropdownToggle } from './bootstrap/Dropdown';
import Checks, { ChecksGroup } from './bootstrap/forms/Checks';
import Input from './bootstrap/forms/Input';

export type CheckAllType = { [key: string]: boolean };

interface SearchStockProps {
	currentId: any;
	setCurrentId(...args: unknown[]): unknown;
	formik: any;
	dataList: any;
	label: string;
	searchKey: any;
	setSearchKey(...args: unknown[]): unknown;
	placeholder: string;
	selectKey: string;
	required?: boolean;
}

const SearchStock: FC<SearchStockProps> = ({
	currentId,
	setCurrentId,
	formik,
	dataList,
	searchKey,
	setSearchKey,
	label,
	placeholder,
	selectKey,
	required = false,
	...props
}) => {
	const [nameStock, setNameStock] = useState();
	return (
		<div className='col-12'>
			<Dropdown className='select__dropdown col-12'>
				<DropdownToggle hasIcon={false}>
					<div className='d-flex flex-column gap-2'>
						<div className='d-flex align-items-center gap-1'>
							<p className='fw-bold  mb-0'>{label}</p>
						</div>
						<Select
							className='filter-select'
							ariaLabel={selectKey}
							placeholder={nameStock ? nameStock : placeholder}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...props}
						/>
					</div>
				</DropdownToggle>
				<DropdownMenu isAlignmentEnd size='lg' isCloseAfterLeave={false}>
					<div className='container py-2 select__dropdown-data'>
						<div className='col-12'>
							<FormGroup>
								<Input
									className='mb-4'
									ariaLabel='name'
									placeholder='Tên cổ phiếu'
									onChange={(e: any) => setSearchKey(e.target.value)}
									value={searchKey}
								/>
							</FormGroup>
						</div>
						<FormGroup id={selectKey}>
							<ChecksGroup
								style={{
									maxHeight: '240px',
									overflow: 'scroll',
									overflowX: 'hidden',
								}}>
								{dataList?.map((item: any) => (
									<Checks
										key={item.id}
										id={item?.id}
										label={item?.name}
										name={selectKey}
										value={item?.id}
										onChange={(e: any) => {
											setCurrentId(e.target.value);
											setNameStock(item.name);
										}}
										checked={currentId == item?.id}
									/>
								))}
							</ChecksGroup>
						</FormGroup>
					</div>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default SearchStock;
