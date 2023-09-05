'use client'

import { auth } from '@/firebase/Init';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = ({ children }) => {

    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <h2>Loading...</h2>

    if (error) return <h2>Error: {error}</h2>

    if (!user) {
        router.push('/')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthContext