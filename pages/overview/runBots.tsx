import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import { FC, useState } from 'react';
import Form from './form';
import styled from 'styled-components';

const FormStyled = styled.div`
	.abc {
		padding: 0;
	}
	tr,
	th,
	td {
		border: 1px solid #ccc;
		text-align: center;
		font-weight: bold;
	}
	th {
		font-size: 10px;
		font-weight: bold;
	}
	thead {
		th {
			font-weight: bold;
		}
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

const RunBot: FC<any> = ({
	isExistStock,
	setIsOpenEdit,
	isOpen,
	isBlockBuy,
	isBlockSell,
	setInfo,
	setIsOpenDelete,
	isOptions,
	setIsOptions,
}) => {
	const { darkModeStatus } = useDarkMode();
	const [stocks, setStocks] = useState();
	return (
		<Card>
			<CardHeader>
				<CardLabel icon='Settings' iconColor='secondary'>
					<CardTitle>
						{isExistStock ? 'Cổ phiếu hiện có trong tài khoản' : 'Thông tin cổ phiếu'}
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<FormStyled>
				<CardBody className='card-body-mobile'>
					<div className='row rg-15 g-4 align-items-center'>
						<Form
							isExistStock={isExistStock}
							setIsOpenEdit={setIsOpenEdit}
							stocks={stocks}
							isOpen={isOpen}
							isBlockBuy={isBlockBuy}
							isBlockSell={isBlockSell}
							setInfo={setInfo}
							setIsOpenDelete={setIsOpenDelete}
							isOptions={isOptions}
							setIsOptions={setIsOptions}
						/>
					</div>
				</CardBody>
			</FormStyled>
		</Card>
	);
};

export default RunBot;
