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
import { COUNTRY_CODE } from '@/lib/statics/country_code';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t('user_details', { defaultValue: 'User Details' })}</DialogTitle>
      <DialogContent>
        <Avatar
          alt={userDetails.name.first + userDetails.name.last}
          src={userDetails.picture.medium}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ mt: 1, textWrap: 'nowrap' }}>
          {userDetails.name.first} {userDetails.name.last}{' '}
          <Typography component="span" variant="subtitle2">
            ({userDetails.nat} {COUNTRY_CODE[userDetails.nat].emoji})
          </Typography>
        </Typography>
        <Typography variant="body2" fontSize={10} sx={{ color: 'text.secondary' }}>
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
