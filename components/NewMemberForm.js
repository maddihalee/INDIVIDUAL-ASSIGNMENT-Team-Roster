import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMembers } from '../api/memberData';

const initialState = {
  player_name: '',
  spec: '',
  class: '',
};

export default function NewMemberForm({ obj }) {
  const [formInput, setFormInput] = useState([initialState]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMembers(formInput)
        .then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMembers(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Player Name"
          name="player_name"
          value={formInput.player_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Class" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Class"
          name="class"
          value={formInput.class}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Spec" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Spec"
          name="spec"
          value={formInput.spec}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

NewMemberForm.propTypes = {
  obj: PropTypes.shape({
    player_name: PropTypes.string,
    spec: PropTypes.string,
    class: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NewMemberForm.defaultProps = {
  obj: initialState,
};
