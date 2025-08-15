import { useMemo, useCallback, useState } from 'react';

import Checks from '@components/bootstrap/forms/Checks';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { CardTitle } from '@components/bootstrap/Card';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import Input from '@components/bootstrap/forms/Input';
import {
	FormPropType,
	ModuleProps,
	SwitchItemsRenderProps,
	TypeItemsRenderProps,
	SwitchItemProps,
	TypeItemProps,
	IStockBase,
	IStockBuyConfig,
	IStockSellConfig,
	IStockSharing,
} from '../interface';
import { handleChange } from '..';

export const FormStyle = styled.div`
	.form-label {
		height: 39px;
	}
`;

const generateSelectRenders = (
	type: 'Buy' | 'Sell' | 'BuyObl',
	slug: string | string[] | undefined,
): Array<Array<SwitchItemsRenderProps>> => {
	const side = type === 'Buy' || type === 'BuyObl' ? 'buy' : 'sell';
	const vieSide = type === 'Buy' || type === 'BuyObl' ? 'MUA' : 'BÁN';
	const trend = type === 'Buy' || type === 'BuyObl' ? 'increase' : 'decrease';
	const vieTrend = type === 'Buy' || type === 'BuyObl' ? 'TĂNG' : 'GIẢM';
	const viePos = type === 'Buy' || type === 'BuyObl' ? 'TRÊN' : 'DƯỚI';
	const comparasionOperator = type === 'Buy' || type === 'BuyObl' ? '<=' : '>=';

	const renders = [
		[
			{
				key: `stock_config_use_rsi_reversed_${trend}`,
				label: `RSI ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - RSI ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_rsi_${trend}`,
				label: `RSI ${vieTrend}`,
				name: `${vieSide} - RSI ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_rsi_to_${side}`,
				label: `RSI ${comparasionOperator}`,
				name: `${vieSide} - RSI ${comparasionOperator} (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `stock_config_use_stoch_rsi_reversed_${trend}`,
				label: `STOCH RSI ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - STOCH RSI ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_stoch_rsi_${trend}`,
				label: `STOCH RSI ${vieTrend}`,
				name: `${vieSide} - STOCH RSI ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_stoch_rsi_to_${side}`,
				label: `STOCH RSI ${comparasionOperator}`,
				name: `${vieSide} - STOCH RSI <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `stock_config_use_macd_reversed_${trend}`,
				label: `MACD ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - MACD ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_macd_${trend}`,
				label: `MACD ${vieTrend}`,
				name: `${vieSide} - MACD ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_macd_to_${side}`,
				label: `MACD ${comparasionOperator}`,
				name: `${vieSide} - MACD <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `stock_config_use_histogram_reversed_${trend}`,
				label: `HISTOGRAM ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - HISTOGRAM ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `stock_config_use_histogram_${trend}`,
				label: `HISTOGRAM ${vieTrend}`,
				name: `${vieSide} - HISTOGRAM ${vieTrend} (VNI)`,
				isRender: true,
			},
		],
		// [
		// 	{
		// 		key: `stock_config_use_volume_to_${side}`,
		// 		label: `VOLUME>VOLUME MA`,
		// 		name: `${vieSide} - VOLUME>VOLUME MA (VNI)`,
		// 		isRender: type === 'Buy',
		// 	},
		// ],
	];
	const rendersObl = [
		[
			{
				key: `stock_config_use_rsi_obl_to_${side}`,
				label: `RSI(CP) ${comparasionOperator}`,
				name: `${vieSide} - RSI ${comparasionOperator} (CP)`,
				isRender: true,
			},
		],
		[
			{
				key: `stock_config_use_stoch_rsi_obl_to_${side}`,
				label: `STOCH RSI(CP) <=`,
				name: `BẮT BUỘC - STOCH RSI <= (CP)`,
				isRender: true,
			},
		],
		[
			{
				key: `stock_config_use_macd_obl_to_${side}`,
				label: `MACD(CP) ${comparasionOperator}`,
				name: `${vieSide} - MACD <= (CP)`,
				isRender: true,
			},
		],
		// [
		// 	{
		// 		key: `stock_config_use_buy_up_obl_to_${side}`,
		// 		label: `% Mua chủ động >=`,
		// 		name: `${vieSide} - BuyUp >= (CP)`,
		// 		isRender: slug === 'following',
		// 	},
		// ],
		[
			{
				key: `stock_config_use_buy_foreign_obl_to_${side}`,
				label: `% Mua nước ngoài >=`,
				name: `${vieSide} - Buyforeign >= (CP)`,
				isRender: slug !== 'trading',
			},
		],
	];
	return type === 'BuyObl' ? rendersObl : renders;
};

const generateTypeRenders = (
	type: 'Buy' | 'Sell' | 'BuyObl',
	slug: string | string[] | undefined,
): Array<TypeItemsRenderProps> => {
	const side = type === 'Buy' || type === 'BuyObl' ? 'buy' : 'sell';
	const renders = [
		{
			keyRender: `stock_config_use_rsi_to_${side}`,
			key: `stock_config_value_rsi_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_stoch_rsi_to_${side}`,
			key: `stock_config_value_stoch_rsi_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_macd_to_${side}`,
			key: `stock_config_value_macd_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_min_stock_${side}`,
			key: `stock_config_min_stock_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_max_stock_${side}`,
			key: `stock_config_max_stock_${side}`,
			label: 'Nhập chỉ số',
		},
	];

	const rendersObl = [
		{
			keyRender: `stock_config_use_rsi_obl_to_${side}`,
			key: `stock_config_value_rsi_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_stoch_rsi_obl_to_${side}`,
			key: `stock_config_value_stoch_rsi_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_macd_obl_to_${side}`,
			key: `stock_config_value_macd_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `stock_config_use_buy_foreign_obl_to_${side}`,
			key: `stock_config_value_buy_foreign_obl_to_${side}`,
			label: 'Nhập chỉ số',
			isRender: slug !== 'trading',
		},
	];

	return type === 'BuyObl' ? rendersObl : renders;
};

const SwitchItem: React.FC<SwitchItemProps> = ({
	className,
	formik,
	label,
	id,
	name,
	checked,
	side,
	setValues,
}) => {
	const handleChange = (e: any) => {
		formik?.handleChange(e);
		const sideParams = side === 'Buy' || side === 'BuyObl' ? 'buy' : 'sell';
		const key = id.split('.').pop() || '';
		setValues('stock', sideParams, key, e.target.checked);
	};
	return (
		<div className={className}>
			<FormGroup label={label}>
				<Checks
					id={id}
					type='switch'
					label='Active'
					onChange={handleChange}
					checked={checked}
					ariaLabel='status'
				/>
			</FormGroup>
		</div>
	);
};

const TypeItem: React.FC<TypeItemProps> = ({
	className,
	formik,
	label,
	id,
	useMinValue,
	minValue,
}) => {
	const parts = id.split('.', 3);
	return (
		<FormGroup className={className} label={label}>
			<Input
				type='text'
				id={id}
				autoComplete='volume'
				onChange={(e) => handleChange(e, formik)}
				onBlur={formik?.handleBlur}
				value={formik.values.stock[parts[1] as keyof IStockSharing][parts[2]]}
				min={useMinValue ? minValue : undefined}
				max={100}
				isValid={formik?.isValid}
				validFeedback='Looks good!'
			/>
		</FormGroup>
	);
};

const Module = (props: ModuleProps) => {
	const columnStyle = {
		flex: '0 0 20%',
		maxWidth: '20%',
	};
	const { type, label, setValues, formik, slug } = props;
	const { values } = formik;
	// console.log('check value Module Obl: ', values);
	const side = type === 'Buy' || type === 'BuyObl' ? 'buy' : 'sell';
	const selectRenders = generateSelectRenders(type, slug);
	const typeRenders = generateTypeRenders(type, slug);
	return (
		<FormGroup className='col-12 border-b border-gray-300 p-6 mb-6' label={label}>
			<div className='d-flex flex-wrap justify-content-between container p-4'>
				<div className='row w-100'>
					{selectRenders.map((selectRender, idRow) => {
						const itemId = typeRenders[idRow].keyRender;
						return (
							<div className='mb-4 gap-4 col' key={idRow} style={columnStyle}>
								{selectRender.map((item, idCol) => (
									<div
										key={item.key}
										className='w-100'
										style={{
											visibility: item.isRender ? 'visible' : 'hidden',
										}}>
										{
											<SwitchItem
												className='p-4'
												formik={formik}
												label={item.label}
												id={`stock.${
													type === 'Buy' || type === 'BuyObl'
														? 'buy'
														: 'sell'
												}.${item.key}`}
												name={item.name}
												checked={
													values.stock[side as keyof IStockBase][
														item.key as keyof IStockSharing
													]
												}
												side={type}
												setValues={setValues}
											/>
										}
									</div>
								))}
								{formik?.values.stock[side as keyof IStockBase][
									itemId as keyof IStockSharing
								] &&
									typeRenders[idRow]?.isRender !== false && (
										<TypeItem
											className='p-4'
											formik={formik}
											label={typeRenders[idRow].label}
											id={`stock.${
												type === 'Buy' || type === 'BuyObl' ? 'buy' : 'sell'
											}.${typeRenders[idRow].key}`}
											useMinValue={idRow === 3 ? false : true}
											minValue={0}
										/>
									)}
							</div>
						);
					})}
				</div>
			</div>
		</FormGroup>
	);
};

const Stock = ({ formik, setValues }: FormPropType) => {
	const router = useRouter();
	const { slug, id } = router.query;
	const { values } = formik;
	const ObligatoryModule = (
		<Module
			type='BuyObl'
			label='CÀI ĐẶT ĐIỀU KIỆN MUA BẮT BUỘC (SỬ DỤNG CHỈ SỐ CỔ PHIẾU)'
			setValues={setValues}
			formik={formik}
			slug={slug}
		/>
	);

	const BuyModule = (
		<Module
			type='Buy'
			label='CÀI ĐẶT ĐIỀU KIỆN MUA (SỬ DỤNG CHỈ SỐ CỔ PHIẾU)'
			setValues={setValues}
			formik={formik}
			slug={slug}
		/>
	);

	const SellModule = (
		<Module
			type='Sell'
			label='CÀI ĐẶT ĐIỀU KIỆN BÁN (SỬ DỤNG CHỈ SỐ CỔ PHIẾU)'
			setValues={setValues}
			formik={formik}
			slug={slug}
		/>
	);

	return (
		<FormStyle>
			<CardTitle>CẤU HÌNH SỬ DỤNG CHỈ SỐ CỔ PHIẾU</CardTitle>
			{formik?.values.base.config_is_buy && ObligatoryModule}
			{formik?.values.base.config_is_buy && BuyModule}
			{formik?.values.base.config_is_sell && SellModule}
		</FormStyle>
	);
};

export default Stock;
