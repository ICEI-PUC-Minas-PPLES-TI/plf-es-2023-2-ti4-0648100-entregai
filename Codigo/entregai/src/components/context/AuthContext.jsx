'use client'

import { auth } from '@/lib/firebase/firebase';
import { CircularProgress } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = ({ children }) => {
    const [ user, loading ] = useAuthState(auth);
    const { push } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user && pathname !== '/') {
            push('/')
        } else if (user && pathname == '/') {
            push('/main')
        }
        
    }, [user, pathname, push])

    if (loading || (!user && pathname !== '/') || (user && pathname == '/')) {
        return <CircularProgress />;
    }

    return <div>{children}</div>
}

export default AuthContext