import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import Button from '../../../components/utils/Button'
import { withRouter } from 'react-router';


const ViewSuppEvalForms = ({ history }) => {
    return (
        <Sidenav title={'View Supplier Evaluation Forms'}>
            <div>
                <table class='table table-bordered border-dark table-responsive text-center mt-1'>
                    <thead class='thead-inverse'>
                        <tr class='bg-dark text-light'>
                            <th>Vendor Name</th>
                            <th>Contact No.</th>
                            <th>Address</th>
                            <th>Product/Services</th>
                            <th>Evaluation Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* First Row */}
                        {/* {
							!vendors ? (
								<span>Data Not Found</span>
							) : (
								vendors?.map((el, i) => ( */}
                        <tr>
                            <td >{ }</td>
                            <td >{ }</td>
                            <td >{ }</td>
                            <td >{ }</td>
                            <td >{ }</td>
                            <td>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    text='View'
                                    size='small'
                                    classNames='bg-dark text-light'
                                    // classNames={classes.addButton}
                                    onClick={() => {
                                        history.push(`/purchase/supplier_eval/print_supplier_evaluation_form`);
                                    }}
                                />
                            </td>
                            {/* <td>{el.name}</td> */}
                            {/* <td>{el.name}</td> */}
                            {/* <td>{!el.contactPerson ? null : el.contactPerson}</td> */}
                            {/* <td>
											{el.materials?.map((el) => (
												<p style={{ margin: 0, padding: 0 }}>{el?.name}</p>
											))}
										</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Sidenav>
    )
}

export default withRouter(ViewSuppEvalForms)
