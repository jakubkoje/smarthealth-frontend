<template>
   <ModalWindow
    :isOpen="isNRModalOpen"
    @close="isNRModalOpen = false"
    ><DataTableRecord
      :columns="columns"
      :objectData="newRecordTemplate"
      :existing="false"
      :updateAction="handleNewRecord"
      openedFrom="create"
      @updated="handleRecordCreated"
    ></DataTableRecord></ModalWindow
  ><ModalWindow
    :isOpen="isERModalOpen"
    @close="isERModalOpen = false"
    ><DataTableRecord
      :columns="columns"
      :objectData="currentRowClicked"
      :existing="true"
      :updateAction="handleUpdateRecord"
      openedFrom="edit"
      @updated="handleRecordUpdated"
    ></DataTableRecord></ModalWindow
  >
  <div class="flex flex-col gap-2">
    <div class="flex w-full gap-8">
       <button
        class="flex w-2/12 items-center justify-center gap-4 rounded-lg border border-blue-400 bg-blue-50 px-3 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-100"
        @click="isNRModalOpen = true"
      >
         + New Record </button
      >
      <div class="mx-1 w-[1px] bg-slate-300"></div>
      <div class="flex items-center gap-2">

        <p class="text-sm text-slate-700">Show records per page:</p>

        <div class="rounded-lg">
           <SelectionMenu
            v-model="selectedOffset"
            :options="offsets.map(String)"
            :placeholder="selectedOffset"
          ></SelectionMenu
          >
        </div>

      </div>

      <div class="mx-1 w-[1px] bg-slate-300"></div>
      <div class="flex flex-1">

        <div class="">
           <SelectionMenu
            v-model="searchColumn"
            :options="columnNames"
            placeholder="Column"
            borderRadius="rounded-l-lg"
          ></SelectionMenu
          >
        </div>
        <div class="flex flex-1 space-y-2 rounded">
           <input
            v-model="searchValue"
            type="text"
            :placeholder="
              searchColumn !== null
                ? 'Search in column \'' + searchColumn + '\''
                : 'Search in column...'
            "
            class="w-full rounded-r-lg border-b border-r border-t border-gray-300 px-3 py-1 font-light text-slate-800 placeholder:font-light placeholder:text-slate-500 focus:outline-none focus:ring-0"
          />
        </div>

      </div>

    </div>
    <div
      class="shadow-shadowEven overflow-hidden rounded-lg border border-slate-300"
    >

      <div class="max-h-[calc(100dvh-24rem)] min-h-48">

        <table class="w-full table-fixed rounded-lg text-slate-800">

          <thead class="sticky top-0 z-10 border-b border-slate-300 shadow">

            <tr class="">
              <th
                style="width: 10%; max-width: 10%; min-width: 10%"
                class="bg-slate-100 p-2 text-left font-light text-slate-800"
              >
                 Number
              </th>

              <th
                v-for="(column, index) in columns"
                :key="index"
                :style="{
                  width: column.widthPercentage + '%',
                  'max-width': column.widthPercentage + '%',
                  'min-width': column.widthPercentage + '%',
                }"
                class="cursor-pointer bg-slate-100 p-2 text-left font-light text-slate-800"
                @click="sortTable(column.name)"
              >
                 {{ column.label }} <span
                  class="inline-flex text-xs text-slate-400"
                  > <span
                    :class="{
                      'text-slate-700':
                        sortColumn === column.name && sortOrder === 'asc',
                    }"
                    >▲</span
                  > <span
                    :class="{
                      'text-slate-700':
                        sortColumn === column.name && sortOrder === 'desc',
                    }"
                    >▼</span
                  > </span
                >
              </th>

              <th
                class="bg-slate-100 px-3 py-2 text-end font-light text-slate-800"
              ></th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="(object, index) in paginatedRows"
              :key="index"
              :class="[
                'border border-dashed border-white transition-all hover:border-orange-500 hover:bg-orange-100 hover:bg-opacity-60',
                index % 2 == 1 ? 'bg-slate-50' : '',
              ]"
            >
               <!-- Add Number column cell -->
              <td
                style="width: 7.5%; max-width: 7.5%; min-width: 7.5%"
                class="overflow-hidden text-ellipsis text-nowrap px-3 py-1 align-top text-sm font-extralight text-slate-600"
              >
                 {{ startIndex + index + 1 }}
              </td>

              <td
                v-for="column in columns"
                :key="column.name"
                :style="{
                  width: column.widthPercentage + '%',
                  'max-width': column.widthPercentage + '%',
                  'min-width': column.widthPercentage + '%',
                }"
                class="overflow-hidden text-ellipsis text-nowrap px-3 py-1 align-top text-sm font-extralight text-slate-600"
              >
                 <template v-if="Array.isArray(object[column.name])"
                  > <button
                    class="flex items-center gap-1 text-blue-500"
                    @click="toggleExpand(index, column.name)"
                  >
                     {{
                      Array.isArray(object[column.name])
                        ? `${(object[column.name] as any[]).length} items`
                        : "Many items"
                    }} <span
                      :class="[
                        'translate-y-[0.1rem] transition-transform',
                        isExpanded(index, column.name) ? 'rotate-180' : '',
                      ]"
                      ><IconChevron></IconChevron></span
                    > </button
                  > <!-- Smooth Transition Wrapper --> <Transition name="expand"
                    >
                    <div
                      v-if="isExpanded(index, column.name)"
                      class="overflow-hidden"
                    >

                      <ul class="mt-2 space-y-1 text-gray-700">

                        <li
                          v-for="(item, idx) in object[column.name]"
                          :key="idx"
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                           {{
                            "columns" in column
                              ? item[column.columns[0].name]
                              : item
                          }}
                        </li>

                      </ul>

                    </div>
                     </Transition
                  > </template
                > <template v-else
                  >
                  <p>
                     {{ object[column.name] || column.defaultValue || "-" }}
                  </p>
                   </template
                >
              </td>

              <td
                class="flex justify-end gap-3 px-4 py-1 font-extralight text-slate-600"
              >
                 <button
                  class="flex min-h-5 min-w-5 items-center justify-center hover:text-blue-600"
                  @click="handleMaximize(index)"
                >
                   <IconMaximize></IconMaximize> </button
                > <ContainerLinkIcon
                  :link="rowLink"
                  size="h-5 w-5"
                  :action="() => rowClickAction(object)"
                  ><IconEdit></IconEdit></ContainerLinkIcon
                >
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
     <!-- Pagination Controls -->
    <div class="flex items-center justify-between text-slate-800">

      <p v-if="paginatedRows.length > 0" class="text-sm">
         Showing {{ startIndex + 1 }}-{{
          Math.min(startIndex + currentOffset, filteredRows.length)
        }} of {{ filteredRows.length }} records
      </p>

      <p class="text-sm" v-else>Showing 0 records</p>

      <div class="flex gap-2 text-sm">
         <span class="px-3 py-2"
          >Page {{ currentPage }} of {{ totalPages }}</span
        > <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
           Previous </button
        > <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
           Next </button
        >
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { DataColumn, DataRow } from "~/types/data-table.ts";
import IconMaximize from "./IconEdit.vue";

const props = defineProps({
  offsets: {
    type: Array as () => number[],
    required: false,
    default: [10, 20, 30], // Default items per page
  },
  offset: {
    type: Number,
    required: false,
    default: 10,
  },
  columns: {
    type: Array as () => DataColumn[],
    required: true,
  },
  rows: {
    type: Array as () => DataRow[],
    required: true,
  },
  updateAction: {
    type: Function,
    required: true,
  },
  rowClickAction: {
    type: Function,
    required: true,
  },
  rowLink: {
    type: String,
    required: true,
  },
});

const isNRModalOpen = ref(false);
const isERModalOpen = ref(false);
const searchColumn = ref<string | null>(null);
const searchValue = ref<String | null>(null);
const sortColumn = ref<String | null>(null);
const sortOrder = ref<"asc" | "desc" | null>(null);
const currentPage = ref(1); // Tracks current page
const columnNames = computed(() => props.columns.map((col) => col.name)); // Extract the column names for SelectionMenu
const currentOffset = ref(props.offset);
const selectedOffset = ref(props.offset.toString());
const currentRowIndex = ref(-1);

const sortedRows = computed(() => {
  if (!sortColumn.value) {
    return props.rows;
  }

  return [...props.rows].sort((a, b) => {
    const valueA = a[sortColumn.value as keyof DataRow];
    const valueB = b[sortColumn.value as keyof DataRow];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder.value === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      return sortOrder.value === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }
  });
});

const filteredRows = computed(() => {
  if (!searchColumn.value || !searchValue.value) {
    return sortedRows.value;
  }

  return sortedRows.value.filter((row) => {
    const columnValue = row[searchColumn.value as keyof DataRow];

    if (typeof columnValue === "string") {
      return columnValue
        .toLowerCase()
        .includes(searchValue.value!.toLowerCase());
    } else if (typeof columnValue === "number") {
      return columnValue.toString().includes(searchValue.value! as string);
    } else if (typeof columnValue === "boolean") {
      return columnValue
        .toString()
        .toLowerCase()
        .includes(searchValue.value!.toLowerCase());
    } else if (Array.isArray(columnValue)) {
      return columnValue.some((item) =>
        item
          .toString()
          .toLowerCase()
          .includes(searchValue.value!.toLowerCase()),
      );
    }

    return false;
  });
});

// Pagination Logic
const totalPages = computed(() =>
  Math.ceil(filteredRows.value.length / currentOffset.value),
);

const startIndex = computed(
  () => (currentPage.value - 1) * currentOffset.value,
);

const paginatedRows = computed(() =>
  filteredRows.value.slice(
    startIndex.value,
    startIndex.value + currentOffset.value,
  ),
);

const currentRowClicked = computed(() => {
  return currentRowIndex.value >= 0
    ? paginatedRows.value[currentRowIndex.value]
    : newRecordTemplate.value;
});

const newRecordTemplate = computed(() => {
  const record: DataRow = {};
  props.columns.forEach((column) => {
    switch (column.dataType) {
      case "string":
        record[column.name] = "";
        break;
      case "number":
        record[column.name] = 0;
        break;
      case "boolean":
        record[column.name] = false;
        break;
      case "array":
        record[column.name] = [];
        break;
    }
  });
  return record;
});

// Automatically update currentOffset when user selects a new option
watch(selectedOffset, (newOffset) => {
  currentOffset.value = parseInt(newOffset);
  currentPage.value = 1; // Reset pagination when page size changes
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const sortTable = (column: String) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortOrder.value = "asc";
  }
};

const expandedCells = ref<Record<string, boolean>>({});

const toggleExpand = (rowIndex: number, columnKey: string) => {
  const key = `${rowIndex}-${columnKey}`;
  expandedCells.value[key] = !expandedCells.value[key];
};

const isExpanded = (rowIndex: number, columnKey: string) => {
  return expandedCells.value[`${rowIndex}-${columnKey}`] || false;
};

const handleMaximize = (rowIndex: number) => {
  currentRowIndex.value = rowIndex;
  isERModalOpen.value = true;
};

const handleRowClickAction = (rowIndex: number) => {
  if (props.rowClickAction) {
    props.rowClickAction(props.rows[rowIndex]);
  }
};

const handleNewRecord = async (data: DataRow) => {
  await props.updateAction(data);
  props.rows.push(data);
};

const handleUpdateRecord = async (data: DataRow) => {
  await props.updateAction(data);
  const index = props.rows.findIndex(row => row.id === data.id);
  if (index !== -1) {
    props.rows[index] = data;
  }
};

const handleRecordCreated = () => {
  isNRModalOpen.value = false;
  // Additional logic after creation if needed
};

const handleRecordUpdated = () => {
  isERModalOpen.value = false;
  // Additional logic after update if needed
};
</script>

<style scoped>
/* Vue Transition for Expanding */
.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px; /* Adjust this based on content */
  opacity: 1;
}
</style>

