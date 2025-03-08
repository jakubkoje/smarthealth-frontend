<script setup lang='ts'>
const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const expand = ref({
  openedRows: [people[0]],
  row: {}
})
</script>

<template>
  <UTable 
    v-model:expand="expand" 
    :rows="people"
    :ui="{
      wrapper: 'relative overflow-x-auto',
      base: 'min-w-full table-fixed',
      divide: 'divide-y divide-gray-300',
      thead: 'bg-gray-50',
      tbody: 'divide-y divide-gray-200 bg-white',
      tr: {
        base: 'hover:bg-blue-50 transition-colors',
        selected: 'bg-primary-50'
      },
      th: {
        base: 'py-3.5 px-4 text-left text-sm font-semibold text-gray-900',
        padding: 'px-4 py-3.5',
        color: 'text-gray-900',
        font: 'font-semibold',
        size: 'text-sm'
      },
      td: {
        base: 'whitespace-nowrap py-4 px-4 text-sm text-gray-700',
        padding: 'px-4 py-4',
        color: 'text-gray-700',
        font: '',
        size: 'text-sm'
      },
      loadingState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 mt-4',
        icon: 'w-6 h-6 text-gray-400 animate-spin'
      },
      emptyState: {
        wrapper: 'flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14',
        label: 'text-sm text-center text-gray-900 mt-4',
        icon: 'w-6 h-6 text-gray-400'
      },
      expandRow: {
        wrapper: 'bg-gray-50 p-0',
        padding: 'p-0',
        base: 'bg-gray-50'
      }
    }"
  >
    <template #expand="{ row }">
      <div class="p-4 bg-gray-50 border-t border-gray-200">
        <pre class="text-sm text-gray-700 whitespace-pre-wrap">{{ row }}</pre>
      </div>
    </template>
  </UTable>
</template>

