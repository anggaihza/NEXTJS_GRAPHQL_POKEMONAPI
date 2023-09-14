import { SignOut } from '@/services/firebase'
import { Logout } from '@mui/icons-material'
import { AppBar, Box, ButtonBase, Toolbar, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Authenticated = ({ children, title }) => {
    const defaultTitle = "Pokemon"
    const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
    return (
        <>
            <Head>{pageTitle}</Head>
            <AppBar>
                <Toolbar className='flex justify-between mx-11'>
                    <Link href="/">
                        <Typography sx={{ flex: 1 }}>Pokemon</Typography>
                    </Link>
                    <Link href="/auth/login"><ButtonBase onClick={SignOut}><Logout /><Typography sx={{ flex: 1 }}>Sign out</Typography></ButtonBase></Link>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ pt: "94px" }}>
                <main>
                    <Container maxWidth="md">
                        {children}
                    </Container>
                </main>
            </Box>
        </>
    )
}

export default Authenticated