'use client'

import { auth } from '@/firebase/Init';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginForm from './LoginForm';


const AuthContext = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    // if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>Error: {error}</h2>;

    if (!user) { router.push('/'); return <h2>Deslogando...</h2> }

    return <div>{children}</div>
};

export default AuthContext