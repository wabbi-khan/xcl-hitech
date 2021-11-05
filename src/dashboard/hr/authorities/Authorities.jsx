import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Sidenav from '../../SideNav/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import {
	createAuthorities,
	deleteAuthorities,
	getAuthorities,
} from '../../../services/action/authorityAction';
import EditAuthority from './EditAuthority';
import {
	CustomButton,
	CustomContainer,
	CustomInput,
	CustomTable,
} from '../../../components';

const initialValue = {
	name: '',
};

const validationSchema = yup.object({
	name: yup.string().required('Authority is required'),
});

const Authorities = () => {
	const [createLoading, setCreateLoading] = useState(false);
	const [createError, setCreateError] = useState('');
	const [fetchLoading, setFetchLoading] = useState('');
	const [authority, setAuthority] = useState({});
	const [open, setOpen] = useState(false);

	const { authorities } = useSelector((state) => state.authorities);

	const dispatch = useDispatch();

	useEffect(() => {
		setFetchLoading(true);
		dispatch(
			getAuthorities(null, () => {
				setFetchLoading(false);
			})
		);
	}, [dispatch]);

	const onSubmit = (values, actions) => {
		setCreateLoading(true);
		dispatch(
			createAuthorities(values, (err) => {
				setCreateLoading(false);
				if (err) {
					setCreateError(err);
					return;
				}
				actions.resetForm();
				setCreateError('');
			})
		);
	};

	const onDelete = (params) => {
		dispatch(deleteAuthorities(params._id));
	};

	const handleClose = (props) => {
		setOpen(props);
	};

	const handleOpen = async (authority) => {
		setAuthority(authority);
		setOpen(true);
	};

	return (
		<Sidenav title={'Authorities'}>
			<EditAuthority
				show={open}
				handler={handleClose}
				authority={authority}
			/>

			<div>
				<CustomContainer>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form autoComplete="off">
								<div
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									<CustomInput
										label="Authority"
										onChange={props.handleChange('name')}
										value={props.values.name}
										onBlur={props.handleBlur('name')}
										helperText={
											props.touched.name && props.errors.name
										}
										error={props.touched.name && props.errors.name}
										width="30%"
									/>
								</div>
								<div>
									<CustomButton
										variant="outlined"
										color="primary"
										text="Submit"
										style={{
											backgroundColor: '#22A19A',
											color: '#fff',
											marginTop: '1rem',
										}}
										loading={createLoading}
										loaderColor="#fff"
										error={createError}
									/>
								</div>
							</Form>
						)}
					</Formik>
				</CustomContainer>
			</div>
			{/* <div
				className="container-fluid"
				style={{ textAlign: 'left', marginTop: '50px' }}
			>
				{fetchLoading ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '3rem',
						}}
					>
						<Loader
							type="TailSpin"
							color="#000"
							width="3rem"
							height="3rem"
						/>
					</div>
				) : authorities?.length === 0 ? (
					<p>There is no data found.</p>
				) : (
					<table class="table table-responsive table-hover table-striped table-bordered border-dark text-center mt-3">
						{authorities?.map((el, i) => (
							<>
								{i === 0 && (
									<thead class="bg-dark text-light">
										<tr>
											<th>S.No.</th>
											<th>Name</th>
											<th>Action</th>
										</tr>
									</thead>
								)}
								<tbody>
									<tr>
										<td>{i + 1}</td>
										<td>{el?.name}</td>
										<td>
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<Button
													variant="contained"
													className="bg-dark text-light"
													size="small"
													onClick={() => handleOpen(el)}
													text="Edit"
												/>

												<Button
													variant="contained"
													color="secondary"
													size="small"
													onClick={() => deleteAuthority(el._id)}
													style={{ marginLeft: 10 }}
													text="Delete"
												/>
											</div>
										</td>
									</tr>
								</tbody>
							</>
						))}
					</table>
				)}
			</div> */}

			<CustomTable
				fetchLoading={fetchLoading}
				data={authorities}
				columnHeadings={['Sr.No', 'Authorities']}
				keys={['name']}
				firstOptionText="Edit"
				onFirstOptionClick={handleOpen}
				secondOptionText="Delete"
				onSecondOptionClick={onDelete}
				withSrNo
			/>
		</Sidenav>
	);
};

export default Authorities;
