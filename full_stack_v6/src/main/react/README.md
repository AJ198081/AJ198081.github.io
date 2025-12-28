# OpenAPI to Typescript schema definition


## Swagger Documentation (Types)
https://swagger.io/docs/specification/v3_0/about/
https://swagger.io/specification/

### OpenApi Specs (Example)
https://editor.swagger.io/

### Generate Typescript Schema Definition
1. Read more about the openapi-TypeScript package: `https://openapi-ts.dev/introduction`
2. Install openapi-typescript
   1. `npm i -D openapi-typescript`
   
3. `npx openapi-typescript ..\resources\api-specs\complete_specs.json -o .\src\assets\schema.d.ts`
   1. npx please execute openapi-TypeScript, take my specs from `location of openApi specs` and place the output from `location of schema type definition`
   2. e.g. `npx openapi-typescript ../resources/api-specs/complete_specs_v1.json -o ./domain/types.ts`
   3. `npx openapi-typescript /mnt/c/Users/amarj/IdeaProjects/spring_master/full_stack_v6/src/main/resources/api-specs/complete_specs_v1.json -o /mnt/c/Users/amarj/IdeaProjects/spring_master/full_stack_v6/src/main/react/src/components/e_commerce/types/schema.d.ts`
