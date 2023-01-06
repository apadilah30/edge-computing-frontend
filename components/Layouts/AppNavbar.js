import { Navbar, Link, Text, Button } from '@nextui-org/react'
import Logo from '../Logo.js'

export default function AppNavbar () {
    return (
        <Navbar background="white" variant="static">
            <Navbar.Brand>
            <Logo />
            <Text color="inherit" hideIn="xs">
                IoT - Edge Computing
            </Text>
            </Navbar.Brand>
            <Navbar.Content>
                {/* <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                    Sign Up
                    </Button>
                </Navbar.Item> */}
            </Navbar.Content>
        </Navbar>
    )
}