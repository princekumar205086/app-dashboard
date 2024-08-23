"use client"
import React from 'react'
import Layout from '../sidenav/layout'
import { Typography } from '@mui/material'
import useAuth from "@/app/helper/useAuth";

export default function Profile() {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
        <Layout>
            <h1>This is profile page!</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit architecto corporis necessitatibus iste quod, incidunt voluptatem nihil neque, quam voluptate quaerat eveniet ea cupiditate aliquam amet natus, modi alias enim. Nobis voluptate cum asperiores soluta consequatur placeat rerum nisi. Veritatis itaque quam iure sed molestiae explicabo, nostrum consequuntur soluta cupiditate laboriosam maxime distinctio ex nihil nisi, nemo, corporis adipisci sapiente nobis tempora. Culpa sed, voluptatem fugiat ab ipsa deleniti cum exercitationem corrupti perferendis architecto totam consequuntur mollitia voluptates vitae eos voluptatibus sequi pariatur dolor officia amet? Velit magni hic aut quas impedit quod minima possimus nulla labore commodi fuga, facere asperiores et maiores voluptatem error nesciunt facilis in neque rem ad. Assumenda quia amet quasi iure dolorum! Odit laborum placeat asperiores mollitia omnis id repellendus, ab magni tenetur, quod excepturi eaque? Sit laboriosam et doloremque repudiandae natus, minima temporibus impedit cum tenetur adipisci porro officia sequi dolorum nobis assumenda dolore.d</p>
        </Layout>
    </>
  )
}
