import { Icon } from '@/components/common/Icon';
import { SimilationOutput } from '../views/SimulationOutput';
import { SimulationSettings } from '../views/SimulationSettings';
import { SimulationProvider } from '@/context/SimulationContext';

export default function Home() {
    return (
        <SimulationProvider>
            <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
                <aside className="fixed items-center pt-4 inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex none">
                    <Icon icon="logo" className="h-8 w-8" />
                    <div className="flex flex-col gap-8 pt-12">
                        <Icon icon="home" />
                        <Icon icon="sparkles" />
                        <Icon icon="stack" />
                        <Icon icon="graph" />
                    </div>
                </aside>
                <div className="flex flex-col min-h-screen pl-0 sm:pl-14 bg-neutral-100">
                    <main className="flex min-h-screen w-full flex-col">
                        <div className="flex items-center pl-4 sm:pl-8 pt-4">
                            <h1 className="sm:text-3xl text-lg font-semibold">EV Charging simulator</h1>
                        </div>

                        <div className="border border-neutral-200 mx-4 sm:mx-8 mt-4 sm:mt-6 rounded-md bg-white shadow-md">
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
