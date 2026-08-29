import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"

type Themes = 'dark' | 'light'

type ToggleThemeButtonProps = {
    theme: Themes,
    setTheme: (theme: Themes) => void
}

export default function ToggleThemeButton ({theme, setTheme}: ToggleThemeButtonProps) {

    function changeTheme () {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    return (
        <Button onClick={changeTheme} color="gray" variant="soft">{theme === 'light' ? <MoonIcon/> : <SunIcon/> }</Button>
    )
}