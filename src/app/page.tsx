import { Icon } from '@/components/common/Icon';
import { SimilationOutput } from '../views/SimulationOutput';
import { SimulationSettings } from '../views/SimulationSettings';
import { SimulationProvider } from '@/context/SimulationContext';

export default function Home() {
    return (
        <SimulationProvider>
            <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
                <aside className="fixed items-center pt-4 inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                    <Icon icon="logo" className="h-8 w-8" />
                    <div className="flex flex-col gap-8 pt-12">
                        <Icon icon="home" />
                        <Icon icon="sparkles" />
                        <Icon icon="stack" />
                        <Icon icon="graph" />
                    </div>
                </aside>
                <div className="flex flex-col min-h-screen pl-14 bg-neutral-100">
                    {/* <header>Header</header> */}
                    <main className="flex min-h-screen w-full flex-col">
                        <h1 className="text-3xl font-semibold pt-4 pl-8">EV Charging simulator</h1>
                        <div className="border border-neutral-200 mx-8 mt-4 rounded-md bg-white shadow-md">
                            <SimulationSettings />
                            <SimilationOutput />
                        </div>
                    </main>
                    <footer></footer>
                </div>
            </div>
        </SimulationProvider>
    );
}
