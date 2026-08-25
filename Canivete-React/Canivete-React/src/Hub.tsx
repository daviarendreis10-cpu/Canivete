import { Box, Button, Card, Flex, Heading, Strong, Text } from "@radix-ui/themes";


export default function Hub() {
  return (
      <Box>
        <Flex align={'center'} direction={'column'}>
          <Flex align={'center'} wrap={'wrap'} direction={'column'} mt={'5'}>
            <Heading size={'8'} mt={'3'}>Hora de Produzir</Heading>
            <Heading as="h3" mt={'5'} >Ferramentas pra te ajudar a produzir mais e melhor!</Heading>
            <Flex direction={'row'} gap={'10'} m={'7'}>
              <Text><Strong>Terca-feira, 25/08/2026</Strong></Text>
            </Flex>
            
          </Flex>

          <Flex gap={'7'} m={'5'} >
            <Box maxWidth={'30rem'}>
            <Card size={'2'} >
              <Flex direction={'column'} align={'center'} gap={'5'}>
                <Heading as="h4" size={'5'}> To-do List</Heading>
                <Text as="p">O que precisa ser feito hoje</Text>
                <Button color="green" variant="soft">Acessar</Button>
              </Flex>
            </Card>
            </Box>

            <Box maxWidth={'30rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}> Tracker</Heading>
                  <Text as="p">Seus habitos, sua sequencia</Text>
                  <Button color="green" variant="soft">Acessar</Button>
                </Flex>
              </Card>
            </Box>
          </Flex>

            <Box width={'25rem'}>
              <Card size={'2'} >
                <Flex direction={'column'} align={'center'} gap={'5'}>
                  <Heading as="h4" size={'5'}> Finance</Heading>
                  <Text as="p">Pra onde vai seu dinheiro</Text>
                  <Button color="green" variant="soft">Acessar</Button>
                </Flex>
              </Card>
            </Box>
        </Flex>
        
      </Box>
  )
}

