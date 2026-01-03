import {defineConfig} from 'orval';
import {apiClient} from "../src/api-client/BackendClient.tsx";

export default defineConfig({
        'e_commerce_contract_react_query': {
            input: '../../resources/api-specs/complete_specs_v2.json',
            output: {
                target: '../src/components/e_commerce/orval',
                schemaType: '../src/components/e_commerce/orval/types',
                client: 'react-query',
                mock: false,
                useOptions: true,
                mode: 'split',
                prettier: true,
                tsConfig: '../tsconfig.app.json',
                override: {
                    title: (title) => `${title}_contract`,
                    mutator: {
                        path: '../src/api-client/BackendClient.tsx',
                        name: 'apiClient'
                    }
                }
            }
        },
        'e_commerce_contract_zod': {
            input: '../../resources/api-specs/complete_specs_v2.json',
            output: {
                target: '../src/components/e_commerce/zod',
                client: 'zod',
                fileExtension: '.zod.ts'
            }
        }
    }
)