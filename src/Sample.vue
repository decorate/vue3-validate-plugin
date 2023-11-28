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
    } catch (e: any) {
        console.log(e)
        e.showError()
    }
}

const test3 = async () => {
    try {
        const {data} = await axios.patch('/test')
        console.log(data)
    } catch (e: any) {
        console.log(e)
        e.showError()
    }
}

(() => {
})()
</script>

<template>
    <div>
        <b-container class="m-4">
            <b-form>
                <validate-wrap>
                    <b-form-group>
                        <b-form-floating-label>id</b-form-floating-label>
                        <b-form-input data="id"/>
                    </b-form-group>
                    <b-form-group>
                        <b-form-floating-label>name</b-form-floating-label>
                        <b-form-input data="name"/>
                    </b-form-group>
                    <b-form-group>
                        <span data="email">email span</span>
                    </b-form-group>
                    <b-form-group>
                        <input type="date" data="createdAt">
                    </b-form-group>
                    <div>
                        <input type="datetime-local" data="updatedAt">
                    </div>
                </validate-wrap>
            </b-form>
            
            <div class="mt-2">
                <b-button-group>
                    <b-button @click="test">test</b-button>
                    <b-button @click="test2">test2</b-button>
                    <b-button @click="test3">test3</b-button>
                    <b-button @click="() => clearValidate()">clear error</b-button>
                </b-button-group>
            </div>
        </b-container>
    </div>
</template>