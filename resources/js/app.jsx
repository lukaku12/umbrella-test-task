import React from 'react';
import {createRoot} from 'react-dom/client'; // Import createRoot from react-dom/client
import {createInertiaApp} from '@inertiajs/inertia-react';
import {InertiaProgress} from '@inertiajs/progress';

const pages = import.meta.glob('./Pages/**/*.jsx');

createInertiaApp({
    resolve: async name => {
        const importPage = pages[`./Pages/${name}.jsx`];
        if (!importPage) {
            throw new Error(`Unknown page: ./${name}.jsx`);
        }
        const module = await importPage();
        return module.default;
    },
    setup({el, App, props}) {
        const root = createRoot(el); // Create a root
        root.render(<App {...props} />); // Render the application
    },
}).then(r => {});

InertiaProgress.init();
