import React from 'react'
import Sidenav from '../../SideNav/Sidenav'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';
import Button from '../../../components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    mainContainer: {
        textAlign: 'center',
        marginTop: 20,
    },
    addButton: {
        marginTop: 20,
        color: '#22A19A',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        width: '10%',
        '&:hover': {
            border: 'none',
            backgroundColor: '#22A19A',
            color: 'whitesmoke',
        },
    },
    table: {
        minWidth: 600,
    },
    dataTable: {
        marginTop: 40,
    },
    inputFieldStyle: {
        [theme.breakpoints.up('md')]: {
            width: 250,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
    },
    inputFieldStyle1: {
        [theme.breakpoints.up('md')]: {
            width: 250,
        },
        [theme.breakpoints.down('sm')]: {
            width: 200,
            marginTop: 10,
        },
    },
}));

const ViewBinCardHistory = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();


    return (
        <Sidenav title={'View Products History'}>
            <div>
                <div className='container-fluid' style={{ textAlign: 'left' }}>
                    <Button 
                        variant='contained'
                        text='Print'
                        classNames='btn btn-sm bg-dark text-light'
                        style={{ marginLeft: 'auto' }}
                        onClick={() => {
                            history.push('/storedashboard/products_bin_card/print_bin_card')
                        }}
                    />
                    <table class='table table-responsive table-striped table-bordered border-dark text-center mt-3'>
                        <thead class='bg-dark text-light'>
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
                                    
                                        <td>
                                            {/* {el?.product?.name} */}
                                        </td>
                                        <td>
                                            {/* {el?.history[0]?.balance} */}
                                        </td>
                                        <td>
                                            {/* {el?.history[0]?.in} */}
                                        </td>
                                        <td>
                                            {/* {el?.history[0]?.out} */}
                                        </td>
                                        <td>
                                            {/* {el?.history[0]?.balance} */}
                                        </td>
                                        <td>
                                            {/* {el?.history[0]?.date} */}
                                        </td>
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
    )
}

export default ViewBinCardHistory
