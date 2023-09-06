import AuthContext from '@/components/AuthContext';

export default function AppLayout({ children }) {
  return (
    <main>

      <AuthContext>

        {children}
        
      </AuthContext>

    </main>
  )
}
