import React from 'react';
import FormGroup from '@components/bootstrap/forms/FormGroup';

interface DaysPickerProps {
	label: string;
	value: string; // DB string: 1=Thứ 2 ... 7=CN
	onChange: (val: string) => void;
}

const dayLabels = ['2', '3', '4', '5', '6', '7', 'CN'];

// Map front-end label -> DB value
const labelToDbValue = (day: string) => {
	if (day === 'CN') return '7';
	// Thứ 2 → 1, Thứ 3 → 2, ..., Thứ 7 → 6
	return (parseInt(day) - 1).toString();
};

const DaysPicker: React.FC<DaysPickerProps> = ({ label, value, onChange }) => {
	const handleToggleDay = (day: string) => {
		const dbValue = labelToDbValue(day);
		let newValue = value ? value.split('') : [];

		if (newValue.includes(dbValue)) {
			// Bỏ ngày đã chọn
			newValue = newValue.filter((v) => v !== dbValue);
		} else {
			// Thêm ngày mới
			newValue.push(dbValue);
		}

		// Sắp xếp theo thứ tự 1->7 để luôn đồng bộ
		newValue.sort((a, b) => parseInt(a) - parseInt(b));

		const newValueStr = newValue.join('');
		onChange(newValueStr);
	};
	return (
		<FormGroup label={label}>
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				{dayLabels.map((day) => {
					const selected = value?.includes(labelToDbValue(day));
					return (
						<div
							key={day}
							style={{
								width: '32px',
								height: '32px',
								lineHeight: '32px',
								textAlign: 'center',
								borderRadius: '50%',
								cursor: 'pointer',
								userSelect: 'none',
								backgroundColor: selected ? '#5FD068' : 'transparent',
								color: selected ? 'white' : 'white',
								borderColor: selected ? '#5FD068' : '',
								fontWeight: 'bold',
							}}
							onClick={() => handleToggleDay(day)}>
							{day}
						</div>
					);
				})}
			</div>
		</FormGroup>
	);
};

export default DaysPicker;
