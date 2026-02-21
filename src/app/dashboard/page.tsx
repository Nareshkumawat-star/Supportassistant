import React from 'react'
import Dashboardclient from '@/components/Dashboardclient'
import { getSession } from '@/lib/getsession'

async function Dashboard() {
    const session = await getSession();
    return (
        <div>
            <Dashboardclient ownerId={session?.id!} />
        </div>
    )
}

export default Dashboard;
