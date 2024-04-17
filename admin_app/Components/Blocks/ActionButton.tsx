import React from 'react'
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link'

const ActionButton = () => {
  return (
    <div className='absolute bottom-0 mb-5 right-0 mr-5'>
      

    <Link href="/new_user">

    <ActionIcon variant="filled"  size="xl" aria-label="Settings">
      <IconPlus  size={20} stroke={2} />
    </ActionIcon>

    </Link>

    </div>
  )
}

export default ActionButton
