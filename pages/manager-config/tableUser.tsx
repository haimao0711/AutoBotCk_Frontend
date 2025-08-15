import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';
import Button from '@components/bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '@components/bootstrap/Dropdown';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '@layout/SubHeader/SubHeader';
import Input from '@components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import Checks from '@components/bootstrap/forms/Checks';
import Label from '@components/bootstrap/forms/Label';
import Icon from '@components/icon/Icon';
import { compactBalance } from '@helpers/helpers';
import { useRouter } from 'next/router';
import ConfigContext from '@context/configContext';
import { authService } from '@services/index';
import { useGetTemplateConfig } from '@hooks/useGetCreateConfig';

const TableUser = () => {
	const router = useRouter();
	const { darkModeStatus } = useDarkMode();
	const { arrConfig, setArrayConfig, setArrayStocks } = useContext(ConfigContext);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [arrTemplate, setArrayTemplate] = useState<any>([]);
	const getTemplate = useGetTemplateConfig();
	const [filterMenu, setFilterMenu] = useState(false);
	const formik = useFormik({
		initialValues: {
			status: false,
			searchInput: '',
			services: [],
		},
		onSubmit: (values) => {
			setFilterMenu(false);
		},
	});
	useEffect(() => {
		async function fetchData() {
			const { stocks, userConfigs } = await authService.getConfig();
			setArrayStocks(stocks);

			const template = await getTemplate;
			const formatConfig = userConfigs?.map((config: any) => {
				const stock = stocks.find((item: any) => {
					return config?.stock_id == item?.id;
				});
				return { ...config, name: stock.name };
			});
			setArrayConfig(formatConfig);
		}
		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setArrayConfig, setArrayStocks]);

	useEffect(() => {
		async function fetchData() {
			const template = await getTemplate;
			setArrayTemplate(template?.data);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='PersonSearch' iconColor='secondary'>
					<CardTitle>Quản lí template</CardTitle>
				</CardLabel>
			</CardHeader>

			<div className='pl-5 pr-5 mt-4 mb-4'>
				<SubHeader>
					<SubHeaderLeft>
						<label
							className='border-0 bg-transparent cursor-pointer me-0'
							htmlFor='searchInput'>
							<Icon icon='Search' size='2x' color='primary' />
						</label>
						<Input
							id='searchInput'
							type='search'
							className='border-0 shadow-none bg-transparent'
							placeholder='Search...'
							onChange={formik?.handleChange}
							value={formik?.values.searchInput}
						/>
					</SubHeaderLeft>
					<SubHeaderRight>
						<Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
							<DropdownToggle hasIcon={false}>
								<Button icon='FilterAlt' color='primary' isLight />
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd size='lg' isCloseAfterLeave={false}>
								<div className='container py-2'>
									<form className='row g-3' onSubmit={formik?.handleSubmit}>
										<div className='col-12'>
											<FormGroup>
												<Label htmlFor='status'>Status</Label>
												<Checks
													id='status'
													type='switch'
													label='Active'
													onChange={formik?.handleChange}
													checked={formik?.values.status}
													ariaLabel='status'
												/>
											</FormGroup>
										</div>
										<div className='col-6'>
											<Button
												color='primary'
												isOutline
												className='w-100'
												onClick={formik?.resetForm}>
												Reset
											</Button>
										</div>
										<div className='col-6'>
											<Button color='primary' className='w-100' type='submit'>
												Filter
											</Button>
										</div>
									</form>
								</div>
							</DropdownMenu>
						</Dropdown>
					</SubHeaderRight>
				</SubHeader>
			</div>

			<CardBody isScrollable className='table-responsive'>
				<table style={{ minWidth: '1000px' }} className='table table-modern table-hover'>
					<thead>
						<tr>
							<th>id</th>
							<th>Mã cổ phiếu</th>
							<th>VNINDEX Mua</th>
							<th>VNINDEX Bán</th>
							<th>Stock Mua</th>
							<th>Stock Bán</th>
							<th>Chốt lời</th>
							<th>Cắt lỗ</th>
							<td />
						</tr>
					</thead>
					<tbody>
						{arrTemplate.map((item: any) => (
							<tr key={item.id}>
								<td>{item?.id}</td>
								<td>{item?.name}</td>
								<td>
									{item?.is_use_vnindex_config && item?.is_buy ? 'True' : 'False'}
								</td>
								<td>
									{item?.is_use_vnindex_config && item?.is_sell
										? 'True'
										: 'False'}
								</td>
								<td>
									{item?.is_use_stock_config && item?.is_buy ? 'True' : 'False'}
								</td>
								<td>
									{item?.is_use_stock_config && item?.is_sell ? 'True' : 'False'}
								</td>
								<td>
									{item?.stock_config.use_take_profit_first_part &&
									item?.stock_config.use_take_profit_second_part
										? 'True'
										: 'False'}
								</td>
								<td>
									{item?.stock_config.use_stop_loss_first_part &&
									item?.stock_config.use_stop_loss_second_part
										? 'True'
										: 'False'}
								</td>

								<td>
									<Dropdown>
										<DropdownToggle hasIcon={false}>
											<Button
												icon='MoreHoriz'
												color='dark'
												isLight
												shadow='sm'
											/>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd>
											<DropdownItem>
												<Button
													icon='TaskAlt'
													tag='a'
													onClick={() =>
														router.push(`/edit-config/${item.id}`)
													}>
													Chi tiết
												</Button>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</CardBody>
			<PaginationButtons
				data={arrConfig}
				label='customers'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</Card>
	);
};

export default TableUser;
