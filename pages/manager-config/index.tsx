import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import useDarkMode from '../../hooks/useDarkMode';
import { useGetTemplateConfig } from '@hooks/useGetCreateConfig';
import DeleteConfig from './DeleteConfigModal';
import FormConfig from '@components/FormConfig';
import ModalConfirm from '../overview/ModalCofirmOTP';
import { transformBaseConfig } from '../../utils/helper';
import { IBaseConfig } from '@components/FormConfig/interface';

const TemplateConfiguration: NextPage = () => {
	const [config, setConfig] = useState<IBaseConfig>();
	const [toggleModal, setToggleModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const getTemplate = useGetTemplateConfig();

	const fetchData = useCallback(async () => {
		const template = await getTemplate;

		const data = transformBaseConfig(template);
		setConfig(Object.keys(template).length ? data : undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (refetch) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetch]);

	return (
		<PageWrapper className='page-overview'>
			<Head>
				<title>{config ? 'Chỉnh sửa cấu hình' : 'Thêm'}</title>
			</Head>
			<Page>
				<div>
					<FormConfig
						title='CẤU HÌNH CỔ PHIẾU'
						config={config}
						setConfig={setConfig}
						setRefetch={setRefetch}
					/>
				</div>
			</Page>
			<ModalConfirm isOpen={isOpen} setIsOpen={setIsOpen} account={'abc'} />

			<DeleteConfig setIsOpen={setToggleModal} isOpen={toggleModal} config={config} />
		</PageWrapper>
	);
};

export default TemplateConfiguration;
