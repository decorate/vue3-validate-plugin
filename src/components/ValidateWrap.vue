<script setup lang="ts">
import { useValidate } from '@/contexts/validateContext'
import { ref, watchEffect } from 'vue'

const { validError } = useValidate()
const slotContainer = ref<HTMLElement | null>(null)

const props = defineProps({
    attributeField: {
        type: String,
        default: 'data',
    },
})

const clearErrorMessages = () => {
    slotContainer.value
        ?.querySelectorAll('.invalid-feedback')
        .forEach((x) => x.remove())
    slotContainer.value
        ?.querySelectorAll('.is-invalid')
        .forEach((x) => x.classList.remove('is-invalid'))
}

const findInputElement = (dataAttribute: string) => {
    return slotContainer.value?.querySelectorAll(
        `[${props.attributeField}="${dataAttribute}"]`
    )
}

const showErrorMessage = (element: Element, message: string) => {
    element.classList.add('is-invalid')
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('d-block', 'invalid-feedback')
    errorDiv.style.whiteSpace = 'pre-wrap'
    errorDiv.textContent = message
    element.after(errorDiv)
}

watchEffect(() => {
    if (!validError.value?.errors) {
        clearErrorMessages()
        return
    }

    const { errors } = validError.value
    Object.keys(errors).forEach((x) => {
        const errorMessage = errors![x].join('')
        const inputElements = findInputElement(x)

        if (inputElements?.length) {
            inputElements?.forEach(inputElement => {
                showErrorMessage(inputElement, errorMessage)
            })
        }
    })
})
</script>

<template>
    <div ref="slotContainer">
        <slot />
    </div>
</template>
