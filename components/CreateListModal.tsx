import React, { useState, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createList } from '../store/actions/listActions';
import useTypedSelector from '../hooks/useTypedSelector';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export default function SimpleModal({
  buttonTitle,
  modalTitle
}: // token,
// tokenInfo
{
  buttonTitle: string;
  modalTitle: string;
  // token: string;
  // tokenInfo: ITokenInfo;
}) {
  const classes = useStyles();
  const { id, token } = useTypedSelector((state) => state.tokenInfo);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [creds, setCreds] = useState({
    userId: id,
    token,
    todoTitle: ''
  });

  const dispatch = useDispatch();

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <Typography id="simple-modal-title" variant="h5">
        {modalTitle}
      </Typography>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          dispatch(createList(creds));
          setOpen(false);
          toast.success(`Todo list ${creds.todoTitle} created.`);
        }}
      >
        <TextField
          id="standard-basic"
          label="Todo Title"
          onChange={(e) => setCreds({ ...creds, todoTitle: e.target.value })}
        />
        <Button type="submit">Create</Button>
      </form>
    </Container>
  );

  return (
    <div>
      <Button type="button" onClick={() => setOpen(true)}>
        {buttonTitle}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

SimpleModal.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired
  // token: PropTypes.string.isRequired,
  // tokenInfo: PropTypes.shape({ id: PropTypes.string }).isRequired
};
