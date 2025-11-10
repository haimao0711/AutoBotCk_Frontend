import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetConfigurationDetailsForStockAndTradeType } from '@hooks/useGetCreateConfig';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import DeleteConfigModal from './DeleteConfigModal';
import ModalConfirm from '../../overview/ModalCofirmOTP';
import { transformBaseConfig } from '../../../utils/helper';
import { IBaseConfig } from '@components/FormConfig/interface';
import FormConfig from './form';

const Index: NextPage = () => {
	const router = useRouter();
	const { slug, id } = router.query;
	const [config, setConfig] = useState<IBaseConfig>();
	const [toggleModal, setToggleModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const getConfiguration = useGetConfigurationDetailsForStockAndTradeType(id, slug);
	const fetchData = useCallback(async () => {
		const userConfigs = (await getConfiguration).data;
		const data = transformBaseConfig(userConfigs);

		setConfig(Object.keys(userConfigs).length ? data : undefined);
	}, [getConfiguration]);

	useEffect(() => {
		if (refetch) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetch]);

	useEffect(() => {
		slug && id && fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, slug]);

	return (
		<PageWrapper className='page-overview'>
			<Head>
				<title>Chỉnh sửa cấu hình</title>
			</Head>
			<Page>
				<div>
					<FormConfig
						title={`CHỈNH SỬA SỔ PHIẾU`}
						config={config}
						setRefetch={setRefetch}
						setConfig={setConfig}
					/>
				</div>
			</Page>
			<ModalConfirm isOpen={isOpen} setIsOpen={setIsOpen} account={'abc'} />

			<DeleteConfigModal setIsOpen={setToggleModal} isOpen={toggleModal} stocks={config} />
		</PageWrapper>
	);
};

export default Index;
