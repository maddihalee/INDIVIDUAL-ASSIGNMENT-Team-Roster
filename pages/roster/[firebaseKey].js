import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleMember } from '../../api/memberData';
import NewMemberForm from '../../components/NewMemberForm';

export default function EditMember() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  // const [formInput, setFormInput] = useState();
  const [members, setMembers] = useState();

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMembers);
  }, [firebaseKey]);

  return <NewMemberForm obj={members} />;
}
