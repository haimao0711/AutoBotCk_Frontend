import React, { ReactNode } from 'react';

type FormItem = {
	children: ReactNode;
	label?: string;
	required?: boolean;
};

const FormItem = ({ children, label = '', required = false }: FormItem) => {
	return (
		<div className='d-flex flex-column gap-2 form__item'>
			{label && (
				<div className='d-flex align-items-center gap-1'>
					<p className='fw-bold form__item-label mb-0'>{label}</p>
					{required && <span className='text-danger form__item-required'>*</span>}
				</div>
			)}

			{children}
		</div>
	);
};

export default FormItem;
