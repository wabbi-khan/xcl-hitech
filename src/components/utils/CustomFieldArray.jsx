import React, {
	useImperativeHandle,
	forwardRef,
	useEffect,
	useState,
	useRef,
} from 'react';
import { Formik, FieldArray } from 'formik';
import CustomInput from './CustomInput';
import CustomButton from './Button';

const CustomFieldArray = ({ heading, fields, name, validationSchema }, ref) => {
	const [valueObject, setValueObject] = useState({});
	const [initialValues, setInitialValue] = useState({ values: [] });

	const formRef = useRef(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				getValues: () => {
					return formRef.current;
				},
			};
		},
		[]
	);

	useEffect(() => {
		let temp = {};
		fields.forEach((field) => (temp = { ...temp, [field.name]: '' }));
		setValueObject({ ...temp });
		setInitialValue({
			values: [{ ...temp }],
		});
	}, []);

	function handleChange(e, form, field, i) {
		form.setFieldValue(`values[${i}][${field.name}]`, e);
		let obj = null;
		if (field.fetchFrom) {
			obj = field.fetchFrom.find((material) => material._id === e);
		}

		if (field.onChangeEffectOn) {
			field.onChangeEffectOn.forEach((el) => {
				const from = el.from.split('.');
				let value = obj;
				from.forEach((el2) => {
					value = value[el2];
				});
				form.setFieldValue(`values[${i}]${el.to}`, value);
			});
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={validationSchema}
			innerRef={formRef}
		>
			{(props) => {
				return (
					<>
						<FieldArray name="values">
							{({ push, remove, form }) => {
								const values = form.values.values;
								return (
									<>
										<div
											style={{
												marginBottom: '30px',
												display: 'flex',
												gap: '10px',
												justifyContent: 'flex-end',
											}}
										>
											<CustomButton
												text="Add Another"
												onClick={() => push({ ...valueObject })}
												classNames="text-light"
												style={{ backgroundColor: '#22A19A' }}
											/>
										</div>
										{values.map((el, i) => {
											return (
												<>
													<div
														style={{
															display: 'flex',
															gap: '10px',
														}}
													>
														{fields.map((field) => {
															return (
																<CustomInput
																	label={field.label}
																	selectValues={
																		field.selectValues
																	}
																	value={el[field.name]}
																	onBlur={form.handleBlur(
																		`values[${i}][${field.name}]`
																	)}
																	helperText={
																		form.touched.values &&
																		form.errors.values &&
																		form.errors.values[i] &&
																		form.errors.values[i][
																			field.name
																		]
																	}
																	error={
																		form.touched.values &&
																		form.errors.values &&
																		form.errors.values[i] &&
																		form.errors.values[i][
																			field.name
																		]
																	}
																	onChange={(e) =>
																		handleChange(
																			e,
																			form,
																			field,
																			i
																		)
																	}
																/>
															);
														})}
													</div>
													<div
														style={{
															marginTop: '10px',
															marginBottom: '10px',
															display: 'flex',
															gap: '10px',
															justifyContent: 'flex-end',
														}}
													>
														<CustomButton
															size="small"
															classNames="bg-danger text-light"
															text="Delete"
															onClick={() => remove(i)}
														/>
													</div>
												</>
											);
										})}
									</>
								);
							}}
						</FieldArray>
					</>
				);
			}}
		</Formik>
	);
};

export default forwardRef(CustomFieldArray);
