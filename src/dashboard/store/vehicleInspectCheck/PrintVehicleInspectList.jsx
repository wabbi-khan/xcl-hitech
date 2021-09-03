import React from 'react'
import Button from '../../../components/utils/Button'

const PrintVehicleInspectList = () => {
    return (
        <div>
            <div class='text-center'>
                <div class='row mt-3'>
                    <div class='col-lg-3 col-md-3 col-sm-4'>
                        <img src='/images/nameLogo.png' width='90%' height='80%' alt='' />
                    </div>
                    <div class='offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2 mt-2'>
                        <div
                            style={{
                                display: 'flex',
                                // alignItems: 'flex-end',
                                flexDirection: 'column',
                                border: '2px solid #333',
                                width: '100px',
                                // marginLeft: 'auto',
                                // paddingRight: '5px',
                                // marginRight: '-3rem'
                            }}>
                            <h6>FM-37</h6>
                            <h6>Issue.02</h6>
                        </div>
                    </div>
                    {/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
                    <h6>Plot No X-22, Site Area Kotri</h6>
                    <p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
                    <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} >
                        VEHICLE INSPECTION CHECKLIST
                    </h3>
                </div>
                <div class='container' id='printBtn'>
                    <Button
                        size='small'
                        text='Print'
                        variant='contained'
                        classNames='btn bg-dark text-light'
                        onClick={() => window.print()}
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                <div className='container-fluid mt-5'>
                    <table class='table table-inverse table-responsive table-bordered border-dark mt-4'>
                        <thead class='thead-inverse'>
                            <tr>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>S.No.</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Date</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Vehicle No.</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Fitness Certificate(Y/N)</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Registration Documents</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Road Tax Paid</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Valid Vehicle Insurance</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Driver Licence</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Visual Check of Vehicle Condition , Undamage, Body & Floor</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Tyres/Spares Tyres Condition</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Appropriate Jack & Spanner is Available</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Enough Fuel in the Tank to reach the Destination</td>
                                <td style={{ fontSize: '12px', fontWeight: 'bold' }}>Signature of Inspector</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                                <td>
                                    { }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PrintVehicleInspectList
