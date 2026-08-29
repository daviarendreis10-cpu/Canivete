import { Outlet, useLocation } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { Flex, Theme } from '@radix-ui/themes'
import { useState } from 'react'
import ToggleThemeButton from '../components/ToggleThemeButton'

type Themes = 'dark' | 'light'

export default function RootLayout () {
    const location = useLocation()
    const [theme, setTheme] = useState<Themes>('dark')

    return (
        <Theme appearance={theme}>
        <Flex direction={'row'} gap={'2'}>
            {location.pathname !== '/' && <BackButton/>}
            <ToggleThemeButton theme={theme} setTheme={setTheme}  />
        </Flex>
        <Outlet/>
        </Theme>
    )
}