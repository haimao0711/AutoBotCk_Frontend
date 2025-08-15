import classNames from 'classnames';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '@components/bootstrap/Card';
import useDarkMode from '@hooks/useDarkMode';
import Icon from '@components/icon/Icon';
import styled from 'styled-components';
import { useEffect } from 'react';
const ChartStyled = styled.div`
	.chart {
		height: 578px;
	}
	@media (max-width: 480px) {
		.chart {
			height: 300px;
		}
	}
`;

const TradingView = () => {
	const { darkModeStatus } = useDarkMode();

	return (
		<Card>
			<CardHeader>
				<CardLabel icon='ShowChart' iconColor='secondary'>
					<CardTitle>Trading View</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<ChartStyled>
					<div className='row rg-15 g-4 align-items-center'>
						<iframe
							title='chart'
							src='https://stockchart.vietstock.vn/'
							className='chart'
							width='100%'
						/>
					</div>
				</ChartStyled>
			</CardBody>
		</Card>
	);
};

export default TradingView;
