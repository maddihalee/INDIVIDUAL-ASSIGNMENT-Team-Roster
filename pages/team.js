import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../api/memberData';

export default function TeamPage() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} member={member} onUpdate={getAllTheMembers} />
      ))}
    </>
  );
}
