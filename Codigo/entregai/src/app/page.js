import styles from './page.module.scss'
import LoginForm from '@/components/LoginForm'

export default function Page() {
  return (
    <main className={styles.main}>
      
      <h1>Faça login!</h1>

      <LoginForm />

    </main>
  )
}
