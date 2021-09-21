import React from 'react'
import Sidenav from '../../SideNav/Sidenav'

const OrderLogSheet = ({ history }) => {
    return (
        <Sidenav title={'Order Log Sheet'}>
            <div>
                <table class="table table-responsive table-striped table-bordered border-dark text-center mt-3">
                    <thead class="bg-dark text-light">
                        <tr>
                            <th>S.No.</th>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>BILL NO</th>
                            <th>DC NO</th>
                            <th>IGP NO</th>
                            <th>Unit</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th>Received From</th>
                            <th>Dept.</th>
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Remarks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {/* {i + 1} */}
                            </td>
                            <td>
                                {/* {el?.itemCode?.code} */}
                            </td>
                            <td>
                                {/* {el?.itemCode?.name} */}
                            </td>
                            <td>
                                {/* {el?.billNo} */}
                            </td>
                            <td>
                                {/* {el?.dcNo} */}
                            </td>
                            <td>
                                {/* {el?.IGPNo} */}
                            </td>
                            <td>
                                {/* {el?.itemCode?.unit?.name} */}
                            </td>
                            <td>
                                {/* {el?.rate} */}
                            </td>
                            <td>
                                {/* {el?.recQty} */}
                            </td>
                            <td>
                                {/* {el?.partyName} */}
                            </td>
                            <td>
                                {/* {el?.inwardForDept?.name} */}
                            </td>
                            <td>
                                {/* {el?.amount} */}
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                {/* {el?.remarks} */}
                            </td>
                            <td>
                                <Button
                                    variant="contained"
                                    text="View"
                                    size="small"
                                    classNames="btn bg-dark text-light"
                                    onClick={() => {
                                        history.push('/storedashboard/inwards/item_inward/print_inward_item')
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Sidenav>
    )
}

export default OrderLogSheet
