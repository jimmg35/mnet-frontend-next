import React, { useEffect } from 'react'
import Head from 'next/head'
import theme from '../styles/theme'
import { GetServerSideProps, NextPage } from 'next'
import { ThemeProvider } from '@mui/material'
import { project_name } from '../lib/config'
import { basePath } from '../lib/config'

export const getServerSideProps: GetServerSideProps<{}, {}> = async () => {
  return { props: {} }
}

const Home: NextPage<{}> = () => {
  return <ThemeProvider theme={theme}>
    <Head>
      <title>{project_name}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href={`${basePath}/title-icon.ico`} />
    </Head>
    <p>安安安安安安</p>
  </ThemeProvider>
}

export default Home
