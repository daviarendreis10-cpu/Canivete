import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { App } from "../data/apps";


export default function AppCard ({icon, name, color, description, to}: App) {
    const Icon = icon
    return (
        <Box maxWidth={'30rem'} minWidth={'16rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}>{<Icon/>} - {name}</Heading>
                  <Text as="p">{description}</Text>
                  <Button color={color} variant="soft" asChild>
                    <Link to={to} >Acessar</Link>
                  </Button>
                </Flex>
              </Card>
        </Box>
    )
}