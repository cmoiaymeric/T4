import './QuitDialog.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface QuitDialogProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function QuitDialog({ open, onCancel, onConfirm }: QuitDialogProps) {
    return (
        <Dialog
            className="quit-dialog"
            open={open}
            onClose={onCancel}
        >
            <DialogTitle className="quit-dialog-title">
                Quitter le jeu?
            </DialogTitle>
            <DialogContent className="quit-dialog-content">
                Êtes-vous sûr de vouloir retourner au menu?
            </DialogContent>
            <DialogActions className="quit-dialog-actions">
                <Button
                    className="quit-dialog-btn-cancel"
                    onClick={onCancel}
                    variant="outlined"
                >
                    Annuler
                </Button>
                <Button
                    className="quit-dialog-btn-confirm"
                    onClick={onConfirm}
                    variant="contained"
                >
                    Quitter
                </Button>
            </DialogActions>
        </Dialog>
    );
}
