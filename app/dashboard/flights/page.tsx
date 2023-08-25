import RootLayout from '@/app/layout'
import { Button } from '@/components/ui/button'
import { syncDB } from '@/lib/db'



    syncDB()


export default function FlightsPage() {
    <RootLayout>
        <Button onClick={syncDB}>sync</Button>
    </RootLayout>
}