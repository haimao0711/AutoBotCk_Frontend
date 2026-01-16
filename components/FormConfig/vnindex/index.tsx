import { useMemo, useCallback, useState, useEffect } from 'react';

import Checks from '@components/bootstrap/forms/Checks';
import styled from 'styled-components';
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
	IVNIndexBase,
	IVNIndexBuyConfig,
	IVNIndexSellConfig,
	IVNIndexSharing,
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
				key: `vnindex_config_use_rsi_reversed_${trend}`,
				label: `RSI ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - RSI ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_rsi_${trend}`,
				label: `RSI ${vieTrend}`,
				name: `${vieSide} - RSI ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_rsi_to_${side}`,
				label: `RSI ${comparasionOperator}`,
				name: `${vieSide} - RSI ${comparasionOperator} (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_stoch_rsi_reversed_${trend}`,
				label: `STOCH RSI ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - STOCH RSI ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_stoch_rsi_${trend}`,
				label: `STOCH RSI ${vieTrend}`,
				name: `${vieSide} - STOCH RSI ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_stoch_rsi_to_${side}`,
				label: `STOCH RSI ${comparasionOperator}`,
				name: `${vieSide} - STOCH RSI <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_macd_reversed_${trend}`,
				label: `MACD ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - MACD ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_macd_${trend}`,
				label: `MACD ${vieTrend}`,
				name: `${vieSide} - MACD ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_histogram_to_${side}`,
				label: `HISTOGRAM ${comparasionOperator}`,
				name: `${vieSide} - HISTOGRAM <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_histogram_reversed_${trend}`,
				label: `HISTOGRAM ĐẢO CHIỀU ${vieTrend}`,
				name: `${vieSide} - HISTOGRAM ĐẢO CHIỀU ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_sma_${trend}`,
				label: `SMA ${vieTrend}`,
				name: `${vieSide} - SMA ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_min_vnindex_${side}`,
				label: `Chỉ số VNINDEX <=`,
				name: `${vieSide} - CHỈ SỐ VNINDEX <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_histogram_${trend}`,
				label: `HISTOGRAM ${vieTrend}`,
				name: `${vieSide} - HISTOGRAM ${vieTrend} (VNI)`,
				isRender: true,
			},
			{
				key: `vnindex_config_use_max_vnindex_${side}`,
				label: `Chỉ số VNINDEX >=`,
				name: `${vieSide} - CHỈ SỐ VNINDEX >= (VNI)`,
				isRender: true,
			},
		],
	];
	const rendersObl = [
		[
			{
				key: `vnindex_config_use_rsi_obl_to_${side}`,
				label: `RSI(VNI) ${comparasionOperator}`,
				name: `${vieSide} - RSI ${comparasionOperator} (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_stoch_rsi_obl_to_${side}`,
				label: `STOCH RSI(VNI) <=`,
				name: `BẮT BUỘC - STOCH RSI <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_histogram_obl_to_${side}`,
				label: `HISTOGRAM(VNI) ${comparasionOperator}`,
				name: `${vieSide} - HISTOGRAM <= (VNI)`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_macd_obl_increase`,
				label: `MACD(VNI) tăng`,
				name: `${vieSide} - MACD(VNI) tăng`,
				isRender: true,
			},
		],
		[
			{
				key: `vnindex_config_use_sma_obl_increase`,
				label: `SMA(VNI) tăng`,
				name: `${vieSide} - SMA(VNI) tăng`,
				isRender: true,
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
			keyRender: `vnindex_config_use_rsi_to_${side}`,
			key: `vnindex_config_value_rsi_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_stoch_rsi_to_${side}`,
			key: `vnindex_config_value_stoch_rsi_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_histogram_to_${side}`,
			key: `vnindex_config_value_histogram_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_min_vnindex_${side}`,
			key: `vnindex_config_min_vnindex_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_max_vnindex_${side}`,
			key: `vnindex_config_max_vnindex_${side}`,
			label: 'Nhập chỉ số',
		},
	];
	const rendersObl = [
		{
			keyRender: `vnindex_config_use_rsi_obl_to_${side}`,
			key: `vnindex_config_value_rsi_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_stoch_rsi_obl_to_${side}`,
			key: `vnindex_config_value_stoch_rsi_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_histogram_obl_to_${side}`,
			key: `vnindex_config_value_histogram_obl_to_${side}`,
			label: 'Nhập chỉ số',
		},
		{
			keyRender: `vnindex_config_use_min_vnindex_${side}`,
			key: `vnindex_config_min_vnindex_${side}`,
			label: 'Nhập chỉ số',
			isRender: slug !== 'trading',
		},
		{
			keyRender: `vnindex_config_use_max_vnindex_${side}`,
			key: `vnindex_config_max_vnindex_${side}`,
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
		setValues('vnindex', sideParams, key, e.target.checked);
	};
	return (
		<div
			className={className}
			style={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1, // giúp SwitchItem lấp đầy chiều cao của grid-item
			}}>
			<FormGroup
				label={label}
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
				}}>
				<Checks
					id={id}
					type='switch'
					label='Active'
					onChange={handleChange}
					checked={checked}
					ariaLabel='status'
					style={{ marginTop: 'auto' }}
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
				value={formik.values.vnindex[parts[1] as keyof IVNIndexSharing][parts[2]]}
				min={useMinValue ? minValue : undefined}
				isValid={formik?.isValid}
				validFeedback='Looks good!'
			/>
		</FormGroup>
	);
};

const Module = (props: ModuleProps) => {
	const [columnStyle, setColumnStyle] = useState({ flex: '0 0 50%', maxWidth: '50%' });
	useEffect(() => {
		const updateStyle = () => {
			if (window.innerWidth < 768) {
				setColumnStyle({ flex: '0 0 50%', maxWidth: '50%' });
			} else if (window.innerWidth < 992) {
				// Tablet: 3 cột
				setColumnStyle({ flex: '0 0 33.3333%', maxWidth: '33.3333%' });
			} else {
				// Desktop: 5 cột
				setColumnStyle({ flex: '0 0 20%', maxWidth: '20%' });
			}
		};

		updateStyle();
		window.addEventListener('resize', updateStyle);
		return () => window.removeEventListener('resize', updateStyle);
	}, []);
	const { type, label, formik, setValues, slug } = props;
	const { values } = formik;
	const side = type === 'Buy' || type === 'BuyObl' ? 'buy' : 'sell';

	const selectRenders = generateSelectRenders(type, slug);
	const typeRenders = generateTypeRenders(type, slug);
	return (
		<FormGroup
			className='col-12 border-b border-gray-300 py-6 px-1 mb-6'
			label={label}
			labelClassName='fw-bold'>
			<div className='d-flex flex-wrap justify-content-between container py-4 px-2'>
				<div className='row w-100' style={{ marginLeft: 0, marginRight: 0 }}>
					{selectRenders.map((selectRender, idRow) => {
						const item = typeRenders?.[idRow];
						const itemId = item?.keyRender || '';
						return (
							<div className='mb-2 gap-1 col' key={idRow} style={columnStyle}>
								{selectRender.map((item, idCol) => {
									return (
										<div
											key={item.key}
											className='grid-item'
											style={{
												visibility: item.isRender ? 'visible' : 'hidden',
											}}>
											{
												<SwitchItem
													className='py-4'
													formik={formik}
													label={item.label}
													id={`vnindex.${
														type === 'Buy' || type === 'BuyObl'
															? 'buy'
															: 'sell'
													}.${item.key}`}
													name={item.name}
													checked={
														values.vnindex[side as keyof IVNIndexBase][
															item.key as keyof IVNIndexSharing
														]
													}
													side={type}
													setValues={setValues}
												/>
											}
										</div>
									);
								})}
								{formik?.values.vnindex[side as keyof IVNIndexBase][
									itemId as keyof IVNIndexSharing
								] && (
									<TypeItem
										className='py-4'
										formik={formik}
										label={typeRenders[idRow].label}
										id={`vnindex.${
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

const VNIndex = ({ formik, setValues }: FormPropType) => {
	const { values, handleChange } = formik;
	const ObligatoryModule = (
		<Module
			type='BuyObl'
			label='CÀI ĐẶT ĐIỀU KIỆN MUA BẮT BUỘC (SỬ DỤNG CHỈ SỐ VNINDEX)'
			formik={formik}
			setValues={setValues}
			slug=''
		/>
	);
	const BuyModule = (
		<Module
			type='Buy'
			label='CÀI ĐẶT ĐIỀU KIỆN MUA (SỬ DỤNG CHỈ SỐ VNINDEX)'
			formik={formik}
			setValues={setValues}
			slug=''
		/>
	);

	// const SellModule = (
	// 	<Module
	// 		type='Sell'
	// 		label='CÀI ĐẶT ĐIỀU KIỆN BÁN (SỬ DỤNG CHỈ SỐ VNINDEX)'
	// 		formik={formik}
	// 		setValues={setValues}
	// 		slug=''
	// 	/>
	// );

	return (
		<FormStyle>
			<CardTitle>CẤU HÌNH SỬ DỤNG CHỈ SỐ VNINDEX</CardTitle>
			{formik?.values.base.config_is_buy && ObligatoryModule}
			{formik?.values.base.config_is_buy && BuyModule}
			{/* {formik?.values.base.config_is_sell && SellModule} */}
		</FormStyle>
	);
};

export default VNIndex;
