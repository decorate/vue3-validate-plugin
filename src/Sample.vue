<script setup lang="ts">
import {BFormInput} from 'bootstrap-vue-3'
import {useValidate, ValidateWrap, ValidateError} from '@/index'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

const {setValidError, clearValidate, validError, errorMessage, validState} = useValidate()

const test = async () => {
    try {
        const {data} = await axios.post('/test')
        console.log(data)
    } catch (e) {
        if(e instanceof ValidateError) {
            setValidError(e)
            console.log(validError)
        }
    }
}

const test2 = async () => {
    try {
        const {data} = await axios.put('/test')
        console.log(data)
    } catch (e) {
        console.log(e)
        setValidError(e as ValidateError)
    }
}

const test3 = async () => {
    try {
        const {data} = await axios.patch('/test')
        console.log(data)
    } catch (e) {
        console.log(e)
        setValidError(e as ValidateError)
    }
}

(() => {
})()
</script>

<template>
    <div>
        <b-container class="m-4">
            <validate-wrap>
                <b-form-input data="id"/>
                <b-form-input data="name"/>
                <span data="email">test</span>
            </validate-wrap>
            
            <div class="mt-2">
                <b-button @click="test">test</b-button>
                <b-button @click="test2">test2</b-button>
                <b-button @click="test3">test3</b-button>
            </div>
        </b-container>
    </div>
</template>