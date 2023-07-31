import { Snackbar, Alert } from '@mui/material';

// TODO: add props, handle all cases
// This is in progress
function AlertPopup({ open, severity, msg, setSnackBar }) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={() => setSnackBar({ open: false })}
		>
			<Alert severity={severity} sx={{ width: '100%' }}>
				{msg}
			</Alert>
		</Snackbar>
	);
}

export default AlertPopup;
