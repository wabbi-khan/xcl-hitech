import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
    mainContainer1: {
        textAlign: 'left',
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginTop: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: -15,
        },
    },
    addButton: {
        marginTop: 20,
        color: '#22A19A',
        borderColor: '#22A19A',
        fontWeight: 'bold',
        '&:hover': {
            border: 'none',
            backgroundColor: '#22A19A',
            color: 'whitesmoke',
        },
        [theme.breakpoints.up('md')]: {
            width: '15%',

        },
        [theme.breakpoints.down('sm')]: {
            width: '30%',

        },
    },
    table1: {
        // minWidth: 600,
        marginTop: 60,
    },
    dataTable: {
        marginTop: 40,

    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },

})(TextField);

const PrintTrainingAttendance = () => {
    const classes = useStyles();
    // const id = props.match.params.id

    const date = new Date()
    const currDate = date.getDate()
    const months = date.getMonth() + 1
    const years = date.getFullYear()
    const fullDate = `${currDate} / ${months} / ${years}`

    return (
        <div>
            <div className="text-center">
                <div className="container-fluid">
                    <img src="./logo.png" alt="" />
                    <div class='row'>
                        <div class='col-lg-3 col-md-3 col-sm-4'>
                            <img src='/images/nameLogo.png' width='90%' height='80%' alt='' />
                        </div>
                        <div class='offset-lg-7 offset-md-7 offset-sm-6 col-lg-2 col-md-2 col-sm-2'>
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
                                <h6>FM-42</h6>
                                <h6>Issue.01</h6>
                            </div>
                        </div>
                    </div>
                    {/* <h4>Hi-Tech Pipe & Engineering Industries</h4>
                    <h6>Plot No X-22, Site Area Kotri</h6>
                    <p>Ph-No 022-3870614-5, Fax: 022-3870606</p> */}
                    <h5 className="mt-4" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>ATTENDANCE SHEET (TRAINING)</h5>
                </div>
                <div className="mt-5">
                    <Grid container spacing={1} style={{ textAlign: 'left' }}>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ fontWeight: 'bold' }}>Subject: </p>
                        </Grid>
                        <Grid item lg={10} md={10} sm={10} xs={10}>
                            <p
                                style={{ fontWeight: 'bold' }}
                            >
                                
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ marginTop: 15, textAlign: 'left' }}>
                        <Grid item lg={1} md={1} sm={1} xs={1}>
                            <p style={{ fontWeight: 'bold' }}>TUTOR</p>
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                            <p>
                                {  }
                            </p>
                        </Grid>
                    </Grid>
                </div>
                <div className="container-fluid" style={{ textAlign: 'left' }}>
                    <Grid container spacing={1}>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <p style={{ fontWeight: 'bold', marginLeft: '-12px' }}>Date:</p>
                            </div>
                        </Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p style={{ textDecoration: 'underline' }}>
                                {fullDate}
                            </p>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}></Grid>
                        <Grid item lg={2} md={2} sm={2} xs={2} id="printBtn">
                            <Button variant="contained" size="small"
                                className="bg-dark text-light"
                                onClick={() => window.print()}
                            >
                                Print
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div className="mt-4" >
                    <div className="" style={{ marginTop: 30, marginLeft: 'auto', }}>
                        <table class="table table-striped table-inverse table-bordered table-responsive ">
                            <thead class="thead-inverse">
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Signature</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">
                                        {  }
                                    </td>
                                    <td>
                                        {  }
                                    </td>
                                    <td>
                                        {  }
                                    </td>
                                    <td>
                                        {  }
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Grid container spacing={1} style={{ marginTop: 120 }} >
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                        <hr style={{ border: '1px solid black',  }} />
                        <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Tutor Signature</p>
                    </Grid>
                </Grid>
                {/* <div className="container" style={{ marginTop: 30 }}>
                    <div className="row">
                        <div className="offset-lg-9 offset-md-9 offset-sm-9 offset-xs-9 col-lg-3 col-md-3 col-sm-3 mt-5">
                            <hr style={{ backgroundColor: 'black', paddingTop: 2 }} />
                            <p style={{ marginTop: -10, fontSize: 14, fontWeight: 'bold' }}>FAKHR-E-ALAM</p>
                            <p style={{ marginTop: -10, fontSize: 12, fontWeight: 'bold' }}>Cheif Executive Officer</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default PrintTrainingAttendance
