'use client'
import React, { useState } from 'react'
import { Table, Input, CloseButton, ActionIcon } from '@mantine/core';
import { IconSearch, IconTrash , IconEdit } from '@tabler/icons-react';
import { deleteAction } from '@/actions/action';
import { useRouter } from 'next/navigation'

const DataTable = ({ data }: { data: any }) => {
    const [input, setInput] = useState('');
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleEditClick = (element: any) => {
        sessionStorage.setItem('editData', JSON.stringify(element));
        router.push('/edit_user');
    };

    const filteredSearchList = data.filter((item: any) =>
        item.name.toLowerCase().includes(input.toLowerCase())
    );

    const rows = filteredSearchList.map((element: any, i: number) => (
        <Table.Tr key={i}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.job_title}</Table.Td>
            <Table.Td>{element.age}</Table.Td>
            <Table.Td>
                <ActionIcon
                    radius='md'
                    variant='subtle'
                    onClick={() => deleteAction(element.email)}
                >
                    <IconTrash stroke={1.5} size={20} color='#000' />
                </ActionIcon>
                <ActionIcon
                    mr={30}
                    radius='md'
                    variant='subtle'
                    onClick={() => handleEditClick(element)}
                >
                    <IconEdit stroke={1.5} size={20} color='#000' />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    const tableBody = rows.length > 0 ? (
        rows
    ) : (
        <Table.Tr>
            <Table.Td colSpan={5}>Not Found</Table.Td>
        </Table.Tr>
    );

    return (
        <>
            <Input
                leftSection={<IconSearch size={16} color='#000' />}
                value={input}
                placeholder='Search by name'
                onChange={handleChange}
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setInput('')}
                        style={{ display: input ? undefined : 'none' }}
                    />
                }
            />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Age</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {tableBody}
                </Table.Tbody>
            </Table>
        </>
    );
};

export default DataTable;
