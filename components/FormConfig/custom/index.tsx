import { useEffect, useState, useCallback } from 'react';
import { FormikProps } from 'formik';
import Checks from '@components/bootstrap/forms/Checks';
import { CardTitle } from '@components/bootstrap/Card';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import Input from '@components/bootstrap/forms/Input';
import { IBaseConfig, IStockOtherConfig } from '../interface';
import { handleChange } from '..';

interface CustomConfigProps {
	formik: FormikProps<IBaseConfig>;
}

interface SwitchItemProps {
	className: string;
	label: string;
	id: string;
	onChange?: (e: any) => void;
	checked: boolean;
}

interface InputItemProps {
	className: string;
	label: string;
	id: string;
	onChange?: (e: any) => void;
	formik: FormikProps<IBaseConfig>;
	value?: number;
}

interface ModuleProps {
	type: 'Buy' | 'Sell';
	label: string;
	itemRenders: any[][];
	formik: FormikProps<IBaseConfig>;
}

const SwichItem = (props: SwitchItemProps) => {
	const { className, label, id, onChange, checked } = props;
	return (
		<div className={className} style={{ minHeight: '120px' }}>
			<FormGroup label={label}>
				<Checks
					id={id}
					type='switch'
					label='Active'
					onChange={onChange}
					checked={checked}
					ariaLabel='status'
				/>
			</FormGroup>
		</div>
	);
};

const InputItem = (props: InputItemProps) => {
	const { className, label, id, formik, value, onChange } = props;
	const { values } = formik;

	if (onChange) {
		return (
			<div className={className} style={{ minHeight: '120px' }}>
				<FormGroup label={label}>
					<Input
						type='text'
						placeholder='Nhập chỉ số'
						autoComplete='volume'
						id={id}
						onChange={onChange}
						onBlur={formik?.handleBlur}
						value={
							value
								? parseFloat(
									values.stock.other[
										id as keyof IStockOtherConfig
									]?.toString(),
								) * value
								: values.stock.other[id as keyof IStockOtherConfig]?.toString()
						}
						min={0}
						max={100}
						isValid={formik?.isValid}
						validFeedback='Looks good!'
					/>
				</FormGroup>
			</div>
		);
	}

	return (
		<div className={className} style={{ minHeight: '120px' }}>
			<FormGroup label={label}>
				<Input
					type='text'
					placeholder='Nhập chỉ số'
					autoComplete='volume'
					id={`stock.other.${id}`}
					onChange={(e) => handleChange(e, formik)}
					onBlur={formik?.handleBlur}
					value={values.stock.other[id as keyof IStockOtherConfig]?.toString()}
					min={0}
					max={100}
					isValid={formik?.isValid}
					validFeedback='Looks good!'
				/>
			</FormGroup>
		</div>
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
	const { type, label, itemRenders, formik } = props;
	return (
		<FormGroup
			className='col-12 border-b border-gray-300 py-3 px-1 mb-6'
			label={label}
			labelClassName='fw-bold text-gray-500'>
			<div className='d-flex flex-wrap justify-content-between container py-4 px-2'>
				<div
					className='row w-100 align-items-start'
					style={{ marginLeft: 0, marginRight: 0 }}>
					{itemRenders.map((itemRender, idRow) => {
						return (
							<div className='mb-2 gap-4 col' key={idRow} style={columnStyle}>
								{itemRender.map((item, idCol) => (
									<div
										key={idCol}
										className='grid-item d-flex flex-column'
										style={{
											visibility: item.isRender ? 'visible' : 'hidden',
										}}>
										{item.type === 'Switch' ? (
											<SwichItem
												className='py-4 flex-grow-0 d-flex flex-column justify-content-between align-items-start'
												label={item.label}
												id={`stock.other.${item.id}`}
												onChange={item.onChange}
												checked={item.checked}
											/>
										) : (
											<InputItem
												className='py-4 flex-grow-0 d-flex flex-column justify-content-between align-items-start'
												label={item.label}
												id={item.id}
												formik={formik}
												value={item.value ? item.value : undefined}
												onChange={item.onChange || undefined}
											/>
										)}
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</FormGroup>
	);
};

const CustomConfig = ({ formik }: CustomConfigProps) => {
	const [isActiveTimeBuy, setIsActiveTimeBuy] = useState(false);
	const [isActiveTimeSell, setIsActiveTimeSell] = useState(false);
	const { values, setFieldValue, handleChange: formikHandleChange } = formik;
	// console.log('check values CustomConfig: ', values);

	useEffect(() => {
		if (values.stock.other.stock_config_time_to_buy) {
			setIsActiveTimeBuy(true);
		}
		if (values.stock.other.stock_config_time_to_sell) {
			setIsActiveTimeSell(true);
		}
	}, [values.stock.other.stock_config_time_to_buy, values.stock.other.stock_config_time_to_sell]);

	const handleNumberBidChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, type: 'buy' | 'sell') => {
			let value = parseInt(event.target.value, 10);
			const key = `stock.other.stock_config_number_pid_${type}_once_time`;
			const opposite_key = `stock.other.stock_config_percent_stock_${type}_once_time`;

			if (isNaN(value)) {
				formik.setFieldValue(key, 0);
				formik.setFieldValue(opposite_key, 0);
				return;
			}
			value = Math.min(Math.max(value, 0), 100);

			if (value === 0) {
				formik.setFieldValue(key, 0);
				formik.setFieldValue(opposite_key, 0);
			} else {
				const correspondingPercentage = 100 / value;
				formik.setFieldValue(key, value);
				formik.setFieldValue(opposite_key, correspondingPercentage / 100);
			}
		},
		[formik],
	);

	const handlePercentageBidChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, type: 'buy' | 'sell') => {
			let showValue = parseFloat(event.target.value);

			const opposite_key = `stock.other.stock_config_number_pid_${type}_once_time`;
			const key = `stock.other.stock_config_percent_stock_${type}_once_time`;

			if (isNaN(showValue)) {
				formik.setFieldValue(key, 0);
				formik.setFieldValue(opposite_key, 0);
				return;
			}

			showValue = Math.min(Math.max(showValue, 0), 100);

			const storedValue = showValue / 100;

			if (storedValue === 0) {
				formik.setFieldValue(opposite_key, 0);
				formik.setFieldValue(key, 0);
			} else {
				const correspondingNumberPidValue = 100 / showValue;
				let value = parseInt(correspondingNumberPidValue.toString(), 10);
				formik.setFieldValue(opposite_key, value);
				const correspondingPercentage = 100 / value;
				formik.setFieldValue(key, correspondingPercentage);
			}
		},
		[formik],
	);

	const handlePrecentageChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, id: string) => {
			let showValue = parseFloat(event.target.value);

			if (isNaN(showValue)) {
				formik.setFieldValue(id, 0);
				return;
			}

			if (showValue < 0) showValue = 0;
			if (showValue > 100) showValue = 100;

			formik.setFieldValue(id, showValue / 100);
		},
		[formik],
	);

	const handlePrecentageChangeV2 = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>, id: string) => {
			let showValue = parseFloat(event.target.value);
			const newId = `stock.other.${id}`;

			if (isNaN(showValue)) {
				formik.setFieldValue(newId, 0);
				return;
			}

			if (showValue < 0) showValue = 0;
			if (showValue > 100) showValue = 100;

			formik.setFieldValue(newId, showValue / 100);
		},
		[formik],
	);

	const generateItemRender = useCallback(
		(type: 'Buy' | 'Sell') => {
			const side = type === 'Buy' ? 'buy' : 'sell';
			const vieSide = type === 'Buy' ? 'MUA' : 'BÁN';
			return [
				[
					{
						label: `THỜI GIAN KHỚP HẾT LỆNH ${vieSide} (GIÂY)`,
						id: '',
						onChange: (e: any) => {
							{
								const check =
									(type === 'Buy' && isActiveTimeBuy) ||
									(type === 'Sell' && isActiveTimeSell);
								if (check) {
									if (type === 'Buy') {
										setIsActiveTimeBuy(false);
									} else {
										setIsActiveTimeSell(false);
									}
									setFieldValue(`stock_config_time_to_${side}`, 0);
								} else {
									if (type === 'Buy') {
										setIsActiveTimeBuy(true);
									} else {
										setIsActiveTimeSell(true);
									}
								}
							}
						},
						checked:
							(type === 'Buy' && isActiveTimeBuy) ||
							(type === 'Sell' && isActiveTimeSell),
						type: 'Switch',
						isRender: true,
					},
					{
						label: 'THỜI GIẠN SỬA MỘT LỆNH (GIÂY)',
						id: `stock_config_time_update_pid_${side}`,
						type: 'Input',
						isRender: true,
					},
					{
						label: 'BIÊN TRƯỢT',
						id: `stock_config_slippage_${side}`,
						type: 'Input',
						isRender: true,
					},
				],
				[
					{
						label: 'Nhập chỉ số',
						id: `stock_config_time_to_${side}`,
						type: 'Input',
						isRender:
							(type === 'Buy' && isActiveTimeBuy) ||
							(type === 'Sell' && isActiveTimeSell),
					},
					{
						label: `SỐ LÊNH ${vieSide} 1 LẦN`,
						id: `stock_config_number_pid_${side}_once_time`,
						type: 'Input',
						onChange: (e: any) => {
							const { value } = e.target;
							if (!isNaN(value) && value >= 0 && value <= 100) {
								handleNumberBidChange(e, side);
							}
						},
						isRender: true,
					},
					{
						label: `ĐIỀU CHỈNH SAI SỐ GIÁ ĐẶT LỆNH`,
						id: `stock_config_add_price_${side}`,
						type: 'Input',
						isRender: true,
					},
				],
				[
					{
						label: `ĐỘ NHẠY CẢM ${vieSide}`,
						id: `stock_config_is_mode_sensitive_${side}`,
						onChange: (e: any) => formikHandleChange(e),
						checked:
							values.stock.other[
							`stock_config_is_mode_sensitive_${side}` as keyof IStockOtherConfig
							],
						type: 'Switch',
						isRender: true,
					},
					{
						label: 'LƯỢNG CP CHO 1 LẦN LỆNH (%)',
						id: `stock_config_percent_stock_${side}_once_time`,
						type: 'Input',
						onChange: (e: any) => {
							handlePercentageBidChange(e, side);
						},
						value: 100,
						isRender: true,
					},
					{
						label: `% ${vieSide} 1 LẦN/TỔNG KL DỰ KIẾN`,
						id: `stock_config_percent_first_${side}`,
						type: 'Input',
						onChange: (e: any) => {
							handlePrecentageChangeV2(e, `stock_config_percent_first_${side}`);
						},
						value: 100,
						isRender: side === 'buy',
					},
				],
				[
					{
						label: 'Nhập chỉ số',
						id: `stock_config_percent_sensitive_${side}`,
						type: 'Input',
						onChange: (e: any) => {
							handlePrecentageChangeV2(e, `stock_config_percent_sensitive_${side}`);
						},
						value: 100,
						isRender: values.stock.other[`stock_config_is_mode_sensitive_${side}`],
					},
					{
						label: 'CHÊNH LỆCH CHO MỖI LỆNH',
						id: `stock_config_slippage_volume_${side}_per_pid`,
						type: 'Input',
						isRender: true,
					},
				],
			];
		},
		[
			isActiveTimeBuy,
			isActiveTimeSell,
			values.stock.other,
			setFieldValue,
			handleNumberBidChange,
			formikHandleChange,
			handlePercentageBidChange,
			handlePrecentageChangeV2,
		],
	);

	const BuyModule = (
		<Module
			type='Buy'
			label='CÀI ĐẶT KHÁC CHO QUYỀN MUA'
			itemRenders={generateItemRender('Buy')}
			formik={formik}
		/>
	);

	const SellModule = (
		<Module
			type='Sell'
			label='CÀI ĐẶT KHÁC CHO QUYỀN BÁN'
			itemRenders={generateItemRender('Sell')}
			formik={formik}
		/>
	);

	return (
		<div>
			<CardTitle>CẤU HÌNH TUỲ CHỌN</CardTitle>
			<>
				{BuyModule}
				{SellModule}
				<div className='py-4 px-2'>
					<FormGroup
						className='col-12 '
						label='KỊCH BẢN CHỐT LỜI'
						labelClassName='fw-bold text-gray-500'>
						<div className='d-flex col-12 flex-wrap ms-2'>
							<div className='mb-4 col-12 '>
								<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12  '>
										<FormGroup label='BÁN LẦN 1 KHI GIÁ HIỆN TẠI TĂNG SO VỚI GIÁ VỐN '>
											<Checks
												id='stock.other.stock_config_use_take_profit_first_part'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={formik.handleChange}
												checked={
													values.stock.other
														.stock_config_use_take_profit_first_part
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_take_profit_first_part && (
												<FormGroup label='Khi mức giá tăng (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_take_profit_sell_first'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_take_profit_sell_first',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_take_profit_sell_first *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_take_profit_first_part && (
												<FormGroup label='Lượng CP bán (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_take_profit_sell_second'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_take_profit_sell_second',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_take_profit_sell_second *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
								<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12  '>
										<FormGroup label='BÁN LẦN 1 KHI STOCH RSI >='>
											<Checks
												id='stock.other.stock_config_use_stoch_rsi_to_take_profit'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={formik.handleChange}
												checked={
													values.stock.other
														.stock_config_use_stoch_rsi_to_take_profit
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_stoch_rsi_to_take_profit && (
												<FormGroup label='Khi Stoch RSI (>=)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_value_stoch_rsi_to_take_profit'
														onChange={formik.handleChange}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_value_stoch_rsi_to_take_profit
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_stoch_rsi_to_take_profit && (
												<FormGroup label='Lượng CP bán (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_stoch_rsi_to_take_profit'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_stoch_rsi_to_take_profit',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_stoch_rsi_to_take_profit *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
								<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12  '>
										<FormGroup label='BÁN LẦN 1 KHI RSI giảm'>
											<Checks
												id='stock.other.stock_config_use_rsi_decrease_to_take_profit'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={formik.handleChange}
												checked={
													values.stock.other
														.stock_config_use_rsi_decrease_to_take_profit
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_rsi_decrease_to_take_profit && (
												<FormGroup label='Lượng CP bán (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_rsi_decrease_to_take_profit'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_rsi_decrease_to_take_profit',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_rsi_decrease_to_take_profit *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
								<div className='col-12 mb-5 d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12  '>
										<FormGroup label='BÁN LẦN 1 KHI GIÁ HIỆN TẠI CHẠM CẠNH TRÊN BOLLINGER (CHART THEO DÕI) '>
											<Checks
												id='stock.other.stock_config_use_bolinger_a_part_to_take_profit'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={formik.handleChange}
												checked={
													values.stock.other
														.stock_config_use_bolinger_a_part_to_take_profit
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_bolinger_a_part_to_take_profit && (
												<FormGroup label='Lượng CP bán (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_bolinger_a_part_to_take_profit'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_bolinger_a_part_to_take_profit',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_bolinger_a_part_to_take_profit *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
							</div>
							<div className='mb-4 col-12 '>
								<div className='col-12 mb-5  d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12  '>
										<FormGroup label='BÁN LẦN 2 KHI GIÁ HIỆN TẠI TĂNG SO VỚI GIÁ VỐN '>
											<Checks
												id='stock.other.stock_config_use_take_profit_first_part_two'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={formik.handleChange}
												checked={
													values.stock.other
														.stock_config_use_take_profit_first_part_two
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>

									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_take_profit_first_part_two && (
												<FormGroup label='Khi mức giá tăng (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_take_profit_sell_first_two'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_take_profit_sell_first_two',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_take_profit_sell_first_two *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
									<div className='col-xl-2 col-lg-5 col-12 '>
										{values.stock.other
											.stock_config_use_take_profit_first_part_two && (
												<FormGroup label='Lượng CP bán (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_percent_take_profit_sell_second_two'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_percent_take_profit_sell_second_two',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_percent_take_profit_sell_second_two *
															100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
								<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
									<div className='col-xl-3 col-lg-5 col-12 mb-4'>
										<FormGroup label='BÁN HẾT KHI GIÁ HIỆN TẠI TĂNG SO VỚI GIÁ VỐN '>
											<Checks
												id='stock.other.stock_config_use_take_profit_trigger'
												type='switch'
												label='Active'
												style={{
													display: 'flex',
													alignItems: 'center',
												}}
												onChange={(e: any) => handleChange(e, formik)}
												checked={
													values.stock.other
														.stock_config_use_take_profit_trigger
												}
												ariaLabel='status'
											/>
										</FormGroup>
									</div>

									<div className='col-xl-2 col-lg-5 col-12 mb-4'>
										{values.stock.other
											.stock_config_use_take_profit_trigger && (
												<FormGroup label='Khi mức giá tăng (%)'>
													<Input
														type='text'
														placeholder='Nhập chỉ số'
														autoComplete='volume'
														id='stock.other.stock_config_take_profit_percent'
														onChange={(e: any) => {
															handlePrecentageChange(
																e,
																'stock.other.stock_config_take_profit_percent',
															);
														}}
														onBlur={formik?.handleBlur}
														value={
															values.stock.other
																.stock_config_take_profit_percent * 100
														}
														min={0}
														isValid={formik?.isValid}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											)}
									</div>
								</div>
							</div>
						</div>
					</FormGroup>
				</div>
			</>
		</div>
	);
};

export default CustomConfig;
