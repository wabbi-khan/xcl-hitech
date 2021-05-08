import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


const Loading = () => {

    return (
        <div className="text-center">
            <CircularProgress style={{ color: 'black', marginTop: 5 }} />
        </div>
    )
}

export default Loading
