import { ActivityLogIcon, BackpackIcon, RulerSquareIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import dayjs, { } from 'dayjs'



export default function Hub() {
     
  
const WEEKDAY_PT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira' , 'Sábado']

    function getToday () {
      const now = dayjs()
      const weekday = now.day()
      const weekdayName = WEEKDAY_PT[weekday]
      const textDay =`${weekdayName} - ${now.format("DD/MM/YYYY")}`
      return textDay
    }

  return (
      <Box>
        <Flex align={'center'} direction={'column'}>
          <Flex align={'center'} wrap={'wrap'} direction={'column'} mt={'5'}>
            <Heading size={'8'} mt={'3'}>Hora de Produzir</Heading>
            <Heading as="h3" mt={'5'} >Ferramentas pra te ajudar a produzir mais e melhor!</Heading>
            <Flex direction={'row'} gap={'10'} m={'7'}>
              <Text><Strong>{getToday()}</Strong></Text>
            </Flex>
            
          </Flex>

          <Flex gap={'7'} m={'5'} >
            <Box maxWidth={'30rem'}>
            <Card size={'2'} >
              <Flex direction={'column'} align={'center'} gap={'5'}>
                <Heading as="h4" size={'5'}><ActivityLogIcon/> - To-do List</Heading>
                <Text as="p">O que precisa ser feito hoje</Text>
                <Button color="green" variant="soft" asChild>
                  <Link to='/todo' >Acessar</Link>
                </Button>
              </Flex>
            </Card>
            </Box>

            <Box maxWidth={'30rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}><RulerSquareIcon/> - Tracker</Heading>
                  <Text as="p">Seus habitos, sua sequencia</Text>
                  <Button color="purple" variant="soft" asChild>
                    <Link to='/tracker' >Acessar</Link>
                  </Button>
                </Flex>
              </Card>
            </Box>
          </Flex>

            <Box width={'25rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}><BackpackIcon/> - Finance</Heading>
                  <Text as="p">Pra onde vai seu dinheiro</Text>
                  <Button color="tomato" variant="soft" asChild>
                    <Link to='/finance' >Acessar</Link>
                  </Button>
                </Flex>
              </Card>
            </Box>
        </Flex>
        
      </Box>
  )
}

