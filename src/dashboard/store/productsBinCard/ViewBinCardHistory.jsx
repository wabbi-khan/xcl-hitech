import React from 'react';
import Sidenav from '../../SideNav/Sidenav';
import Button from '../../../components/utils/Button';

const ViewBinCardHistory = ({ history }) => {
	return (
		<Sidenav title={'View Products History'}>
			<div>
				<div className="container-fluid" style={{ textAlign: 'left' }}>
					<Button
						variant="contained"
						text="Print"
						classNames="btn btn-sm bg-dark text-light"
						style={{ marginLeft: 'auto' }}
						onClick={() => {
							history.push(
								'/storedashboard/products_bin_card/print_bin_card'
							);
						}}
					/>
					<table class="table table-responsive table-striped table-bordered border-dark text-center mt-3">
						<thead class="bg-dark text-light">
							<tr>
								<th>S.No.</th>
								<th>Product Name</th>
								<th>Current Balance</th>
								<th>IN</th>
								<th>OUT</th>
								<th>Balance</th>
								<th>Last Updated on</th>
							</tr>
						</thead>
						<tbody>
							{/* {
                                binCards.map((el, i) => ( */}
							<tr>
								{/* <td>{i + 1}</td> */}

								<td>{/* {el?.product?.name} */}</td>
								<td>{/* {el?.history[0]?.balance} */}</td>
								<td>{/* {el?.history[0]?.in} */}</td>
								<td>{/* {el?.history[0]?.out} */}</td>
								<td>{/* {el?.history[0]?.balance} */}</td>
								<td>{/* {el?.history[0]?.date} */}</td>
								{/* <td>
                                        <Button
                                            variant='contained'
                                            text='View'
                                            classNames='btn btn-sm bg-dark text-light'
                                            onClick={() => {
                                                history.push('/storedashboard/products_bin_card/view_bincard_history')
                                            }}
                                        />
                                    </td> */}
							</tr>
							{/* ))
                            } */}
						</tbody>
					</table>
				</div>
			</div>
		</Sidenav>
	);
};

export default ViewBinCardHistory;
