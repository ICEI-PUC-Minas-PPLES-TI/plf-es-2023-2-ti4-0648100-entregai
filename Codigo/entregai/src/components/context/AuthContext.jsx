'use client'

import { auth } from '@/lib/firebase/firebase-config';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import BackdropScreen from '../misc/BackdropScreen';

const AuthContext = ({ children }) => {
    
    const [ user, loading ] = useAuthState(auth);
    const { push } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user && pathname !== '/') {
            push('/')
        } else if (user && pathname == '/') {
            push('/main/supermarket')
        }
        
    }, [user, pathname, push, loading])

    if (loading || (!user && pathname !== '/') || (user && pathname == '/')) {
        return <BackdropScreen />;
    }

    return <div>{children}</div>
}

export default AuthContext