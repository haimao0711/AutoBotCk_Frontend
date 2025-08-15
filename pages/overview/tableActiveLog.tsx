import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';
import Button from '@components/bootstrap/Button';
import { useEffect, useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '@components/bootstrap/Dropdown';
import { compactBalance } from '@helpers/helpers';
import { useRouter } from 'next/router';
import { useGetTransactions } from '@hooks/useGetCreateConfig';
import { authService } from '@services/index';

const TableActiveLog = () => {
	const router = useRouter();
	const { darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const useTransactions = useGetTransactions();
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [arrayRender, setArrayRender] = useState<any[]>([]);

	useEffect(() => {
		async function fetchData() {
			const transactions = await useTransactions;
			setFilteredData(transactions?.data);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setArrayRender(filteredData?.slice((currentPage - 1) * perPage, currentPage * perPage));
	}, [currentPage, perPage, filteredData]);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AssignmentTurnedIn' iconColor='secondary'>
					<CardTitle>Lịch sử giao dịch</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody isScrollable className='table-responsive'>
				<table
					style={{ textAlign: 'center', minWidth: '1000px' }}
					className='table table-modern table-hover'>
					<thead>
						<tr>
							<th>Thời gian </th>
							<th>Mã cổ phiếu</th>
							<th>Tài khoản VPS</th>
							<th>Lệnh</th>
							<th>Khối lượng</th>
							<th>Khối lượng khớp lệnh</th>
							<th>Giá</th>
							<th>Phí</th>
							<td />
						</tr>
					</thead>
					<tbody>
						{arrayRender?.length > 0 ? (
							arrayRender?.map((item, index) => (
								<tr key={item?.id} style={{ fontWeight: 'bold' }}>
									<td>{index + (currentPage - 1) * perPage}</td>
									<td>{item?.created_at}</td>
									<td style={{ color: 'green' }}>{item?.stock.toUpperCase()}</td>
									<td>{item?.vps_account_name}</td>
									<td
										style={
											item?.pid_type == 'sell'
												? { color: 'red' }
												: { color: 'green' }
										}>
										{item?.pid_type.toUpperCase()}
									</td>
									<td>{item?.volume_set}</td>
									<td>{item?.volume_match}</td>
									<td>{item?.price_pid}</td>
									<td>{item?.fee_pid}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={8}>Have no data</td>
							</tr>
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
		</Card>
	);
};

export default TableActiveLog;
