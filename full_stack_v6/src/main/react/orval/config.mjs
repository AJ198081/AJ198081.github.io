import {defineConfig} from 'orval';
import {apiClient} from "../src/api-client/BackendClient.tsx";

export default defineConfig({
        'e_commerce_contract_react_query': {
            input: '../../resources/api-specs/complete_specs_v2.json',
            output: {
                target: '../src/components/e_commerce/orval',
                // schemaType: '../src/components/e_commerce/orval/types',
                client: 'react-query',
                mock: false,
                useOptions: true,
                mode: 'split',
                prettier: true,
                httpClient: 'axios',
                // schemas: {
                //     path: '../src/components/e_commerce/zod',
                //     type: 'zod'
                // },
                override: {
                    title: (title) => `${title}_contract`,
                    aliasCombinedTypes: true,
                    mutator: {
                        path: '../src/api-client/BackendClient.tsx',
                        name: 'apiClient'
                    }
                }
            }
        },
        'e_commerce_contract_zod': {
            input: 'http://localhost:11000/v3/api-docs',
            output: {
                target: '../src/components/e_commerce/orval/zod',
                schemaType: '../src/components/e_commerce/zod/types',
                client: 'zod',
                fileExtension: '.zod.ts',
                mode: 'split',
                useOptions: true,
                prettier: true,
                override: {
                    title: (title) => `${title}_orval_zod`,
                    aliasCombinedTypes: true
                }
            }
        }
    }
)