import { Badge, Box, Button, Card, Dialog, DropdownMenu, Flex, Heading, RadioGroup, Strong, Text, TextField } from "@radix-ui/themes";
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FormEventHandler, useState } from "react";


type priority = 'low' | 'medium' |'high'

interface Tarefa {
    id: number
    name: string
    description: string
    time: string
    priority: priority
}

export default function Todo () {
    const [todos, setTodos] = useState<Tarefa[]>([])
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const name = formData.get("name")?.toString() || "To-do"
        const time = formData.get("time")?.toString() || "12:00"
        const description = formData.get("description")?.toString() || "Realizar essa tarefa"
        const priorityRaw = formData.get("priority")?.toString()
        const priority = (priorityRaw === 'low' ||
                         priorityRaw === 'medium' ||
                         priorityRaw === 'high') ? priorityRaw as priority : 'low'

        e.currentTarget.reset()

        const newTodo: Tarefa = {
            id: Math.round(Math.random() * 100000),
            name: name,
            time: time,
            description: description,
            priority: priority
        }

        setTodos((state) => [...state, newTodo])
        
    }

    const removeTodo = (id:number) => {
        const todosFiltred = todos.filter((t) => t.id !== id)
        setTodos(todosFiltred)
    }

    const handleEditSubmit = (id:number): FormEventHandler<HTMLFormElement> => (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")?.toString() || "To-do"
        const time = formData.get("time")?.toString() || "12:00"
        const description = formData.get("description")?.toString() || "Realizar essa tarefa"
        const priorityRaw = formData.get("priority")?.toString()
        const priority = (priorityRaw === 'low' ||
                         priorityRaw === 'medium' ||
                         priorityRaw === 'high') ? priorityRaw as priority : 'low'

        setTodos((state) => state.map((todo) => todo.id === id ? { ...todo, name, time, description, priority } : todo))
        setEditingTodoId(null)
    }

    return(
        <Box>
            <Flex align={'center'} direction={'column'} gap={'4'}>
                <Heading color="gray" size={'8'}> To-do List</Heading>
                
                <Dialog.Root>

                    <Dialog.Trigger>
                        <Button color="green" variant="surface">Adicionar Tarefa</Button>
                    </Dialog.Trigger>
                    
                    <Dialog.Content maxWidth={'20rem'}>
                        <Dialog.Title>Adicionar Tarefa</Dialog.Title>
                        
                        <form onSubmit={handleSubmit}>
                        <Flex direction={'column'} gap={'4'}>
                            <label htmlFor="name">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                <TextField.Root
                                placeholder="Enter your to-do"
                                name="name" id="name"
                                required/>
                            </label>

                            <label htmlFor="time">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                                <TextField.Root 
                                type="time"
                                name="time" id="time"
                                placeholder="--:--"
                                />
                            </label>

                            <label htmlFor="description">
                                <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                <TextField.Root
                                placeholder="Enter your description"
                                name="description" id="description"
                                required/>
                            </label>

                            <label htmlFor="priority">
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
                                <Button variant="soft" color="gray">Cancelar</Button>
                            </Dialog.Close>
                            <Button type="submit">Adicionar Tarefa</Button>
                        </Flex>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>

                <Box width={'25rem'} >

                    <Flex justify={'start'} direction={'column'}>
                        <Heading >
                            Tarefas
                        </Heading>

                    {todos.map((todo) => (
                        <Card variant="classic" m={'2'} key={todo.id} >
                            <Flex direction={'column'} gap={'3'} maxHeight={'100%'}>
                                <Heading as="h3">{todo.name} - <Badge
                                    color={todo.priority === 'high' ? 'tomato' : 'sky'}
                                    variant="soft">{todo.priority}</Badge></Heading>
                                <Text>{todo.description}</Text>
                                <Text><Strong>{todo.time}</Strong></Text>
                            </Flex>
                            <Flex justify={'end'} mt={'2'} gap={'2'}>
                                <Dialog.Root
                                    open={editingTodoId === todo.id}
                                    onOpenChange={(open) => {
                                        if (!open) {
                                            setEditingTodoId(null)
                                        }
                                    }}
                                >
                                    <Dialog.Trigger>
                                        <Button variant="soft" color="gray" onClick={() => setEditingTodoId(todo.id)}>
                                            Edit
                                        </Button>
                                    </Dialog.Trigger>

                                    <Dialog.Content maxWidth={'20rem'}>
                                        <Dialog.Title>Editando a Tarefa: {todo.name}</Dialog.Title>

                                        <form onSubmit={handleEditSubmit(todo.id)}>
                                            <Flex direction={'column'} gap={'4'}>
                                                <label htmlFor={`edit-name-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Tarefa</Text>
                                                    <TextField.Root
                                                        placeholder="Enter your to-do"
                                                        name="name" id={`edit-name-${todo.id}`}
                                                        defaultValue={todo.name}
                                                        required
                                                    />
                                                </label>

                                                <label htmlFor={`edit-time-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Horario</Text>
                                                    <TextField.Root
                                                        type="time"
                                                        name="time" id={`edit-time-${todo.id}`}
                                                        defaultValue={todo.time}
                                                    />
                                                </label>

                                                <label htmlFor={`edit-description-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Descrição</Text>
                                                    <TextField.Root
                                                        placeholder="Enter your description"
                                                        name="description" id={`edit-description-${todo.id}`}
                                                        defaultValue={todo.description}
                                                        required
                                                    />
                                                </label>

                                                <label htmlFor={`edit-priority-${todo.id}`}>
                                                    <Text as="div" size={'2'} m={'1'} weight={'bold'}>Prioridade</Text>
                                                    <RadioGroup.Root defaultValue={todo.priority} name="priority" variant="soft" color="gray">
                                                        <RadioGroup.Item value="low">Baixa</RadioGroup.Item>
                                                        <RadioGroup.Item value="medium">Media</RadioGroup.Item>
                                                        <RadioGroup.Item value="high">Alta</RadioGroup.Item>
                                                    </RadioGroup.Root>
                                                </label>
                                            </Flex>

                                            <Flex gap="3" mt="4" justify="end">
                                                <Dialog.Close>
                                                    <Button variant="soft" color="gray" onClick={() => setEditingTodoId(null)}>Cancelar</Button>
                                                </Dialog.Close>
                                                <Button type="submit">Salvar Tarefa</Button>
                                            </Flex>
                                        </form>
                                    </Dialog.Content>
                                </Dialog.Root>

                                <DropdownMenu.Root >
                                    <Flex justify={'end'}>
                                        <DropdownMenu.Trigger>
                                            <Button variant="soft" color="gray">
                                                <DotsVerticalIcon/>
                                            </Button>
                                        </DropdownMenu.Trigger>
                                    </Flex>

                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item shortcut="⌫" color="red" onClick={() => removeTodo(todo.id)}>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                        </Card>
                    ))}
                    </Flex>
                </Box>
                <Heading as="h3" size={'4'}>Total de tarefas: {todos.length}</Heading>
            </Flex>
        </Box>
    )
}