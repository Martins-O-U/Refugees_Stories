import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AlertDialog(props) {

    const { title, description, open, handleClose, dialogActions } = props;

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="Alert-dialog"
            >
                {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        dialogActions.map((action, index) => {
                            return (
                                <Button key={action.id} onClick={handleClose} color="primary">
                                    <Link to={action.route}>{action.text}</Link>
                                </Button>
                            )
                        })
                    }
                </DialogActions>
            </Dialog>
        </>
    );
}
