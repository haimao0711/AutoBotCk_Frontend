import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';
import Button from '@components/bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
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
import DetailtModal from './DetailtModal';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import { useGetTransactions } from '@hooks/useGetCreateConfig';

const filteredData = [
	{
		id: 1,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'thành công',
	},
	{
		id: 2,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'từ chối',
	},
	{
		id: 3,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'thành công',
	},
	{
		id: 4,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'Chờ duyệt',
	},
	{
		id: 5,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'thành công',
	},
	{
		id: 6,
		action: 'tuilatho3107@gmail.com',
		amount: '1.0000 OPV',
		fromAddress: '123344...455667',
		toAddress: '123344...455667',
		time: '12/6/2023 - 23:11',
		status: 'thành công',
	},
];

const TableTransactions = () => {
	const { darkModeStatus } = useDarkMode();

	const { addToast } = useToasts();
	const getTransaction = useGetTransactions();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [filterMenu, setFilterMenu] = useState(false);
	const [transactions, setTransactions] = useState<any>([]);
	const [toggleModal, setToggleModal] = useState<any>({
		toggle: false,
		data: {},
	});

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

	const handleApproveTransaction = useCallback(
		(item: any) => {
			setToggleModal({
				toggle: false,
				data: {},
			});

			addToast(
				<Toasts
					title='Transaction notifications'
					iconColor='success'
					icon='TaskAlt'
					isDismiss>
					successful transaction approval
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		},
		[addToast],
	);

	useEffect(() => {
		async function fetchData() {
			const data = await getTransaction;
			setTransactions(data);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRejectTransaction = useCallback(
		(item: any) => {
			setToggleModal({
				toggle: false,
				data: {},
			});

			addToast(
				<Toasts
					title='Transaction notifications'
					iconColor='danger'
					icon='Cancel'
					isDismiss>
					Reject successful transaction
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		},
		[addToast],
	);
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AttachMoney' iconColor='secondary'>
					<CardTitle>Quản lí giao dịch</CardTitle>
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
							<th>Tài khoản Vps</th>
							<th>Stock name</th>
							<th>Volume</th>
							<th>Price</th>
							<th>Time</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{transactions?.data?.length == 0 ? (
							<tr>Have no data</tr>
						) : (
							transactions?.data?.map((item: any) => (
								<tr key={item.id}>
									<td>user1</td>
									<td>{item?.stock_symbol}</td>
									<td>{item?.volume}</td>
									<td>{item?.price}</td>
									<td>9:30:00 22/11/2023</td>
									<td>{item?.signal_type}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</CardBody>
			<PaginationButtons
				data={filteredData}
				label='customers'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>

			<DetailtModal
				setIsOpen={setToggleModal}
				isOpen={toggleModal}
				handleApproveTransaction={handleApproveTransaction}
				handleRejectTransaction={handleRejectTransaction}
			/>
		</Card>
	);
};

export default TableTransactions;
