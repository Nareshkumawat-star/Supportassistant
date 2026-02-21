import React from 'react'
import EmbeddedClient from '@/components/EmbeddedClient'
import { getSession } from '@/lib/getsession'

async function Embedded() {
    const session = await getSession();
    return (
        <div>

            <EmbeddedClient ownerId={session?.id!} />

        </div>
    )
}

export default Embedded