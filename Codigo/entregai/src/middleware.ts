import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get("session")
    const url = req.url

    if (!sessionToken && url.includes('/app')) {
        return NextResponse.redirect(process.env.URL + '/')
    }

    if (sessionToken && url === process.env.URL + '/login') {
        return NextResponse.redirect(process.env.URL + '/app/user')
    }
}