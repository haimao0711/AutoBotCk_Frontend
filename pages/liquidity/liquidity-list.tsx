import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import PaginationButtons, { PER_COUNT } from '@components/PaginationButtons';
import Button from '@components/bootstrap/Button';
import { useState } from 'react';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '@components/bootstrap/Dropdown';

const filteredData = [
	{
		amount: '1.0000 OPV',
		usdtAmount: '200 USDT',
		walletAddress: '123344...455667 ',
		time: '12/6/2023 - 23:11',
	},
	{
		amount: '1.0000 OPV',
		usdtAmount: '200 USDT',
		walletAddress: '123344...455667 ',
		time: '12/6/2023 - 23:11',
	},
	{
		amount: '1.0000 OPV',
		usdtAmount: '200 USDT',
		walletAddress: '123344...455667 ',
		time: '12/6/2023 - 23:11',
	},
	{
		amount: '1.0000 OPV',
		usdtAmount: '200 USDT',
		walletAddress: '123344...455667 ',
		time: '12/6/2023 - 23:11',
	},
	{
		amount: '1.0000 OPV',
		usdtAmount: '200 USDT',
		walletAddress: '123344...455667 ',
		time: '12/6/2023 - 23:11',
	},
];

const LiquidityList = () => {
	const { darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel icon='AssignmentTurnedIn' iconColor='secondary'>
					<CardTitle>LP History</CardTitle>
				</CardLabel>
			</CardHeader>

			<CardBody isScrollable className='table-responsive'>
				<table style={{ minWidth: '1000px' }} className='table table-modern table-hover'>
					<thead>
						<tr className='text-center'>
							<th>ID</th>
							<th>Time</th>
							<th>Wallet address</th>
							<th colSpan={2}>Amount</th>
						</tr>
					</thead>
					<tbody>
						{filteredData?.map((item, index) => (
							<>
								<tr className='text-center'>
									<td>{index + (currentPage - 1) * perPage + 1}</td>
									<td>{item?.time}</td>
									<td>{item?.walletAddress}</td>
									<td>{item?.amount}</td>
									<td>{item?.usdtAmount}</td>
								</tr>
							</>
						))}
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

export default LiquidityList;
