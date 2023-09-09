'use client'

import { auth } from '@/firebase/Init';
import { CircularProgress } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const pathname = usePathname();
    const { push } = useRouter();

    // Quando o component AuthContext é montado (useEffect), ele verifica se o usuário está logado
    // e se ele está tentando acessar a página correta. Se não estiver, ele redireciona o usuário.

    useEffect(() => {
        if (!user && pathname !== '/') {
            push('/')
        } else if (user && pathname == '/') {
            push('/main')
        }
        
    }, [user, pathname, push])

    // Este código impede o usuário de ver a página destinada enquanto o componente AuthContext
    // está verificando se ele está logado ou se está acessando a página correta com a autenticação atual.

    if (loading || (!user && pathname !== '/') || (user && pathname == '/')) {
        return <CircularProgress />;
    }

    // Renderiza a pagina correta se o usuário estiver logado e acessando a página correta.
    return <div>{children}</div>
}

export default AuthContext