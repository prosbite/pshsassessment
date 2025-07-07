<template>
  <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <!-- Tab Headers -->
      <div class="flex border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="selectTab(tab.id)"
          :class="{
            'flex-1 py-4 px-6 text-center text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out': true,
            'text-blue-700 bg-white border-b-4 border-blue-600 shadow-inner-top rounded-t-xl': activeTab === tab.id,
            'text-gray-600 hover:bg-gray-100 hover:text-blue-500': activeTab !== tab.id,
            'rounded-tl-xl': index === 0, // Apply rounded-tl-xl to the first tab
            'rounded-tr-xl': index === tabs.length - 1, // Apply rounded-tr-xl to the last tab
          }"
          :aria-selected="activeTab === tab.id"
          role="tab"
        >
          {{ tab.title }}
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="p-8">
        <!--
          We use named slots here. Each slot corresponds to a tab's ID.
          The content for each tab is provided by the parent component using <template #tabId>...</template>.
          The v-show directive ensures only the active tab's content is rendered.
          We also pass the entire 'tab' object to the slot as a prop,
          allowing the parent to access tab-specific data if needed (e.g., <template #tab1="{ tab }">).
        -->
        <div
          v-for="tab in tabs"
          :key="tab.id + '-content-panel'"
          v-show="activeTab === tab.id"
          class="transition-opacity duration-300 ease-in-out"
          role="tabpanel"
        >
          <slot :name="tab.id" :tab="tab"></slot>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// TabsComponent: A reusable component for rendering tabs.
// It manages the active tab state and provides slots for content.
const TabsComponent = {
  props: {
    // The 'tabs' prop expects an array of objects, each with an 'id' and 'title'.
    // Example: [{ id: 'myTab1', title: 'My First Tab' }]
    tabs: {
      type: Array,
      required: true,
      validator: (value) => value.every(tab => tab.id && tab.title)
    }
  },
  setup(props) {
    // Initialize activeTab with the ID of the first tab, or null if no tabs are provided.
    const activeTab = ref(props.tabs.length > 0 ? props.tabs[0].id : null);

    // Function to set the active tab when a tab header is clicked.
    const selectTab = (tabId) => {
      activeTab.value = tabId;
    };

    return {
      activeTab,
      selectTab,
    };
  },
};
</script>

<style>

</style>
