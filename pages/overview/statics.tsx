import classNames from 'classnames';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import Icon from '@components/icon/Icon';
import { useEffect, useState } from 'react';
import { useGetTransactions } from '@hooks/useGetCreateConfig';
import { compactBalance } from '@helpers/helpers';

const Statics = () => {
	const { darkModeStatus } = useDarkMode();
	const useTransactions = useGetTransactions();
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [totalTransaction, setTotalTransaction] = useState(0);
	const [totalBuy, setTotalBuy] = useState(0);
	const [totalSell, setTotalSell] = useState(0);
	const [totalVolume, setTotalVolume] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const transactions = await useTransactions;
			setTotalTransaction(transactions?.length);
			let volume = 0;
			let buy = 0;
			let sell = 0;
			transactions?.data?.map((trans: any) => {
				if (trans?.signal_type == 'buy') {
					buy += trans.volume;
				} else {
					sell += trans.volume;
				}
				volume += trans?.volume;
			});
			setTotalVolume(volume);
			setTotalBuy(buy);
			setTotalSell(sell);
			setFilteredData(transactions);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardLabel icon='ShowChart' iconColor='secondary'>
					<CardTitle>Statics</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<div className='row rg-15 g-4 align-items-center'>
					<div className='col-md-6 col-lg-3 mt-0'>
						<div
							className={classNames(
								'd-flex align-items-center rounded-2 p-4 pt-5 pb-5 m-auto',
								{
									'bg-l10-success': !darkModeStatus,
									'bg-lo25-success': darkModeStatus,
								},
							)}>
							<div className='flex-shrink-0'>
								<Icon icon='Done' size='3x' color='success' />
							</div>
							<div className='flex-grow-1 ms-3'>
								<div className='fw-bold  mb-0'>{totalTransaction}</div>
								<div className='text-muted mt-n2'>Tổng số lệnh</div>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-lg-3 mt-0'>
						<div
							className={classNames(
								'd-flex align-items-center rounded-2 p-4 pt-5 pb-5 m-auto',
								{
									'bg-l10-info': !darkModeStatus,
									'bg-lo25-info': darkModeStatus,
								},
							)}>
							<div className='flex-shrink-0'>
								<Icon icon='Speed' size='3x' color='info' />
							</div>
							<div className='flex-grow-1 ms-3'>
								<div className='fw-bold  mb-0'>
									{compactBalance(totalVolume.toString())}
								</div>
								<div className='text-muted mt-n2 truncate-line-1'>
									Tổng volume giao dịch
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-lg-3 mt-0'>
						<div
							className={classNames(
								'd-flex align-items-center rounded-2 p-4 pt-5 pb-5 m-auto',
								{
									'bg-l10-primary': !darkModeStatus,
									'bg-lo25-primary': darkModeStatus,
								},
							)}>
							<div className='flex-shrink-0'>
								<Icon icon='Download' size='3x' color='primary' />
							</div>
							<div className='flex-grow-1 ms-3'>
								<div className='fw-bold  mb-0'>
									{compactBalance(totalBuy.toString())}
								</div>
								<div className='text-muted mt-n2 truncate-line-1'>
									Tổng số tiền mua
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-6 col-lg-3 mt-0'>
						<div
							className={classNames(
								'd-flex align-items-center rounded-2 p-4 pt-5 pb-5 m-auto',
								{
									'bg-l10-warning': !darkModeStatus,
									'bg-lo25-warning': darkModeStatus,
								},
							)}>
							<div className='flex-shrink-0'>
								<Icon icon='DoneAll' size='3x' color='warning' />
							</div>
							<div className='flex-grow-1 ms-3'>
								<div className='fw-bold  mb-0'>{totalSell} </div>
								<div className='text-muted mt-n2 truncate-line-1'>
									Tổng số tiền bán
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Statics;
