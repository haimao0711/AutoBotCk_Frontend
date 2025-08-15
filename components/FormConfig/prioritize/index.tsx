import { FormikProps } from 'formik';
import Checks from '@components/bootstrap/forms/Checks';
import styled from 'styled-components';
import Card, { CardBody } from '@components/bootstrap/Card';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import {
	IBaseConfig,
	IPriorityBase,
	IStockBuyPriorityConfig,
	IStockSellPriorityConfig,
	IVNIndexBuyPriorityConfig,
	IVNIndexSellPriorityConfig,
	IVNIndexSharing,
} from '../interface';
import { MAPING_NAME_ATTR } from '../constants';
import { generateKey } from '../../../utils/helper';

interface ModalPrioritizeProps {
	formik: FormikProps<IBaseConfig>;
}

type T =
	| IVNIndexBuyPriorityConfig
	| IVNIndexSellPriorityConfig
	| IStockBuyPriorityConfig
	| IStockSellPriorityConfig;

type TitleDataTypes = {
	title: string;
	type: string;
	side: string;
	isRender: boolean;
};

const TableStyle = styled.div`
	font-size: 12px;
`;

const FormPrioStyled = styled.div`
	.rc-time-picker-panel,
	.rc-time-picker-panel-inner {
		color: red !important;
	}
	@media (max-width: 480px) {
		.card-body-mobile {
			padding: 0;
			.abc {
				padding: 8px;
			}
		}
	}
`;
const FormStyled = styled.div`
	.rc-time-picker-panel,
	.rc-time-picker-panel-inner {
		color: red !important;
	}
	.form-check {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		.form-check-input {
			font-size: 16px;
		}
	}
	@media (max-width: 480px) {
		.card-body-mobile {
			padding: 0;
			.abc {
				padding: 8px;
			}
		}
		.form-check {
			display: flex;
			align-items: center;
		}
	}
`;
const ModalPrioritize = ({ formik }: ModalPrioritizeProps) => {
	const { values, handleChange } = formik;
	const titleTable: TitleDataTypes[] = [
		{
			title: 'VNINDEX MUA',
			type: 'vnindex',
			side: 'buy',
			isRender: values.base.config_is_use_vnindex_config && values.base.config_is_buy,
		},
		{
			title: 'VNINDEX BÁN',
			type: 'vnindex',
			side: 'sell',
			isRender: values.base.config_is_use_vnindex_config && values.base.config_is_sell,
		},
		{
			title: 'STOCK MUA',
			type: 'stock',
			side: 'buy',
			isRender: values.base.config_is_use_stock_config && values.base.config_is_buy,
		},
		{
			title: 'STOCK BÁN',
			type: 'stock',
			side: 'sell',
			isRender: values.base.config_is_use_stock_config && values.base.config_is_sell,
		},
	];

	return (
		<TableStyle>
			<Card>
				<FormPrioStyled>
					<FormStyled>
						<CardBody className='abc'>
							<div className='row g-4'>
								<div className='col-lg-12'>
									<FormGroup
										className='col-12 overflow-auto'
										id='id_account'
										label='Thứ tự ưu tiên'>
										<table
											className='table table-modern table-hover table-account'
											style={{ minWidth: '390px' }}>
											<thead>
												<tr>
													<th>LOẠI ĐIỀU KIỆN </th>
													<th style={{ minWidth: '116px' }}>
														ĐIỀU KIỆN CẦN
													</th>
													<th style={{ minWidth: '116px' }}>
														ĐIỀU KIỆN ĐỦ{' '}
													</th>
												</tr>
											</thead>

											{titleTable.map(
												(title, index) =>
													title.isRender && (
														<tbody
															key={index}
															style={{
																fontSize: '9px',
																marginBottom: '12px',
															}}>
															<tr>
																<th
																	colSpan={3}
																	style={{
																		textAlign: 'center',
																		fontSize: '16px',
																	}}>
																	{title.title}
																</th>
															</tr>
															{Object.entries(MAPING_NAME_ATTR).map(
																([key, value]) => {
																	const baseKey =
																		generateKey(key);
																	const renderCondition =
																		values[
																			title.type as keyof IVNIndexSharing
																		][title.side as keyof T][
																			key
																		];
																	const necessary =
																		values.priority[
																			title.type as keyof IPriorityBase
																		][title.side as keyof T][
																			`${baseKey}_necessary_condition`
																		];
																	const sufficient =
																		values.priority[
																			title.type as keyof IPriorityBase
																		][title.side as keyof T][
																			`${baseKey}_sufficient_condition`
																		];

																	if (renderCondition) {
																		return (
																			<tr
																				key={key}
																				style={{
																					fontSize: '9px',
																				}}>
																				<th>
																					{value.name}
																				</th>
																				<th>
																					<Checks
																						id={`priority.${title.type}.${title.side}.${baseKey}_necessary_condition`}
																						type='switch'
																						label='Active'
																						style={{
																							display:
																								'flex',
																							alignItems:
																								'center',
																						}}
																						onChange={
																							handleChange
																						}
																						checked={
																							necessary
																						}
																						ariaLabel='status'
																					/>
																				</th>
																				<th>
																					<Checks
																						id={`priority.${title.type}.${title.side}.${baseKey}_sufficient_condition`}
																						type='switch'
																						label='Active'
																						style={{
																							display:
																								'flex',
																							alignItems:
																								'center',
																						}}
																						onChange={
																							handleChange
																						}
																						checked={
																							sufficient
																						}
																						ariaLabel='status'
																					/>
																				</th>
																			</tr>
																		);
																	}
																},
															)}
														</tbody>
													),
											)}
										</table>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</FormStyled>
				</FormPrioStyled>
			</Card>
		</TableStyle>
	);
};

export default ModalPrioritize;
