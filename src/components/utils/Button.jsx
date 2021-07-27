import React from 'react';
import MuiButton from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';

const Button = ({
	variant,
	text,
	classNames,
	type = 'submit',
	loading,
	color,
	onClick,
	size,
	style,
	loaderColor = '#fff',
}) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<MuiButton
				color={color}
				variant={variant}
				className={classNames}
				type={type}
				size={size}
				style={style}
				onClick={onClick}>
				<span style={{ marginTop: '.1rem' }}>{text}</span>
				{
					loading && (
						<Loader
							type='TailSpin'
							width='1rem'
							height='1rem'
							style={{ marginLeft: '1rem' }}
							color={loaderColor}
						/>
					)
				}
			</MuiButton>
		</div>
	);
};

export default Button;
