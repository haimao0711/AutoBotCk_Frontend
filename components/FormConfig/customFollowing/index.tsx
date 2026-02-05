import { useEffect, useState, useCallback } from 'react';
import { FormikProps } from 'formik';
import Checks from '@components/bootstrap/forms/Checks';
import { CardTitle } from '@components/bootstrap/Card';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import Input from '@components/bootstrap/forms/Input';
import { IBaseConfig, IStockOtherConfig } from '../interface';
import { handleChange } from '..';
import DaysPicker from './DayPicker';

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
const CustomFollowingConfig = ({ formik }: CustomConfigProps) => {
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

	return (
		<div>
			<CardTitle>CÀI ĐẶT THỜI GIAN MUA BÁN</CardTitle>
			<div className='py-4 px-2'>
				<FormGroup>
					<div className='col-12 d-flex flex-wrap gap-4'>
						<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
							<div className='col-xl-3 col-lg-3 col-12 mb-3'>
								<FormGroup label='SỬ DỤNG THỜI GIAN MUA ' labelClassName='fw-bold'>
									<Checks
										id='stock.other.stock_config_is_use_time_to_buy'
										type='switch'
										label='Active'
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
										onChange={(e: any) => handleChange(e, formik)}
										checked={values.stock.other.stock_config_is_use_time_to_buy}
										ariaLabel='status'
									/>
								</FormGroup>
							</div>
							{values.stock.other.stock_config_is_use_time_to_buy && (
								<>
									<div className='col-xl-3 col-lg-3 col-12 mb-3'>
										<div className='fw-bold text-primary mb-2'>Khung giờ 1</div>
										<FormGroup label='Giờ bắt đầu'>
											<Input
												type='time'
												autoComplete='volume'
												id='stock.other.stock_config_time_start_buy'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other.stock_config_time_start_buy
												}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup label='Giờ kết thúc'>
											<Input
												type='time'
												placeholder='Nhập chỉ số'
												autoComplete='volume'
												id='stock.other.stock_config_time_end_buy'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={values.stock.other.stock_config_time_end_buy}
												min={0}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-3 col-lg-3 col-12 mb-3'>
										<div className='fw-bold text-primary mb-2'>Khung giờ 2</div>
										<FormGroup label='Giờ bắt đầu'>
											<Input
												type='time'
												autoComplete='volume'
												id='stock.other.stock_config_time_start_buy_second'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other.stock_config_time_start_buy_second
												}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup label='Giờ kết thúc'>
											<Input
												type='time'
												placeholder='Nhập chỉ số'
												autoComplete='volume'
												id='stock.other.stock_config_time_end_buy_second'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={values.stock.other.stock_config_time_end_buy_second}
												min={0}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<DaysPicker
										label='Chọn ngày mua'
										labelClassName='fw-bold text-primary'
										value={values.stock.other.stock_config_days_buy}
										onChange={(val) =>
											formik.setFieldValue(
												'stock.other.stock_config_days_buy',
												val,
											)
										}
									/>
								</>
							)}
						</div>
						<div className='col-12 mb-4 d-flex gap-4 flex-wrap'>
							<div className='col-xl-3 col-lg-3 col-12 mb-4'>
								<FormGroup label='SỬ DỤNG THỜI GIAN BÁN ' labelClassName='fw-bold'>
									<Checks
										id='stock.other.stock_config_is_use_time_to_sell'
										type='switch'
										label='Active'
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
										onChange={(e: any) => handleChange(e, formik)}
										checked={
											values.stock.other.stock_config_is_use_time_to_sell
										}
										ariaLabel='status'
									/>
								</FormGroup>
							</div>
							{values.stock.other.stock_config_is_use_time_to_sell && (
								<>
									<div className='col-xl-3 col-lg-3 col-12 mb-4'>
										<div className='fw-bold text-primary mb-2'>Khung giờ 1</div>
										<FormGroup label='Giờ bắt đầu'>
											<Input
												type='time'
												autoComplete='volume'
												id='stock.other.stock_config_time_start_sell'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other.stock_config_time_start_sell
												}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup label='Giờ kết thúc'>
											<Input
												type='time'
												placeholder='Nhập chỉ số'
												autoComplete='volume'
												id='stock.other.stock_config_time_end_sell'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other.stock_config_time_end_sell
												}
												min={0}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-xl-3 col-lg-3 col-12 mb-4'>
										<div className='fw-bold text-primary mb-2'>Khung giờ 2</div>
										<FormGroup label='Giờ bắt đầu'>
											<Input
												type='time'
												autoComplete='volume'
												id='stock.other.stock_config_time_start_sell_second'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other
														.stock_config_time_start_sell_second
												}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										<FormGroup label='Giờ kết thúc'>
											<Input
												type='time'
												placeholder='Nhập chỉ số'
												autoComplete='volume'
												id='stock.other.stock_config_time_end_sell_second'
												onChange={formik?.handleChange}
												onBlur={formik?.handleBlur}
												value={
													values.stock.other
														.stock_config_time_end_sell_second
												}
												min={0}
												isValid={formik?.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<DaysPicker
										label='Chọn ngày bán'
										labelClassName='fw-bold text-primary'
										value={values.stock.other.stock_config_days_sell}
										onChange={(val) =>
											formik.setFieldValue(
												'stock.other.stock_config_days_sell',
												val,
											)
										}
									/>
								</>
							)}
						</div>
					</div>
				</FormGroup>
			</div>
		</div>
	);
};

export default CustomFollowingConfig;
