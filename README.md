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
![example](https://private-user-images.githubusercontent.com/27335928/286467101-7b88e3b7-1d75-4112-a03d-b5f2dc81e8fc.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDEyMjg3NTgsIm5iZiI6MTcwMTIyODQ1OCwicGF0aCI6Ii8yNzMzNTkyOC8yODY0NjcxMDEtN2I4OGUzYjctMWQ3NS00MTEyLWEwM2QtYjVmMmRjODFlOGZjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzExMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMTI5VDAzMjczOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM0M2FlYThmNmVkYzk3MjEyZDY2ODc3ODA0NzIxYzA1MDg5ZTdjMTk1MWQ5MzA1ZjFiOGIzOGMzMjM0ZTlhMTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.fpglX8hCVmBtFS7e6jOny3NvoCRu8Xl69gjX5RS7gX4)