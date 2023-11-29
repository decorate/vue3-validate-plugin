## Installing

Using yarn:

```bash
$ yarn add @team-decorate/vue3-validate-plugin
```

Once the package is installed, you can import the library using `import` approach:

```typescript
import { ValidatePlugin, useValidate, ValidateWrap } from '@team-decorate/vue3-validate-plugin'
```

## Example

How to install to app:

> **Note**: Insert exception 
> You can insert your own error by passing 
> registerError as an option. Please register with IRegisterError type

```typescript
import {createApp} from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import {ValidatePlugin} from '@team-decorate/vue3-validate-plugin'

const app = createApp(App)
app.use(ValidatePlugin, {
	axios: axios,
	registerError: [
		{codeCondition: (n) => n == 430, error: PermissionError}
	], //optional
})
```

How to use ValidateWrap:

```vue

<script setup lang="ts">
import {ValidateWrap, ValidateError, useValidate} from '@team-decorate/vue3-validate-plugin'
import axios from 'axios'

const {setValidError} = useValidate()

const submit = async () => {
    try {
        await axios.post('/api/some', data)
    } catch (e) {
        if (e instanceof ValidateError) {
            setValidError(e)
        }
    }
}
</script>

<template>
    <validate-wrap>
        <div class="mb-3">
            <label>name</label>
            <input v-model="user.name" class="form-control" data="name">
        </div>
        <div class="mt-3">
            <label>email</label>
            <input v-model="user.email" class="form-control" data="email">
        </div>
    </validate-wrap>
    <button @click="submit">submit</button>
</template>
```
![example](https://private-user-images.githubusercontent.com/27335928/286471787-2d1218ed-ac9d-417a-b872-307efddbd24a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEyMzA0NjIsIm5iZiI6MTcwMTIzMDE2MiwicGF0aCI6Ii8yNzMzNTkyOC8yODY0NzE3ODctMmQxMjE4ZWQtYWM5ZC00MTdhLWI4NzItMzA3ZWZkZGJkMjRhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTI5VDAzNTYwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNjMmRlZjJlYTllZTYzZmZmYWY5NTk4MWFlZWZmZjIzZTg5MjgxOWFkNmNjMDFmNTBhODEwZWQ1ZmVjNWViNmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.f-tbcxZ_EIKZ5fL04FPP6PsVa7lWXY1yHTq4c-aa10w)

### Props:
| Name | default | description |
|------|-------|-------------|
 | attributeField | data  | key to detect validate error |