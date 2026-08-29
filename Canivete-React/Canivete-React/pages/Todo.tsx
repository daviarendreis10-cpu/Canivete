import { Badge, Box, Button, Card, Dialog, DropdownMenu, Flex, Heading, RadioGroup, Strong, Text, TextField } from "@radix-ui/themes";
import { DotsVerticalIcon } from '@radix-ui/react-icons'


type priority = 'low' | 'medium' |'high'

interface Tarefa {
    id: number
    name: string
    description: string
    horario: string
    priority: priority
}

export default function Todo () {
    const tarefas: Tarefa[] = [{
        id: 1,
        name: 'Estudar',
        description: 'Aprender melhor NodeJS',
        horario: '14:00',
        priority:'high'
    }, {
        id: 2,
        name: 'Ler',
        description: 'Ler um capitulo de Programador Pragmatico',
        horario: '19:30',
        priority:'low'
    }]

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}> To-do List</Heading>
                
                <Dialog.Root>

                    <Dialog.Trigger>
                        <Button color="green" variant="surface">Adicionar Tarefa</Button>
                    </Dialog.Trigger>
                    <form action="">
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Adicionar Tarefa</Dialog.Title>

                        <Flex direction={'column'} gap={'4'}>
                            <label>
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                <TextField.Root
                                placeholder="Enter your to-do"
                                required/>
                            </label>

                            <label>
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                                <TextField.Root 
                                type="time"
                                placeholder="--:--"
                                />
                            </label>

                            <label>
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Prioridade</Text>
                                <RadioGroup.Root defaultValue="low" name="priority" variant="soft" color="gray">

                                    <RadioGroup.Item 
                                    value="low">
                                        Baixa
                                    </RadioGroup.Item>

                                    <RadioGroup.Item 
                                    value="medium">
                                        Media
                                    </RadioGroup.Item>

                                    <RadioGroup.Item 
                                    value="high">
                                        Alta
                                    </RadioGroup.Item>
                                    
                                </RadioGroup.Root>
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancelar
                                </Button>
                            </Dialog.Close>
                            
                            <Button type="submit">Adicionar Tarefa</Button>
                        </Flex>
                    </Dialog.Content>
                    </form>
                </Dialog.Root>

                <Box width={'25rem'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            Tarefas
                        </Heading>

                    {tarefas.map((tarefa) => (
                        <Card variant="classic" m={'2'} >
                            <Flex direction={'column'} gap={'3'} maxHeight={'100%'}>
                                <Heading as="h3">{tarefa.name} - <Badge
                                    color={tarefa.priority === 'high' ? 'tomato' : 'sky'}
                                    variant="soft">{tarefa.priority}</Badge></Heading>
                                <Text>{tarefa.description}</Text>
                                <Text><Strong>{tarefa.horario}</Strong></Text>
                            </Flex>
                            <Flex maxWidth={'3rem'} mt={'2'} >
                                <DropdownMenu.Root >
                                    <Flex justify={'end'}>
                                        <DropdownMenu.Trigger>
                                            <Button variant="soft" color="gray">
                                                <DotsVerticalIcon/>
                                            </Button>
                                        </DropdownMenu.Trigger>
                                    </Flex>

                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item shortcut="🖉">Edit</DropdownMenu.Item>
                                        <DropdownMenu.Item shortcut="⌫" color="red">Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                            
                        </Card>
                    ))}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}