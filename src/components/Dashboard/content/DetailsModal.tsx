import { User } from '@/types/user';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '@/lib/statics/country_code';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styles from '@/styles/dashboard/users.module.scss';

interface Props {
  userDetails: User | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DetailsModal: FC<Props> = ({ userDetails, setOpen, open }) => {
  const { t } = useTranslation('common');
  const handleClose = () => {
    setOpen(false);
  };
  console.log(userDetails);
  if (!userDetails) return null;
  return (
    <Dialog onClose={handleClose} open={open} className={styles.detailsModal}>
      <DialogTitle>{t('user_details', { defaultValue: 'User Details' })}</DialogTitle>
      <DialogContent>
        <Avatar
          alt={userDetails.name.first + userDetails.name.last}
          src={userDetails.picture.medium}
          className={styles.avatar}
        />
        <Typography variant="body2" component="div" className={styles.fullname}>
          {userDetails.name.first} {userDetails.name.last}{' '}
          <Typography component="span" variant="overline">
            ({COUNTRIES[userDetails.nat].name} {COUNTRIES[userDetails.nat].emoji})
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          component={'p'}
          sx={{ color: 'text.secondary' }}
          className={styles.email}
        >
          {userDetails.email}
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SmartphoneIcon />
              </ListItemIcon>
              <ListItemText primary={userDetails.phone} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationPinIcon />
              </ListItemIcon>
              <ListItemText
                primary={userDetails.location.country + ',' + userDetails.location.state}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('close', { defaultValue: 'Close' })}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
