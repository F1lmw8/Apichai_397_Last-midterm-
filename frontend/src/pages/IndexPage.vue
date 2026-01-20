<template>
  <div class="q-pa-md flex flex-center">
    <div class="column items-center">
      <h3>Frontend-Backend Integration Demo</h3>
      <div v-if="loading">Loading data...</div>
      <div v-else-if="error" class="text-negative">Error: {{ error }}</div>
      <div v-else class="q-card q-pa-lg">
        <p><strong>Message:</strong> {{ data.message }}</p>
        <p><strong>Git Info:</strong> {{ data.git_info }}</p>
        <p><strong>Docker Info:</strong> {{ data.docker_info }}</p>
      </div>
      <button @click="fetchData">Refresh Data</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${apiUrl}/api/demo`)
    data.value = response.data
  } catch (err) {
    error.value = err.message || 'Failed to fetch data'
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.text-negative {
  color: red;
}
.q-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
}
</style>
