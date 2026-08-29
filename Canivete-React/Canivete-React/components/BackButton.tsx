import {  Link } from 'react-router-dom'
import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

export default function BackButton () {


    return (
        <Button color='gray' variant='soft' asChild>
            <Link to='/' ><ExitIcon/></Link>
        </Button>
    )
}