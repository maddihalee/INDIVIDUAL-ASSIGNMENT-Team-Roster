import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteMembers } from '../api/memberData';

export default function MemberCard({ member, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${member.player_name}?`)) {
      deleteMembers(member.firebaseKey).then(() => onUpdate);
    }
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{member.player_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{member.spec}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{member.class}</Card.Subtitle>
          <Link href={`/team/${member.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/router/${member.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisMember} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

MemberCard.propTypes = {
  member: PropTypes.shape({
    player_name: PropTypes.string,
    class: PropTypes.string,
    spec: PropTypes.string,
    firebaseKey: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

MemberCard.defaultProps = {
  member: {
    player_name: 'Player Name',
    class: 'Class',
    spec: 'Spec',
  },
};
