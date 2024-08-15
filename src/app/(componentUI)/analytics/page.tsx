import React from 'react'
import Layout from '../sidenav/layout'
import { Typography } from '@mui/material'

export default function page() {
  return (
    <>
        <Layout>
            <Typography className="font-semibold" variant="h5">
                <p>Analytics</p>
            </Typography>
        </Layout>
    </>
  )
}
