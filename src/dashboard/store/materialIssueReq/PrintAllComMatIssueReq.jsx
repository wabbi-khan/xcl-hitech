import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../purchase/material/Loading';
import MaterialError from '../../purchase/material/MaterialError';
import { fetchSingleRequisitionAction } from '../../../services/action/PurchaseReqAction';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 20,
    },
    ckeckBox: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 7,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
}));

const PrintAllComMatIssueReq = (props) => {
    const classes = useStyles();
    const id = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleRequisitionAction(id));
    }, [dispatch, id]);

    const { purchaseRequisition, loading, error } = useSelector(
        (state) => state.purchaseRequisitions,
    );
    console.log(purchaseRequisition);

    const date = new Date();
    const currDate = date.getDate();
    const months = date.getMonth() + 1;
    const years = date.getFullYear();
    const fullDate = `${currDate} / ${months} / ${years}`;

    return (
        <div>
            <div className='container-fluid text-center'>
                <img src='./logo.png' alt='' />
                <h4>Hi-Tech Pipe & Engineering Industries</h4>
                <h6>Plot No X-22, Site Area Kotri</h6>
                <p>Ph-No 022-3870614-5, Fax: 022-3870606</p>
                <div
                    class=''
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        border: '2px solid #333',
                        width: '100px',
                        marginLeft: 'auto',
                        paddingRight: '10px',
                    }}>
                    <h6>FM-38</h6>
                    <h6>Issue.02</h6>
                </div>
                <h5
                    className=''
                    style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
                    MATERIAL ISSUE REQUISITION
                </h5>
            </div>
            <div class='container-fluid mt-5'>
                <div class='row'>
                    <div class='col-lg-4 col-md-4 col-sm-4' style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontWeight: 'bold', }}>MIR No.</p>
                        <div style={{ marginLeft: '1rem', }}>
                            <p>
                                { }
                                <hr
                                    style={{
                                        border: '1px solid green',
                                        borderColor: 'black',
                                        width: '100px',
                                        marginTop: 0,
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                    {/* <div class='offset-lg-4 offset-md-4 offset-sm-4 col-lg-4 col-md-4 col-sm-4' style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontWeight: 'bold', }}>Date:</p>
                        <div style={{ marginLeft: '1rem', }}>
                            <p>
                                {fullDate}
                                <hr
                                    style={{
                                        border: '1px solid green',
                                        borderColor: 'black',
                                        width: '100px',
                                        marginTop: 0,
                                    }}
                                />
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className={classes.dataTable}>
                <table class='table table-bordered border-dark table-responsive table-hover text-center'>
                    <thead class='thead-inverse'>
                        <tr style={{ textAlign: 'left' }}>
                            <th colspan='2'>Date: </th>
                            <th colspan='3'>Department: </th>
                            <th colspan='5'>Purpose(Place of use)</th>
                        </tr>
                        <tr>
                            <th rowspan='2'>S/No.</th>
                            <th rowspan='2'>Item Code</th>
                            <th rowspan='2'>Cost Centre</th>
                            <th rowspan='2'>Description of Material</th>
                            <th rowspan='2'>Unit</th>
                            <th colspan='4'>Quality</th>
                            <th rowspan='2'>Remarks</th>
                        </tr>
                        <tr>
                            <th>Required</th>
                            <th>Issued</th>
                            <th>Return</th>
                            <th>Phy. Balance</th>
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
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            <td >{  }asd</td>
                            {/* <td>{el.name}</td> */}
                            {/* <td>{el.name}</td> */}
                            {/* <td>{!el.contactPerson ? null : el.contactPerson}</td> */}
                            {/* <td>
											{el.materials?.map((el) => (
												<p style={{ margin: 0, padding: 0 }}>{el?.name}</p>
											))}
										</td> */}
                        </tr>
                        {/* 		)) */}
                        {/* 	) */}
                        {/* } */}
                        <tr>
                            <th rowspan='2'>Sign</th>
                            <th>Requested By</th>
                            <th>Authorized By</th>
                            <th>Received By / Employee Number</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th colspan="2">Issued By</th>
                            <th colspan="2">Posted By</th>
                            <th colspan="2">Manager Store</th>
                        </tr>
                        <tr>
                            <th>Date:</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colspan="2"></td>
                            <td colspan="2"></td>
                            <td colspan="2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class='container-fluid '>
                <div class='row'>
                    <div class='col-lg-8 col-md-8 col-sm-8'>
                        <p
                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                        >
                            INSTRUCTION:
                        </p>
                        <p
                            style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '-12px' }}
                        >
                            1. Hi Tech Item Code. Cost Centre Number, Quantities / Required / Return & Replacement Status must be stated clearly.
                        </p>
                        <p
                            style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '-12px'}}
                        >
                            2. Hi Tech Item Code. Cost Centre Number, Quantities / Required / Return & Replacement Status must be stated clearly.
                        </p>
                    </div>
                </div>
            </div>
            <div className='container-fluid text-center mt-5'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                        />
                        <p style={{ marginTop: -10 }}>Initiated By</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                        />
                        <p style={{ marginTop: -10 }}>Department Head</p>
                    </div>
                    <div className='offset-lg-6 offset-md-6 offset-sm-6 col-lg-3 col-md-3 col-sm-3 mt-4'>
                        <hr
                            style={{
                                border: '1px solid green',
                                borderColor: 'black',
                                marginTop: 0,
                            }}
                        />
                        {/* <hr style={{ backgroundColor: 'black', paddingTop: 2 }} /> */}
                        <p style={{ marginTop: -10 }}>Approved By</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintAllComMatIssueReq
