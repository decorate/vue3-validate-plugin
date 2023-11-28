## vue3-validate-plugin
### インストール
With yarn:

 	yarn add @team-decorate/vue3-validate-plugin

### 使い方

```typescript
//main.ts
import App from '@/App.vue'
import { ValidatePlugin } from '@team-decorate/vue3-validate-plugin'
import axios from 'axios'
import {PermissionError} from '@/exceptions/PermissionError'

const app = createApp(App)
app.use(ValidatePlugin, {
    axios: axios, //optional
	registerError: [
		{codeCondition: (n) => n == 430, error: PermissionError}
	], //optional,
    manual: false //optional, default false
})
```
- app.useにpluginを渡す
- plugin側でaxios.interceptorを実行しているので、optionにaxiosを渡す
- registerErrorで他のErrorを登録する
- manualをtrueにするとprovide登録、interceptorの登録をplugin側では行わない

```vue
//SomeComponent.vue
<script setup lang="ts">
import {ref} from 'vue'
import {useValidate, ValidateWrap, ValidateError} from '@team-decorate/vue3-validate-plugin'
import {BFormInput} from 'bootstrap-vue-3'
import {User} from '@/models/User'

const user = ref(new User)
const {setValidError} = useValidate()

const test = async () => {
    try {
        const {data} = await axios.post('/test')
    } catch (e) {
        if(e instanceof ValidateError) {
            setValidError(e)
        }
    }
}

</script>

<template>
    <div>
        <validate-wrap>
            <b-form-input v-model="user.id" data="id"/>
            <other-component v-model="user.value" data="value"/>
        </validate-wrap>
    </div>
</template>

```
- setValidateErrorはValidateErrorのみを受け付ける
- validateErrorが発生した時、<validate-wrap>で囲ったHtmlElementのdataに対してerrorのkeyがヒットすれば対象のhtmlの下部にエラーメッセージを表示する

### exportされる機能
| module | description |
|--|--|
| ApiError | Errorを追加する際はApiErrorを継承する |
| ValidateError | Validateの情報が入ったexception |
| GenerateErrorService | 対象のexceptionに変換する |
| provideValidateContext | マニュアルでuseValidateを使用する際は呼び出す |
| useValidate | validateErrorを操作する |
| ValidatePlugin | useValidateを提供する |
| ValidateWrap | <validate-wrap>で囲みvalidateErrorを表示させる |

