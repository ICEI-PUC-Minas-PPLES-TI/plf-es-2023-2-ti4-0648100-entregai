'use client'

import AuthProvider from "@/components/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Page() {

  return (
    <main>
      
      <LoginForm />

      <Link href="/register"><Button variant="contained" color="primary">Cadastrar</Button></Link>

      <AuthProvider />

    </main>
  )
}


