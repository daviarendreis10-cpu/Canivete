import { Box, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import { apps } from "./data/apps"
import AppCard from "./components/AppCard";
import getToday from "../../utils/date";

export default function Hub() {
     const textDate = getToday()

  return (
      <Box>
        <Flex align={'center'} direction={'column'}>
          <Flex align={'center'} wrap={'wrap'} direction={'column'} mt={'5'}>
            <Heading size={'8'} mt={'3'}>Hora de Produzir</Heading>
            <Heading as="h3" mt={'5'} >Ferramentas pra te ajudar a produzir mais e melhor!</Heading>
            <Flex direction={'row'} gap={'10'} m={'7'}>
              <Text><Strong>{textDate}</Strong></Text>
            </Flex>
            
          </Flex>

          <Flex gap={'7'} m={'5'} wrap={'wrap'} justify={'center'} >
            {apps.map((app) => (
              <AppCard key={app.to} icon={app.icon} 
              name={app.name} 
              description={app.description} 
              color={app.color} 
              to={app.to} />
            ))}
          </Flex>
        </Flex>
      </Box>
  )
}

