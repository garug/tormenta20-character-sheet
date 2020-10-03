import { App } from 'vue';

const requireComponent = require.context('.', false, /_base-[\w-]+\.vue$/);

function initComponents(app: App) {
    requireComponent.keys().forEach((fileName) => {
        const componentConfig = requireComponent(fileName);

        const componentName = fileName
            // Remove the "./_base" from the beginning
            .replace(/^\.\/_base/, '')
            // Remove the file extension from the end
            .replace(/\.\w+$/, '')
            // Split up kebabs
            .split('-')
            // Upper case
            .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
            // Concatenated
            .join('')

        app.component(componentName, componentConfig.default || componentConfig)
    })
}

export default initComponents;